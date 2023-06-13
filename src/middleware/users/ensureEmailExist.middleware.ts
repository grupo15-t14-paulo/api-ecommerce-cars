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
  const userTel = request.body.tel;
  const userCpf = request.body.cpf;

  const emailExist: User | null = await userRepository.findOneBy({
    email: userEmail,
  });

  const telExist: User | null = await userRepository.findOneBy({
   tel: userTel,
  });

  const cpfExist: User | null = await userRepository.findOneBy({
   cpf: userCpf,
  });

  if (emailExist) {
    throw new AppError("Email already exists", 409);
  }

  if (telExist) {
    throw new AppError("Telephone already exists", 409);
  }

  if (cpfExist) {
    throw new AppError("Cpf already exists", 409);
  }

  return next();
};
