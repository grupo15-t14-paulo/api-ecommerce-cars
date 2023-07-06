import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { deleteCarService } from "../cars/deleteCar.service";

export const deleteUserService = async (id: string): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      announcement: true,
    },
  });

  if (user?.announcement?.length! > 0) {
    user?.announcement?.forEach(async (car) => {
      await deleteCarService(car.id);
    });
  }

  await userRepository.remove(user!);
};
