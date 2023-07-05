import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Car, Image } from "../../entities";
import { ICar, ICarReturn, IUpdateCar } from "../../interfaces/cars.interfaces";
import { returnCarSchema } from "../../schemas/cars.schema";
import { deleteImageService } from "../images/deleteImage.service";

export const updateCarService = async (
  carData: IUpdateCar,
  id: string
): Promise<ICarReturn> => {
  const carRepository: Repository<Car> = AppDataSource.getRepository(Car);
  const imgRepository: Repository<Image> = AppDataSource.getRepository(Image);

  const foundCar: Car | null = await carRepository.findOne({
    relations: {
      images: true,
    },
    where: {
      id,
    },
  });

  foundCar?.images.forEach((img) => {
    deleteImageService(img.id);
  });

  const images = carData.images?.map((imageData) => {
    const image = imgRepository.create(imageData);
    return image;
  });

  await imgRepository.save(images!);

  const car: ICar = carRepository.create({
    ...foundCar,
    ...carData,
    images: images!,
  });
  await carRepository.save(car);

  const updatedCar = returnCarSchema.parse(car);

  return updatedCar;
};
