import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";
import { Car } from "../entities";

export const ensureIsOwnerCar = async (req: Request, res: Response, next: NextFunction) => {
  const userAuth = res.locals.user;
  const id = req.params.id;

  const carRepo: Repository<Car> = AppDataSource.getRepository(Car);

  const findCar = await carRepo.findOne({
    where: { id: id },
    relations: {
      user: true,
    },
  });

  if (!findCar) {
    throw new AppError("Annoucement not found!", 404);
  }
  console.log("to aqui");
  if (userAuth.id === findCar.user.id) {
    return next();
  } else {
    throw new AppError("Insuficient permission", 404);
  }
};
