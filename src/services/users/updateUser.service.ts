import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, User } from "../../entities";
import { IUserReturn } from "../../interfaces/users.interface";
import { returnUserSchema } from "../../schemas/users.schema";
import { AppError } from "../../errors";
import { returnAddressSchema } from "../../schemas/address.schema";
import { IAddress, IAddressReturn } from "../../interfaces/address.interface";
export const updateUserService = async (
  userId: string,
  userData: IAddress
): Promise<IUserReturn | IAddressReturn> => {
  const validations: string[] = ["cep", "street", "number", "city", "state"];
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);
  const validatorData = Object.keys(userData).every((prop) =>
    validations.includes(prop)
  );
  const findUser: User | null = await userRepository.findOne({
    where: {
      id: userId,
    },
    relations: {
      address: true,
    },
  });
  if (!findUser) {
    throw new AppError("User not found!", 404);
  }
  if (validatorData) {
    const findAddress = await addressRepository.findOneBy({
      id: findUser.address.id,
    });
    const newAddress = addressRepository.create({
      ...findAddress,
      ...userData,
    });
    await addressRepository.save(newAddress);
    const returAddress = returnAddressSchema.parse(newAddress);
    return returAddress;
  }
  const oldUser = await userRepository.find({
    where: {
      id: userId,
    },
    relations: {
      address: true,
    },
  });
  const user = userRepository.create({
    ...oldUser[0],
    ...userData,
  });
  const test = await userRepository.save(user);
  const updateUser = returnUserSchema.parse(test);
  return updateUser;
};
