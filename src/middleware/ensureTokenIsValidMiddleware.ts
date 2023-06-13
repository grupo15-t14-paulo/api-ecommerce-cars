import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import jwt from "jsonwebtoken";

export const ensureTokenIsValidMiddleware = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<void> => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Missing bearer token", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (error, decode: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    req.user = {
      id: decode.sub,
    };
    return next();
  });
};
