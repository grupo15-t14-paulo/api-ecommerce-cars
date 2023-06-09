import { z } from "zod";

export const addressSchema = z.object({
  street: z.string().min(1).max(255),
  city: z.string().min(1).max(255),
  cep: z.string().min(8),
  number: z.string().min(1).max(11),
  state: z.string().max(150),
  complement: z.string().nullable(),
});

export const returnAddressSchema = addressSchema.extend({
  id: z.string().uuid(),
});

export const updateUserAddressSchema = addressSchema.partial();
