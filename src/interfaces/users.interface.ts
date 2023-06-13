import { z } from "zod";
import { returnUserSchema, userSchema, userWithoutAddressSchema } from "../schemas/users.schema";
import { DeepPartial } from "typeorm";

export type IUser = z.infer<typeof userSchema>;
export type IUserReturn = z.infer<typeof returnUserSchema>;
export type IUserWithOutAddress = z.infer<typeof userWithoutAddressSchema>;
export type IUserUpdate = DeepPartial<IUser>;
