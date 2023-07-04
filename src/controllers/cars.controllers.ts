import { Request, Response } from "express";
import { createCarService } from "../services/cars/createCar.service";
import { listAllCarsService } from "../services/cars/listAllCars.service";
import { updateCarService } from "../services/cars/updateCar.service";
import { deleteCarService } from "../services/cars/deleteCar.service";
import { listCarsByUserIdService } from "../services/cars/listCarsById.service";
import { listOneCarById } from "../services/cars/listOneCar.service";

export const createCarController = async (req: Request, res: Response): Promise<void> => {
  try {
    const carData = req.body;
    const userId = res.locals.user.id;

    const newCar = await createCarService(carData, userId);

    res.status(201).json(newCar);
  } catch (error) {
    console.error("Error creating car:", error);
    res.status(500).json({ error: "Failed to create car" });
  }
};

export const listAllCarsController = async (req: Request, res: Response): Promise<void> => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 12;
  const { brand, model, color, year, minPrice, maxPrice, minMileage, maxMileage, fuel } = req.query;

  const filters = {
    brand: brand && brand.toString(),
    color: color && color.toString(),
    year: year && year.toString(),
    model: model && model.toString(),
    fuel: fuel && fuel.toString(),
    minPrice: minPrice && parseInt(minPrice as string),
    maxPrice: maxPrice && parseInt(maxPrice as string),
    minMileage: minMileage && parseInt(minMileage as string),
    maxMileage: maxMileage && parseInt(maxMileage as string),
  } as {
    brand?: string;
    color?: string;
    year?: string;
    model?: string;
    fuel?: string;
    minPrice?: string;
    maxPrice?: string;
    minMileage?: string;
    maxMileage?: string;
  };

  try {
    const cars = await listAllCarsService(page, pageSize, filters);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const listCarsByUserIdController = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.userId;

  try {
    const cars = await listCarsByUserIdService(userId);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const listOneCarByIdController = async (req: Request, res: Response): Promise<void> => {
  const carId = req.params.carId;

  try {
    const cars = await listOneCarById(carId);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateCarController = async (req: Request, res: Response): Promise<Response> => {
  const carData = req.body;
  const id: string = req.params.id;

  const car = await updateCarService(carData, id);

  return res.json(car);
};

export const deleteCarController = async (req: Request, res: Response): Promise<Response> => {
  const id: string = req.params.id;

  await deleteCarService(id);

  return res.status(200).send();
};
