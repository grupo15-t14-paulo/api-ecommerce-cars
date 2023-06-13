import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { IUserReturn } from "../../interfaces/users.interface";
import { returnUserSchema } from "../../schemas/users.schema";

export const reatriveUserService = async (userId: string): Promise<IUserReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository.find({
    where: {
      id: userId,
    },
    relations: {
      address: true,
    },
  });

  console.log(user[0]);
  return returnUserSchema.parse(user[0]);
};
