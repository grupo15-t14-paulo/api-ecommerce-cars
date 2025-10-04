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
exports.listOneCarById = void 0;
const cars_schema_1 = require("./../../schemas/cars.schema");
const entities_1 = require("../../entities");
const data_source_1 = require("../../data-source");
const listOneCarById = (carId) => __awaiter(void 0, void 0, void 0, function* () {
    const carsRepository = data_source_1.AppDataSource.getRepository(entities_1.Car);
    const findCar = yield carsRepository.findOne({
        where: {
            id: carId,
        },
        relations: {
            images: true,
            user: true,
            comments: { user: true }
        },
    });
    const car = cars_schema_1.returnSchemaWithoutPasswordAll.parse(findCar);
    return car;
});
exports.listOneCarById = listOneCarById;
