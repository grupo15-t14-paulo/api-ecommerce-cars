import { Router } from "express";
import { ensureDataIsValid } from "../middleware/ensureDataIsValid.middleware";
import {
  updateUserWhitOutAdressSchema,
  userSchema,
} from "../schemas/users.schema";
import {
  createUserController,
  deleteUserController,
  listUserController,
  reatriveUserController,
  resetPassword,
  sendResetPassword,
  updateUserController,
} from "../controllers/users.controller";
import { ensureEmailExistMiddleware } from "../middleware/users/ensureEmailExist.middleware";
import { ensureUserIdExist } from "../middleware/users/ensureUserIdExist.middleware";
import { ensureTokenIsValidMiddleware } from "../middleware/ensureTokenIsValidMiddleware";

export const userRoutes: Router = Router();
userRoutes.post("/resetPassword", sendResetPassword);
userRoutes.patch("/resetPassword/:token", resetPassword);

userRoutes.post(
  "",
  ensureDataIsValid(userSchema),
  ensureEmailExistMiddleware,
  createUserController
);
userRoutes.get("/:id", ensureTokenIsValidMiddleware, listUserController);


userRoutes.use(ensureTokenIsValidMiddleware);
userRoutes.get("", reatriveUserController);

userRoutes.patch(
  "",
  ensureUserIdExist,
  ensureDataIsValid(updateUserWhitOutAdressSchema),
  updateUserController
);
userRoutes.delete("", ensureUserIdExist, deleteUserController);
