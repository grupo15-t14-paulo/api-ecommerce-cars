import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { AppError } from "../../errors";
import { Image } from "../../entities";

export const verifyImageExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const carRepository: Repository<Image> = AppDataSource.getRepository(Image);

  const id = req.params.id;

  const foundImg: Image | null = await carRepository.findOneBy({
    id,
  });

  if (!foundImg) throw new AppError("Image not found.", 404);

  return next();
};
