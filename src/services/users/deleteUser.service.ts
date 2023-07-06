import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { deleteCarService } from "../cars/deleteCar.service";
import { deleteCommentService } from "../comments/deleteComments.service";

export const deleteUserService = async (id: string): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      announcement: true,
      comments: true,
    },
  });

  if (user?.announcement?.length! > 0) {
    for (const car of user?.announcement!) {
      await deleteCarService(car.id);
    }
  }

  if (user?.comments) {
    for (const comment of user?.comments) {
      await deleteCommentService(comment.id);
    }
  }

  await userRepository.remove(user!);
};
