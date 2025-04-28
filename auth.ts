import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";
import { authConfig } from "./auth.config";
import { cookies } from "next/headers";
import GoogleProvider from "next-auth/providers/google"; // <-- Add this import

// import type { NextAuthConfig } from "next-auth";
// import { NextResponse } from "next/server";

export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30,
    // updateAge: 0,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        //find User in databse
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });

        //check if user exists and if password matches
        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );

          //if  password is correct , return user
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }
        ///if user does not exist or password does not match return null
        return null;
      },
    }),

    // ADD GoogleProvider here
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async session({ session, user, trigger, token }: any) {
      ////set the user ID from the token
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;

      ///if there is an update, set the user name
      if (trigger === "update") {
        session.user.name = user.name;
      }
      return session;
    },
    async jwt({ token, user, trigger, session }: any) {
      //  Assign user field to token
      if (user) {
        token.id = user.id;
        token.role = user.role;

        //if user has no name
        if (user.name === "N0_NAME") token.name = user.email!.split("@")[0];

        //Update database to reflect token name
        await prisma.user.update({
          where: { id: user.id },
          data: { name: token.name },
        });

        if (trigger === "signIn" || trigger === "signUp") {
          const cookiesObject = await cookies();
          const sessionCartId = cookiesObject.get("sessionCartId")?.value;

          if (sessionCartId) {
            const sessionCart = await prisma.cart.findFirst({
              where: { sessionCartId },
            });
            if (sessionCart) {
              //delete current user cart
              await prisma.cart.deleteMany({
                where: { userId: user.id },
              });

              //Asssign New Cart
              await prisma.cart.update({
                where: { id: sessionCart.id },
                data: { userId: user.id },
              });
            }
          }
        }
      }
      // Handle session updates
      if (session?.user.name && trigger === "update") {
        token.name = session.user.name;
      }

      if (session?.user.email && trigger === "update") {
        token.email = session.user.email;
      }

      return token;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);

// authorized({ request, auth }: any) {
//   ///check for session cart cookie
//   if (!request.cookies.get("sessionCartId")) {
//     //Generate new session cartId Cookie
//     const sessionCartId = crypto.randomUUID();

//     //Clone Request Headers
//     const newRequestHeaders = new Headers(request.headers);

//     //Create new Response and add New Headers
//     const response = NextResponse.next({
//       request: {
//         headers: newRequestHeaders,
//       },
//     });

//     //set newly generated sessionCartId in the response cookies
//     response.cookies.set("sessionCartId", sessionCartId);
//     return response;
//   } else {
//     return true;
//   }
// },
