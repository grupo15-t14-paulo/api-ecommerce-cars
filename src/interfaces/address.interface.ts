import { z } from "zod";
import { adressSchema, returnAdressSchema } from "../schemas/address.schema";

export type IAddress = z.infer<typeof adressSchema>;
export type IAddressReturn = z.infer<typeof returnAdressSchema>;
