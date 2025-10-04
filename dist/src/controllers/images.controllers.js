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
exports.deleteImageController = exports.updateImageController = void 0;
const updateImage_service_1 = require("../services/images/updateImage.service");
const deleteImage_service_1 = require("../services/images/deleteImage.service");
const updateImageController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const imgData = req.body;
    const id = req.params.id;
    const image = yield (0, updateImage_service_1.updateImageService)(imgData, id);
    return res.json(image);
});
exports.updateImageController = updateImageController;
const deleteImageController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield (0, deleteImage_service_1.deleteImageService)(id);
    return res.status(200).send();
});
exports.deleteImageController = deleteImageController;
