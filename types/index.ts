import { z } from "zod";
import {
  insertProductSchemas,
  InsertCartSchema,
  cartItemSchema,
  ShippingAddressSchema,
  insertOrderItemSchema,
  insertOrderSchema,
  paymentResultSchema,
} from "@/lib/validators";

export type product = z.infer<typeof insertProductSchemas> & {
  id: string;
  rating: string;
  createdAt: Date;
};

export type cart = z.infer<typeof InsertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type shippingAddress = z.infer<typeof ShippingAddressSchema>;
export type OrderItem = z.infer<typeof insertOrderItemSchema>;
export type PaymentResult = z.infer<typeof paymentResultSchema>;
export type Order = z.infer<typeof insertOrderSchema> & {
  id: string;
  createdAt: Date;
  isPaid: boolean;
  paidAt: Date | null;
  isDelivered: boolean;
  deliveredAt: Date | null;
  orderitems: OrderItem[];
  user: { name: string; email: string };
};
