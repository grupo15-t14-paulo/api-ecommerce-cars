import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Car } from "../../entities";
import { IReturnAllInfoCarsType, returnAllCarInfoSchema } from "../../schemas/cars.schema";

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
): Promise<IReturnAllInfoCarsType> => {
  const carsRepository: Repository<Car> = AppDataSource.getRepository(Car);

  const skip = (page - 1) * pageSize;

  const findCars = carsRepository
    .createQueryBuilder("car")
    .leftJoinAndSelect("car.images", "images")
    .leftJoinAndSelect("car.user", "users")
    .skip(skip)
    .take(pageSize);

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

  const [cars, totalCount] = await findCars.getManyAndCount();
  const allCars = returnAllCarInfoSchema.parse(cars);

  const totalPages = Math.ceil(totalCount / (pageSize || totalCount)) || 1;

  const nextPage = page < totalPages ? page + 1 : null;
  const prevPage = page > 1 ? page - 1 : null;

  return {
    nextPage,
    prevPage,
    totalPages,
    cars: allCars,
  };
};
