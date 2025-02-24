import { z } from "zod";
import {
  insertProductSchemas,
  InsertCartSchema,
  cartItemSchema,
} from "@/lib/validators";

export type product = z.infer<typeof insertProductSchemas> & {
  id: string;
  rating: string;
  createdAt: Date;
};

export type cart = z.infer<typeof InsertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
