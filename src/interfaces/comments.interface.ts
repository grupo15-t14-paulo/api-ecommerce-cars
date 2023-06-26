import { DeepPartial } from "typeorm";
import { z } from "zod";
import { commentsCreateSchema } from "../schemas/comments.schema";

export type IComments = z.infer<typeof commentsCreateSchema>;
export type IUpdateComment = DeepPartial<z.infer<typeof commentsCreateSchema>>;
