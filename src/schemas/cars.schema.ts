import { z } from "zod";
import { imageCreateSchema } from "./image.schema";
import { fuel } from "../entities/cars.entities";

export const carCreateSchema = z.object({
  brand: z.string().min(1).max(100),
  model: z.string().min(1).max(100),
  year: z.string(),
  typeCar: z.nativeEnum(fuel),
  mileage: z.number().positive(),
  color: z.string().min(1).max(100),
  fipePrice: z.number().positive(),
  price: z.number().positive(),
  description: z.string().optional().nullable(),
  imageCover: z.string().min(1).max(250),
  isAvailable: z.boolean().optional().nullable(),
  images: imageCreateSchema.array(),
});

export const returnCarSchema = carCreateSchema.extend({
  id: z.string().uuid(),
});

// export const returAllInfoCarAndUserSchema = z.object({
//   id: z.string().uuid(),
//   brand: z.string().min(1).max(100),
//   model: z.string().min(1).max(100),
//   year: z.string(),
//   typeCar: z.nativeEnum(fuel),
//   mileage: z.number().positive(),
//   color: z.string().min(1).max(100),
//   fipePrice: z.number().positive(),
//   price: z.number().positive(),
//   description: z.string().optional().nullable(),
//   imageCover: z.string().min(1).max(250),
//   isAvailable: z.boolean().optional().nullable(),
//   images: imageCreateSchema.array(),
//   user: testSchema,
// });

// export const returnCarAndUserSchema = carCreateSchema
//   .extend({
//     id: z.string().uuid(),
//     user: returnPersonalizeUserSchema,
//   })
//   .array();

export const returnAllCarsSchema = returnCarSchema.array();

export const carUpdateSchema = carCreateSchema.omit({ images: true }).partial();
