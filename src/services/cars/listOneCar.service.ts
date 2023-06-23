import { IReturnAllCarsUser } from "../../interfaces/cars.interfaces";
import { Car } from "../../entities";
import { AppDataSource } from "../../data-source";
import { returnCarAndUserSchema } from "../../schemas/cars.schema";

export const listOneCarById = async (carId: string): Promise<IReturnAllCarsUser> => {
  const carsRepository = AppDataSource.getRepository(Car);

  const findCar = await carsRepository.findOne({
    where: {
      id: carId,
    },
    relations: {
      images: true,
      user: true,
    },
  });

  const car = returnCarAndUserSchema.parse(findCar);

  return car;
};
