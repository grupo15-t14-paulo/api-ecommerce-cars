"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserWhitOutAdressSchema = exports.returnUserSchemaWithOutAdress = exports.returnUserSchema = exports.userWithoutAddressSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
const address_schema_1 = require("./address.schema");
const cars_schema_1 = require("./cars.schema");
exports.userSchema = zod_1.z.object({
    name: zod_1.z.string().min(3).max(255),
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    cpf: zod_1.z.string().min(11),
    password: zod_1.z.string().min(6).max(255),
    tel: zod_1.z.string().min(10, { message: "for example number 62994567899" }),
    dateBirth: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    isSeller: zod_1.z.boolean().default(false),
    address: address_schema_1.addressSchema,
});
exports.userWithoutAddressSchema = exports.userSchema.omit({ address: true });
exports.returnUserSchema = exports.userSchema
    .extend({
    id: zod_1.z.string().uuid(),
    address: address_schema_1.returnAddressSchema,
    announcement: zod_1.z.array(cars_schema_1.returnCarSchema).optional(),
})
    .omit({ password: true });
exports.returnUserSchemaWithOutAdress = exports.userWithoutAddressSchema
    .extend({
    id: zod_1.z.string().uuid(),
})
    .omit({ password: true });
exports.updateUserWhitOutAdressSchema = exports.userWithoutAddressSchema.partial();
