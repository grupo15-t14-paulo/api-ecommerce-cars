import { z } from "zod";
import { addressSchema, returnAddressSchema } from "../schemas/address.schema";

export type IAddress = z.infer<typeof addressSchema>;
export type IAddressReturn = z.infer<typeof returnAddressSchema>;
