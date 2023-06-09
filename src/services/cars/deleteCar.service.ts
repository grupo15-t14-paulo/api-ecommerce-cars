import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Car } from "../../entities";
import { deleteImageService } from "../images/deleteImage.service";
import { deleteCommentService } from "../comments/deleteComments.service";

export const deleteCarService = async (id: string): Promise<void> => {
  const carRepository: Repository<Car> = AppDataSource.getRepository(Car);

  const foundCar: Car | null = await carRepository.findOne({
    where: {
      id,
    },
    relations: {
      images: true,
      comments: true,
    },
  });

  if (foundCar?.comments.length! > 0) {
    for (const comment of foundCar?.comments!) {
      await deleteCommentService(comment.id);
    }
  }

  if (foundCar?.images.length! > 0) {
    for (const img of foundCar?.images!) {
      await deleteImageService(img.id);
    }
  }

  await carRepository.remove(foundCar!);
};
