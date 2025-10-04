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
exports.updateImageService = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const image_schema_1 = require("../../schemas/image.schema");
const updateImageService = (imgData, id) => __awaiter(void 0, void 0, void 0, function* () {
    const imgRepository = data_source_1.AppDataSource.getRepository(entities_1.Image);
    const foundImage = yield imgRepository.findOneBy({
        id,
    });
    const image = imgRepository.create(Object.assign(Object.assign({}, foundImage), imgData));
    yield imgRepository.save(image);
    const updatedImg = image_schema_1.imageReturnSchema.parse(image);
    return updatedImg;
});
exports.updateImageService = updateImageService;
