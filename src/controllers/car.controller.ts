import { Request, Response } from "express";
import { createCarService } from "../services/createCar.service";
import { listAllCarsService } from "../services/listAllCars.service";

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
  request: Request,
  response: Response
) => {
  const cars = await listAllCarsService();

  return response.status(200).json(cars);
};
