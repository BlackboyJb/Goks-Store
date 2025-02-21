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
  email: z.string().email("invalid Email Address"),
  password: z.string().min(6, "Passowrd must be least six Characters"),
});
// Schema for signing up a user
export const signUpSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
