import { z } from "zod";
import { insertProductSchemas } from "@/lib/validators";

export type product = z.infer<typeof insertProductSchemas> & {
  id: string;
  rating: string;
  createdAt: Date;
};
