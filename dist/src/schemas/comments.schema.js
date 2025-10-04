"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnPatchComment = exports.returnCommentSchema = exports.userId = exports.commentsCreateSchema = void 0;
const zod_1 = require("zod");
exports.commentsCreateSchema = zod_1.z.object({
    comment: zod_1.z.string(),
});
exports.userId = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
exports.returnCommentSchema = exports.commentsCreateSchema.extend({
    id: zod_1.z.string().uuid(),
    createdAt: zod_1.z.string().or((0, zod_1.date)()),
    user: exports.userId,
});
exports.returnPatchComment = exports.returnCommentSchema.omit({ user: true });
