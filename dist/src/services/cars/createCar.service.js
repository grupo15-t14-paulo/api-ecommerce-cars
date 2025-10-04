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
exports.createCarService = void 0;
const entities_1 = require("../../entities");
const data_source_1 = require("../../data-source");
const cars_schema_1 = require("../../schemas/cars.schema");
const createCarService = (carData, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const imgRepository = data_source_1.AppDataSource.getRepository(entities_1.Image);
    const userRepository = data_source_1.AppDataSource.getRepository(entities_1.User);
    const user = yield userRepository.findOneBy({ id: userId });
    const images = carData.images.map((imageData) => {
        const image = imgRepository.create(imageData);
        return image;
    });
    yield imgRepository.save(images);
    const carRepository = data_source_1.AppDataSource.getRepository(entities_1.Car);
    const car = carRepository.create(Object.assign(Object.assign({}, carData), { images: images, user: user }));
    yield carRepository.save(car);
    const newData = cars_schema_1.returnCarSchema.parse(car);
    return newData;
});
exports.createCarService = createCarService;
