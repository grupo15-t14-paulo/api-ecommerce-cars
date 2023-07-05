import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Car, User } from "../entities";
import { AppError } from "../errors";
import { Comments } from "../entities/comments.entites";

export const ensureIsOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userAuth = res.locals.user;
  const id = req.params.id;

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: userAuth.id });

  const commentsRepo: Repository<Comments> =
    AppDataSource.getRepository(Comments);

  const findComment = await commentsRepo.findOne({
    where: { id: id },
    relations: {
      user: true,
    },
  });

  if (!findComment) {
    throw new AppError("Comment not found!", 404);
  }

  if (user!.id === findComment.user.id) {
    return next();
  } else {
    throw new AppError("Not have Autorizarization", 403);
  }
};
