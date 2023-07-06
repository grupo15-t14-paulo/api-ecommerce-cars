import { hashSync } from "bcryptjs";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User, Address } from "../../entities";
import { IAddress } from "../../interfaces/address.interface";
import { IUserWithOutAddress, IUserReturn, IUser } from "../../interfaces/users.interface";
import { userWithoutAddressSchema, returnUserSchema } from "../../schemas/users.schema";

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
