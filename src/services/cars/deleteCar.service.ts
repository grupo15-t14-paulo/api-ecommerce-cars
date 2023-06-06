import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Car } from "../../entities";
import { deleteImageService } from "../images/deleteImage.service";

export const deleteCarService = async (id: string): Promise<void> => {
  const carRepository: Repository<Car> = AppDataSource.getRepository(Car);

  const foundCar: Car | null = await carRepository.findOne({
    where: {
      id,
    },
    relations: {
      images: true,
    },
  });

  if (foundCar?.images.length! > 0) {
    foundCar?.images.forEach(async (img) => {
      await deleteImageService(img.id);
    });
  }

  await carRepository.remove(foundCar!);
};
