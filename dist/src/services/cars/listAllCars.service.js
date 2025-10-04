"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAllCarsService = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const cars_schema_1 = require("../../schemas/cars.schema");
const listAllCarsService = (page, pageSize, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const carsRepository = data_source_1.AppDataSource.getRepository(entities_1.Car);
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
    if (filters.fuel) {
        findCars.andWhere("car.typeCar = :typeCar", { typeCar: filters.fuel });
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
    const [cars, totalCount] = yield findCars.getManyAndCount();
    const allCars = cars_schema_1.returnAllCarInfoSchema.parse(cars);
    const totalPages = Math.ceil(totalCount / (pageSize || totalCount)) || 1;
    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;
    return {
        nextPage,
        prevPage,
        totalPages,
        cars: allCars,
    };
});
exports.listAllCarsService = listAllCarsService;
