"use server";
import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "../utils";

export async function GetLatestProduct() {
  const data = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  return convertToPlainObject(data);
}

//Get Single products by its slug
export async function GetProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug: slug },
  });
}
