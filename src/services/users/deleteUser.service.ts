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
      comments: true,
    },
  });
  if (user?.announcement) {
    user?.announcement?.forEach(async (car) => {
      await deleteCarService(car.id);
    });
  }

  if (user?.comments) {
    user?.comments.forEach(async (comment) => {
      await deleteCommentService(comment.id);
    });
  }

  await userRepository.remove(user!);
};
