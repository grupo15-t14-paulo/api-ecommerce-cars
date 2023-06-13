import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { IUserReturn, IUserUpdate } from "../../interfaces/users.interface";
import { returnUserSchema } from "../../schemas/users.schema";

export const updateUserService = async (
  id: string,
  userData: IUserUpdate
): Promise<IUserReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const oldUser = await userRepository.find({
    where: {
      id: id,
    },
    relations: {
      address: true,
    },
  });
  console.log(userData);

  const user = userRepository.create({
    ...oldUser[0],
    ...userData,
  });

  const test = await userRepository.save(user);

  const updateUser = returnUserSchema.parse(test);

  return updateUser;
};
