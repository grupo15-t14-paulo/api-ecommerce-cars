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
exports.deleteCarService = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const deleteImage_service_1 = require("../images/deleteImage.service");
const deleteComments_service_1 = require("../comments/deleteComments.service");
const deleteCarService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const carRepository = data_source_1.AppDataSource.getRepository(entities_1.Car);
    const foundCar = yield carRepository.findOne({
        where: {
            id,
        },
        relations: {
            images: true,
            comments: true,
        },
    });
    if ((foundCar === null || foundCar === void 0 ? void 0 : foundCar.comments.length) > 0) {
        for (const comment of foundCar === null || foundCar === void 0 ? void 0 : foundCar.comments) {
            yield (0, deleteComments_service_1.deleteCommentService)(comment.id);
        }
    }
    if ((foundCar === null || foundCar === void 0 ? void 0 : foundCar.images.length) > 0) {
        for (const img of foundCar === null || foundCar === void 0 ? void 0 : foundCar.images) {
            yield (0, deleteImage_service_1.deleteImageService)(img.id);
        }
    }
    yield carRepository.remove(foundCar);
});
exports.deleteCarService = deleteCarService;
