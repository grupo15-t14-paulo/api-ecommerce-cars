"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLoginSchema = void 0;
const zod_1 = require("zod");
exports.createLoginSchema = zod_1.z.object({
    email: zod_1.z.string().max(45),
    password: zod_1.z.string().max(45),
});
