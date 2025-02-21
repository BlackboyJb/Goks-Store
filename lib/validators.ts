import { z } from "zod";
import { formatNumbertoDecimal } from "./utils";

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?₦/.test(formatNumbertoDecimal(Number(value))),
    "Price Must have two Decimal Places"
  );

///schema for inserting Product
export const insertProductSchemas = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  category: z.string().min(3, "Category must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  brand: z.string(),
  stock: z.coerce.number(),
  images: z.array(z.string().min(1, "Product must have at least one Image")),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});

//schema for User Sign in
export const signInSchema = z.object({
  email: z.string().email("invalid Email Adress"),
  password: z.string().min(6, "Passowrd must be least six Characters"),
});

//schema for User Sign up
export const signUpSchema = z
  .object({
    name: z.string().min(3, "Passoword must be least three Characters"),
    email: z.string().email("invalid Email Address"),
    password: z.string().min(6, "Passowrod must be least six Characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be least six Characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not Match",
    path: ["confirmPassword"],
  });
