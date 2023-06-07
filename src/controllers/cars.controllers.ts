import { Request, Response } from "express";
import { createCarService } from "../services/cars/createCar.service";
import { listAllCarsService } from "../services/cars/listAllCars.service";
import { updateCarService } from "../services/cars/updateCar.service";
import { deleteCarService } from "../services/cars/deleteCar.service";

export const createCarController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const carData = req.body;

    const newCar = await createCarService(carData);

    res.status(201).json(newCar);
  } catch (error) {
    console.error("Error creating car:", error);
    res.status(500).json({ error: "Failed to create car" });
  }
};

export const listAllCarsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const cars = await listAllCarsService();

  return res.status(200).json(cars);
};

export const updateCarController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const carData = req.body;
  const id: string = req.params.id;

  const car = await updateCarService(carData, id);

  return res.json(car);
};

export const deleteCarController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: string = req.params.id;

  await deleteCarService(id);

  return res.status(200).send();
};
