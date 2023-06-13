import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, User } from "../../entities";
import { IUserReturn, IUserWithOutAddress } from "../../interfaces/users.interface";
import { returnUserSchema, userWithoutAddressSchema } from "../../schemas/users.schema";
import { hashSync } from "bcryptjs";
import { AppError } from "../../errors";
import { IAddress } from "../../interfaces/address.interface";

export const createUserService = async (
  address: IAddress,
  data: IUserWithOutAddress
): Promise<IUserReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const addressRepository: Repository<Address> = AppDataSource.getRepository(Address);
  const validatedUserSchema = userWithoutAddressSchema.parse(data);

  validatedUserSchema.password = hashSync(validatedUserSchema.password, 10);

  data = validatedUserSchema;

  const newAddress: Address = addressRepository.create(address);
  await addressRepository.save(newAddress);

  const user: User = userRepository.create({
    ...data,
    address: newAddress,
  });

  await userRepository.save(user);

  return returnUserSchema.parse(user);
};
