import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Car, User } from "../entities";
import { AppError } from "../errors";

export const ensureIsOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userAuth = res.locals.user;
  const id = req.params.id;

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: userAuth.id });

  const carRepository: Repository<Car> = AppDataSource.getRepository(Car);

  const foundCar: Car | null = await carRepository.findOne({
    where: {
      id,
    },
    relations: {
      user: true,
    },
  });

  if (user!.id === foundCar?.user.id) {
    return next();
  } else {
    throw new AppError("Not have Autorizarization", 403);
  }
};
