import { IReturnAllCars } from "../../interfaces/cars.interfaces";
import { Car } from "../../entities";
import { returnAllCarsSchema } from "../../schemas/cars.schema";
import { AppDataSource } from "../../data-source";

export const listCarsByUserIdService = async (
  userId: string
): Promise<IReturnAllCars> => {
  const carsRepository = AppDataSource.getRepository(Car);

  const findCars: Array<Car> = await carsRepository.find({
    where: {
      id: userId,
    },
    relations: {
      images: true,
    },
  });

  const cars = returnAllCarsSchema.parse(findCars);

  return cars;
};
