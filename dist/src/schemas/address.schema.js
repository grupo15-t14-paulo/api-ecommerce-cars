"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserAddressSchema = exports.returnAddressSchema = exports.addressSchema = void 0;
const zod_1 = require("zod");
exports.addressSchema = zod_1.z.object({
    street: zod_1.z.string().min(1).max(255),
    city: zod_1.z.string().min(1).max(255),
    cep: zod_1.z.string().min(8),
    number: zod_1.z.string().min(1).max(11),
    state: zod_1.z.string().max(150),
    complement: zod_1.z.string().nullable(),
});
exports.returnAddressSchema = exports.addressSchema.extend({
    id: zod_1.z.string().uuid(),
});
exports.updateUserAddressSchema = exports.addressSchema.partial();
