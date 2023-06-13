import { NextFunction, Response, Request } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";

export const ensureUserIdExist = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const id = req.params.id;

  const findUser: User | null = await userRepository.findOneBy({ id: id });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  return next();
};
