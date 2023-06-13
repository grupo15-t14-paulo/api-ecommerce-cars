import { Request, Response } from "express";
import { createUserService } from "../services/users/createUser.service";
import { reatriveUserService } from "../services/users/reatriveUser.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import { updateUserService } from "../services/users/updateUser.service";

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
  const { address, ...body } = req.body;

  const newUser = await createUserService(address, body);

  return res.status(201).json(newUser);
};

export const reatriveUserController = async (req: Request, res: Response): Promise<Response> => {
  const userId = res.locals.user.id;

  const user = await reatriveUserService(userId);

  return res.status(200).json(user);
};

export const listUserController = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.params.id;

  const user = await reatriveUserService(userId);

  return res.status(200).json(user);
};

export const updateUserController = async (req: Request, res: Response): Promise<Response> => {
  const userId = res.locals.user.id;
  const body = req.body;

  const user = await updateUserService(userId, body);

  return res.status(200).json(user);
};

export const deleteUserController = async (req: Request, res: Response): Promise<Response> => {
  const userId = res.locals.user.id;

  await deleteUserService(userId);

  return res.send(200);
};
