import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Comments } from "../entities/comments.entites";
import { AppError } from "../errors";

export const ensureIsOwnerOrSeller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userAuth = res.locals.user;
  const id = req.params.id;

  const commentsRepo: Repository<Comments> =
    AppDataSource.getRepository(Comments);

  const findComment = await commentsRepo.findOne({
    where: { id: id },
    relations: {
      car: { user: true },
      user: true,
    },
  });

  if (!findComment) {
    throw new AppError("Comment not found!", 404);
  }

  if (
    userAuth.id === findComment.user.id ||
    findComment.car.user.id === userAuth.id
  ) {
    return next();
  } else {
    throw new AppError("Insuficient permission", 404);
  }
};
