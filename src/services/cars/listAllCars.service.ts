import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Car } from "../../entities";
import { IReturnAllCars } from "../../interfaces/cars.interfaces";
import { returnAllCarsSchema } from "../../schemas/cars.schema";

export const listAllCarsService = async (
  page: number,
  pageSize: number
): Promise<IReturnAllCars> => {
  const carsRepository: Repository<Car> = AppDataSource.getRepository(Car);

  const skip = (page - 1) * pageSize;

  const findCars: Array<Car> = await carsRepository.find({
    relations: {
      images: true,
    },
    skip,
    take: pageSize,
  });

  const cars = returnAllCarsSchema.parse(findCars);

  return cars;
};
