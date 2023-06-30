import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Car } from "../../entities";
import { IReturnAllInfoCars } from "../../interfaces/cars.interfaces";
import { returnAllCarInfoSchema } from "../../schemas/cars.schema";

export const listAllCarsService = async (
  page: number,
  pageSize: number,
  filters: {
    brand?: string;
    color?: string;
    year?: string;
    model?: string;
    minPrice?: string;
    maxPrice?: string;
    minMileage?: string;
    maxMileage?: string;
  }
): Promise<IReturnAllInfoCars> => {
  const carsRepository: Repository<Car> = AppDataSource.getRepository(Car);

  const skip = (page - 1) * pageSize;

  const findCars = carsRepository
    .createQueryBuilder("car")
    .leftJoinAndSelect("car.images", "images")
    .leftJoinAndSelect("car.user", "users")
    .skip(skip)
    .take(pageSize)

  if (filters.brand) {
    findCars.andWhere("car.brand = :brand", { brand: filters.brand });
  }

  if (filters.model) {
    findCars.andWhere("car.model = :model", { model: filters.model });
  }

  if (filters.color) {
    findCars.andWhere("car.color = :color", { color: filters.color });
  }

  if (filters.year) {
    findCars.andWhere("car.year = :year", { year: filters.year });
  }

  if (filters.minPrice) {
    findCars.andWhere("car.price >= :minPrice", { minPrice: parseInt(filters.minPrice) });
  }

  if (filters.maxPrice) {
    findCars.andWhere("car.price <= :maxPrice", { maxPrice: parseInt(filters.maxPrice) });
  }

  if (filters.minMileage) {
    findCars.andWhere("car.mileage >= :minMileage", { minMileage: parseInt(filters.minMileage) });
  }

  if (filters.maxMileage) {
    findCars.andWhere("car.mileage <= :maxMileage", { maxMileage: parseInt(filters.maxMileage) });
  }

  const carsAll = await findCars.getMany();

  const cars = returnAllCarInfoSchema.parse(carsAll);

  return cars;
};
