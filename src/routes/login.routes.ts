import { Router } from "express";
import { createLoginController } from "../controllers/login.controller";
import { createLoginSchema } from "../schemas/login.schema";
import { ensureDataIsValid } from "../middleware/ensureDataIsValid.middleware";

export const loginRoutes: Router = Router();

loginRoutes.post("", ensureDataIsValid(createLoginSchema), createLoginController);
