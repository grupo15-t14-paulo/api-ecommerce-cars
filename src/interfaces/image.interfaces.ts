import { z } from "zod";
import { imageCreateSchema, imageReturnSchema } from "../schemas/image.schema";

export type IImage = z.infer<typeof imageCreateSchema>;
export type IImageReturn = z.infer<typeof imageReturnSchema>;
