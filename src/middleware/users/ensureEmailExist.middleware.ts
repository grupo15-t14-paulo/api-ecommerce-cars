import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
export const ensureEmailExistMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const userEmail = request.body.email;

  const emailExist: User | null = await userRepository.findOneBy({
    email: userEmail,
  });

  if (emailExist) {
    throw new AppError("Email already exists", 409);
  }

  return next();
};
