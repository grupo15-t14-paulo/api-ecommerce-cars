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
exports.updateCarService = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const cars_schema_1 = require("../../schemas/cars.schema");
const deleteImage_service_1 = require("../images/deleteImage.service");
const updateCarService = (carData, id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const carRepository = data_source_1.AppDataSource.getRepository(entities_1.Car);
    const imgRepository = data_source_1.AppDataSource.getRepository(entities_1.Image);
    const foundCar = yield carRepository.findOne({
        relations: {
            images: true,
        },
        where: {
            id,
        },
    });
    foundCar === null || foundCar === void 0 ? void 0 : foundCar.images.forEach((img) => {
        (0, deleteImage_service_1.deleteImageService)(img.id);
    });
    console.log(carData);
    const images = (_a = carData.images) === null || _a === void 0 ? void 0 : _a.map((imageData) => {
        const image = imgRepository.create(imageData);
        return image;
    });
    yield imgRepository.save(images);
    const car = carRepository.create(Object.assign(Object.assign(Object.assign({}, foundCar), carData), { images: images }));
    yield carRepository.save(car);
    const updatedCar = cars_schema_1.returnCarSchema.parse(car);
    return updatedCar;
});
exports.updateCarService = updateCarService;
