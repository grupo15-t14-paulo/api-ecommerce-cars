import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Car } from "../../entities";
import { ICarReturn, IUpdateCar } from "../../interfaces/cars.interfaces";
import { returnCarSchema } from "../../schemas/cars.schema";

export const updateCarService = async (
  carData: IUpdateCar,
  id: string
): Promise<ICarReturn> => {
  const carRepository: Repository<Car> = AppDataSource.getRepository(Car);

  const foundCar: Car | null = await carRepository.findOne({
    relations: {
      images: true,
    },
    where: {
      id,
    },
  });

  const car: Car = carRepository.create({
    ...foundCar,
    ...carData,
  });
  await carRepository.save(car);

  const updatedCar = returnCarSchema.parse(car);

  return updatedCar;
};
