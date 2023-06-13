import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export const ensureIsSeller = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authenticatedUser = req.user;

  if (authenticatedUser.isSeller === false) {
    throw new AppError("Insufficient permission", 403);
  }
  return next();
};
