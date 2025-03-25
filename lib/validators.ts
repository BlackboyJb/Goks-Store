import { z } from "zod";
import { Payment_METHOD } from "./constants";
// import { formatNumbertoDecimal } from "./utils";

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(value),
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
  console_type: z.string().min(1, "Console type is required"),
});

///schema for updating product
export const updateProductSchema = insertProductSchemas.extend({
  id: z.string().min(1, "Id is Required"),
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

//cart schemas
export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product is Required"),
  name: z.string().min(1, "Name is Required"),
  slug: z.string().min(1, "Slug is Required"),
  qty: z.number().int().nonnegative("Quantity must be a positive Number"),
  image: z.string().min(1, "Image is Required"),
  price: currency,
});

export const InsertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  sessionCartId: z.string().min(1, "Session Cart Id is Required"),
  userId: z.string().optional().nullable(),
});

//Schema for Shipping Address
export const ShippingAddressSchema = z.object({
  fullName: z.string().min(3, "fullName must be at least 3 characters"),
  streetAddress: z.string().min(3, "fullNam must be at least 3 characters"),
  country: z.string().min(3, "fullName must be at least 3 characters"),
  city: z.string().min(3, "fullName must be at least 3 characters"),
  postalCode: z.string().min(3, "fullName must be at least 3 characters"),
  lng: z.number().optional(),
  lat: z.number().optional(),
});

//Schema for Payment Method
export const PaymentMethodSchema = z
  .object({
    type: z.string().min(1, "Payment Method is Required"),
  })
  .refine((data) => Payment_METHOD.includes(data.type), {
    path: ["type"],
    message: "Invalid Payment Method",
  });

//Schema for Inserting Order
export const insertOrderSchema = z.object({
  userId: z.string().min(1, "User is Required"),
  shippingAddress: ShippingAddressSchema,
  paymentMethod: z.string().refine((data) => Payment_METHOD.includes(data), {
    message: "Invalid Payment Method",
  }),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
});

//Schema for Inserting Order Item
export const insertOrderItemSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  image: z.string(),
  name: z.string(),
  price: currency,
  qty: z.number(),
});

//schema for paypal result schema
export const paymentResultSchema = z.object({
  id: z.string(),
  status: z.string(),
  email_address: z.string(),
  PricePaid: z.string(),
});

//schema for updating user Profile
export const updateProfileSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().min(3, "Invalid email address"),
    password: z
      .union([
        z.string().min(6, "Password must be at least 6 characters"),
        z.literal(""),
      ])
      .optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.password && data.password !== "") {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }
  );

//schema to update user info from Admin
export const AdminUserUpdate = z.object({
  id: z.string().min(1, "ID is required"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().min(3, "Invalid email address"),
  role: z.string().min(1, "Role is Required"),
});
