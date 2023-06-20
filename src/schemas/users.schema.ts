import { z } from "zod";
import { adressSchema, returnAdressSchema } from "./address.schema";
import { returnAllCarsSchema, returnCarSchema } from "./cars.schema";

export const userSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email({ message: "Invalid email address" }),
  cpf: z.string().min(11),
  password: z.string().min(6).max(255),
  tel: z.string().min(10, { message: "for example number 62994567899" }),
  dateBirth: z.string(),
  description: z.string().nullable(),
  isSeller: z.boolean().default(false),
  address: adressSchema,
});

export const userWithoutAddressSchema = userSchema.omit({ address: true });

export const returnUserSchema = userSchema
  .extend({
    id: z.string().uuid(),
    address: returnAdressSchema,
    announcement: z.array(returnCarSchema).optional(),
  })
  .omit({ password: true });

export const updateUserWhitOutAdressSchema = userWithoutAddressSchema.partial();
