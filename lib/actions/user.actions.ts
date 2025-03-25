"use server";

import {
  ShippingAddressSchema,
  signInSchema,
  signUpSchema,
  PaymentMethodSchema,
  AdminUserUpdate,
} from "@/lib/validators";
import { auth, signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";
import { formatError } from "../utils";
import { shippingAddress } from "@/types";
import { z } from "zod";
import { PAGE_SIZE } from "../constants";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

//sign in User with Credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);

    return { success: true, message: "Signed In Successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: "Invalid Email or Password" };
  }
}

///sign User Out
export async function signOutUser() {
  await signOut();
}

//User sign Up action
export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const plainPassword = user.password;

    user.password = hashSync(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: plainPassword,
    });

    return { success: true, message: "User Registered Successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: formatError(error),
    };
  }
}

//Get User by the ID
export async function getUserById(userId: string) {
  const user = await prisma.user.findFirst({
    where: { id: userId },
  });
  if (!user) throw new Error("User not found");
  return user;
}

//update the User Address
export async function updateUserAddress(data: shippingAddress) {
  try {
    const session = await auth();
    const cuurentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });

    if (!cuurentUser) throw new Error("User not Found");

    const address = ShippingAddressSchema.parse(data);

    await prisma.user.update({
      where: { id: cuurentUser.id },
      data: { address },
    });
    return {
      success: true,
      message: "User updated Successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

//Payment Method Schema
export async function updatePaymentMethod(
  data: z.infer<typeof PaymentMethodSchema>
) {
  try {
    const session = await auth();
    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });

    if (!currentUser) throw new Error("User Not Found");

    const paymentMethod = PaymentMethodSchema.parse(data);

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { paymentMethod: paymentMethod.type },
    });

    return {
      success: true,
      message: "Payment Method Updated Successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Update the user profile
export async function updateProfile(user: {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}) {
  try {
    const session = await auth();

    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });

    if (!currentUser) throw new Error("User not Found");

    // Prepare update data with strict typing
    const updateData: Partial<{
      name: string;
      email: string;
      password: string;
    }> = {};

    if (user.name) updateData.name = user.name;
    if (user.email) updateData.email = user.email;
    if (user.password) updateData.password = hashSync(user.password, 10);

    // Update user if there are fields to update
    if (Object.keys(updateData).length > 0) {
      await prisma.user.update({
        where: { id: currentUser.id },
        data: updateData,
      });
    }

    return { success: true, message: "User Profile Updated Successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

//get all users
export async function getAllUsers({
  limit = PAGE_SIZE,
  page,
  query,
}: {
  limit?: number;
  page: number;
  query: string;
}) {
  const queryFilter: Prisma.UserWhereInput =
    query && query !== "all"
      ? {
          name: {
            contains: query,
            mode: "insensitive",
          } as Prisma.StringFilter,
        }
      : {};
  const data = await prisma.user.findMany({
    where: { ...queryFilter },
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: (page - 1) * limit,
  });

  const dataCount = await prisma.user.count();

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}

///delete a user
export async function deleteUsers(id: string) {
  try {
    await prisma.order.delete({ where: { id } });
    revalidatePath("/admin/users");

    return { success: true, message: "User Deleted Successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

//update user
export async function AdminUpdateUser(user: z.infer<typeof AdminUserUpdate>) {
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        role: user.role,
      },
    });

    revalidatePath("/admin/users");
    return { success: "true", message: "User Updated Successfully" };
  } catch (error) {
    return { success: "false", message: formatError(error) };
  }
}
