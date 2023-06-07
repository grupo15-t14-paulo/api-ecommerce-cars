import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Car } from "../../entities";
import { IReturnAllCars } from "../../interfaces/cars.interfaces";
import { returnAllCarsSchema } from "../../schemas/cars.schema";

export const listAllCarsService = async (): Promise<IReturnAllCars> => {
  const carsRepository: Repository<Car> = AppDataSource.getRepository(Car);

  const findCars: Array<Car> = await carsRepository.find({
    relations: {
      images: true,
    },
  });

  const cars = returnAllCarsSchema.parse(findCars);

  return cars;
};
