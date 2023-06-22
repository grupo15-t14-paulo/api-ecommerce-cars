import { ICarReturn } from "../../interfaces/cars.interfaces";
import { Car } from "../../entities";
import { AppDataSource } from "../../data-source";

export const listOneCarById = async (carId: string): Promise<any> => {
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

  //   const car = returAllInfoCarAndUserSchema.parse(findCar);

  return findCar;
};
