"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageReturnSchema = exports.imageCreateSchema = void 0;
const zod_1 = require("zod");
exports.imageCreateSchema = zod_1.z.object({
    urlImage: zod_1.z.string().min(1).max(255),
});
exports.imageReturnSchema = exports.imageCreateSchema.extend({
    id: zod_1.z.string().uuid(),
});
