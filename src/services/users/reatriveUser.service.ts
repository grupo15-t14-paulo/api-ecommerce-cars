import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { returnSchemaWithoutPassword } from "../../schemas/cars.schema";
import { IReturnUser } from "../../interfaces/cars.interfaces";

export const reatriveUserService = async (userId: string): Promise<IReturnUser> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const users: User | null = await userRepository.findOne({
    where: {
      id: userId,
    },
    relations: {
      address: true,
      announcement: {
        images: true,
        comments: {
          user: true,
        },
      },
    },
  });
  const returnUser = returnSchemaWithoutPassword.parse(users);

  return returnUser;
};
