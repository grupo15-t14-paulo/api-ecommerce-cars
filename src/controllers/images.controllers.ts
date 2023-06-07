import { Request, Response } from "express";
import { updateImageService } from "../services/images/updateImage.service";
import { deleteImageService } from "../services/images/deleteImage.service";

export const updateImageController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const imgData = req.body;
  const id = req.params.id;

  const image = await updateImageService(imgData, id);

  return res.json(image);
};

export const deleteImageController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.params.id;

  await deleteImageService(id);

  return res.status(200).send();
};
