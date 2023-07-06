import { Address } from "./../entities/address.entities";
import { z } from "zod";
import { imageCreateSchema, imageReturnSchema } from "./image.schema";
import { fuel } from "../entities/cars.entities";
import { returnUserSchema, returnUserSchemaWithOutAdress } from "./users.schema";
import { returnPatchComment, userId } from "./comments.schema";
import { IReturnAllInfoCars } from "../interfaces/cars.interfaces";

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

const userSchemaGetOne = z.object({
  id: z.string(),
  name: z.string(),
});

export const returnSchemaWithoutPasswordAll = z.object({
  id: z.string().uuid(),
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
  user: z.object({
    id: z.string().uuid(),
    name: z.string().min(3).max(255),
    email: z.string().email({ message: "Invalid email address" }),
    cpf: z.string().min(11),
    tel: z.string().min(10, { message: "for example number 62994567899" }),
    dateBirth: z.string(),
    description: z.string().nullable(),
    isSeller: z.boolean().default(false),
  }),
  comments: z.array(
    z.object({
      id: z.string().uuid(),
      comment: z.string(),
      createdAt: z.date(),
      user: userSchemaGetOne,
    })
  ),
});
export const returnSchemaWithoutPassword = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(255),
  email: z.string().email({ message: "Invalid email address" }),
  cpf: z.string().min(11),
  tel: z.string().min(10, { message: "for example number 62994567899" }),
  dateBirth: z.string(),
  description: z.string().nullable(),
  isSeller: z.boolean().default(false),
  address: z.object({
    street: z.string().min(1).max(255),
    city: z.string().min(1).max(255),
    cep: z.string().min(8),
    number: z.string().min(1).max(11),
    state: z.string().max(150),
    complement: z.string().nullable(),
  }),
  announcement: z.array(
    z.object({
      id: z.string().uuid(),
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
      comments: z.array(
        z.object({
          id: z.string().uuid(),
          comment: z.string(),
          user: z.object({
            id: z.string().uuid(),
          }),
        })
      ),
    })
  ),
});

export const returnWithComments = z.object({
  id: z.string().uuid(),
  comment: z.string(),
  user: returnUserSchemaWithOutAdress,
});

export const returnCarSchema = carCreateSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string(),
  images: z.array(imageReturnSchema),
});

export const returnCarAndUserSchema = returnCarSchema.extend({
  user: returnUserSchemaWithOutAdress,
  comments: z
    .array(
      z.object({
        id: z.string().uuid(),
        comment: z.string(),
        user: z.object({
          id: z.string().uuid(),
        }),
      })
    )
    .optional(),
});

export const returnAllCarInfoSchema = returnCarAndUserSchema.array();

export const returnAllCarsSchema = returnCarSchema.array();

export const carUpdateSchema = carCreateSchema.partial();

export type IReturnAllInfoCarsType = {
  cars: IReturnAllInfoCars;
  nextPage: number | null;
  prevPage: number | null;
  totalPages: number | number;
};
