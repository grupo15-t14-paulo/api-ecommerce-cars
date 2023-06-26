import { Request, Response } from "express";
import { createCommentsService } from "../services/comments/createComments.service";
import { deleteCommentService } from "../services/comments/deleteComments.service";
import { updateComentService } from "../services/comments/updateComments.service";

export const createCommentsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const comments = req.body;
  const id = req.params.id;
  const userId = res.locals.id;
  const newComment = await createCommentsService(comments, id, userId);

  return res.status(201).json(newComment);
};

export const updateCommentsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const comentData = req.body;
  const comentId: string = req.params.id;

  const comment = await updateComentService(comentData, comentId);
  return res.json(comment);
};

export const deleteCommentsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: string = req.params.id;

  await deleteCommentService(id);

  return res.status(200).send();
};
