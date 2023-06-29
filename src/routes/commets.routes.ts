import { ensureDataIsValid } from "../middleware/ensureDataIsValid.middleware";
import { ensureIsOwner } from "../middleware/ensureIsSellerAndOwner.middleware";
import { ensureIsOwnerOrSeller } from "../middleware/ensureIsSellerOrOwner.middleware";
import { ensureTokenIsValidMiddleware } from "../middleware/ensureTokenIsValidMiddleware";
import { commentsCreateSchema } from "../schemas/comments.schema";
import {
  createCommentsController,
  deleteCommentsController,
  updateCommentsController,
} from "./../controllers/comments.controllers";
import { Router } from "express";

export const commentsRoutes: Router = Router();

commentsRoutes.use(ensureTokenIsValidMiddleware);

commentsRoutes.post(
  "/:id",
  ensureDataIsValid(commentsCreateSchema),
  createCommentsController
);

commentsRoutes.patch(
  "/:id",
  ensureIsOwner,
  ensureDataIsValid(commentsCreateSchema),
  updateCommentsController
);

commentsRoutes.delete("/:id", ensureIsOwnerOrSeller, deleteCommentsController);
