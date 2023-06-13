import { NextFunction, Request, Response } from "express";

export const ensureIsOwner =async ( req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const authenticatedUser = req.user;

}