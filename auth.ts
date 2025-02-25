import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";
import { authConfig } from "./auth.config";
// import type { NextAuthConfig } from "next-auth";
// import { cookies} from "next/headers";
// import { NextResponse } from "next/server";

export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60,
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
        token.role = user.role;

        //if user has no name
        if (user.name === "N0_NAME") token.name = user.email!.split("@")[0];

        //Update database to reflect token name
        await prisma.user.update({
          where: { id: user.id },
          data: { name: token.name },
        });
      }
      return token;
    },
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
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
