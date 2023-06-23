import { DeepPartial } from "typeorm";
import { z } from "zod";
import {
  carCreateSchema,
  returnAllCarInfoSchema,
  returnAllCarsSchema,
  returnCarAndUserSchema,
  returnCarSchema,
} from "../schemas/cars.schema";

export type ICar = z.infer<typeof carCreateSchema>;
export type ICarReturn = z.infer<typeof returnCarSchema>;
export type IUpdateCar = DeepPartial<z.infer<typeof carCreateSchema>>;
export type IReturnAllCars = z.infer<typeof returnAllCarsSchema>;
export type IReturnAllCarsUser = z.infer<typeof returnCarAndUserSchema>;
export type IReturnAllInfoCars = z.infer<typeof returnAllCarInfoSchema>;
