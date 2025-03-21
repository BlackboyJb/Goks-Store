"use server";
import { prisma } from "@/db/prisma";
import { convertToPlainObject, formatError } from "../utils";
import { PAGE_SIZE } from "../constants";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { insertProductSchemas, updateProductSchema } from "../validators";

export async function GetLatestProduct() {
  const data = await prisma.product.findMany({
    take: 4,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
  });

  return convertToPlainObject(data);
}

//Get Single products by its slug
export async function GetProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug: slug },
  });
}

//Get Single products by its ID
export async function GetProductById(productId: string) {
  const data = await prisma.product.findFirst({
    where: { id: productId },
  });

  return convertToPlainObject(data);
}

//Get All Products
export async function getAllProducts({
  // query,
  limit = PAGE_SIZE,
  page,
}: // category,
{
  query: string;
  limit?: number;
  page: number;
  category: string;
}) {
  const data = await prisma.product.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });

  const dataCount = await prisma.product.count();

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}

///Delete a product
export async function deleteProduct(id: string) {
  try {
    const productExist = await prisma.product.findFirst({
      where: { id },
    });
    if (!productExist) throw new Error("Product does not Exist");

    await prisma.product.delete({ where: { id } });

    revalidatePath("/admin/products");

    return { success: true, message: "Product deleted Successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// create a product
export async function createProduct(
  data: z.infer<typeof insertProductSchemas>
) {
  try {
    const product = insertProductSchemas.parse(data);
    await prisma.product.create({ data: product });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product created successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// UPDATE a product
export async function updateProduct(data: z.infer<typeof updateProductSchema>) {
  try {
    const product = updateProductSchema.parse(data);
    const productExists = await prisma.product.findFirst({
      where: { id: product.id },
    });

    if (!productExists) throw new Error("Product not found");

    await prisma.product.update({
      where: { id: product.id },
      data: product,
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product updated successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
