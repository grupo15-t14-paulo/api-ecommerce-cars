import { returnSchemaWithoutPasswordAll } from './../../schemas/cars.schema';
import { Car } from "../../entities";
import { AppDataSource } from "../../data-source";
import { IReturnAnnoucement } from '../../interfaces/cars.interfaces';

export const listOneCarById = async (carId: string): Promise<IReturnAnnoucement> => {
  const carsRepository = AppDataSource.getRepository(Car);

  const findCar = await carsRepository.findOne({
    where: {
      id: carId,
    },
    relations: {
      images: true,
      user: true,
      comments:{user:true}
    },
  });
  
  const car = returnSchemaWithoutPasswordAll.parse(findCar);

  return car;
};
