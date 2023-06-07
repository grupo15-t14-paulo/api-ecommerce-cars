import { Car, Image } from "../../entities";
import { ICar, ICarReturn } from "../../interfaces/cars.interfaces";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { returnCarSchema } from "../../schemas/cars.schema";

export const createCarService = async (carData: ICar): Promise<ICarReturn> => {
  const imgRepository: Repository<Image> = AppDataSource.getRepository(Image);

  const images = carData.images.map((imageData) => {
    const image = imgRepository.create(imageData);
    return image;
  });

  await imgRepository.save(images);

  const carRepository: Repository<Car> = AppDataSource.getRepository(Car);

  const car: Car = carRepository.create({
    ...carData,
    images: images,
  });

  await carRepository.save(car);

  const newData = returnCarSchema.parse(car);

  return newData;
};
