import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Car } from "../../entities";
import { Repository } from "typeorm";
import { AppError } from "../../errors";

export const verifyCarExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const carRepository: Repository<Car> = AppDataSource.getRepository(Car);

  const id = req.params.id;

  const foundCar: Car | null = await carRepository.findOneBy({
    id,
  });

  if (!foundCar) throw new AppError("Car not found.", 404);

  return next();
};
