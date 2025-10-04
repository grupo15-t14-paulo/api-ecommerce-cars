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
exports.deleteUserService = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const deleteCar_service_1 = require("../cars/deleteCar.service");
const deleteComments_service_1 = require("../comments/deleteComments.service");
const deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userRepository = data_source_1.AppDataSource.getRepository(entities_1.User);
    const user = yield userRepository.findOne({
        where: {
            id: id,
        },
        relations: {
            announcement: true,
            comments: true,
        },
    });
    if (((_a = user === null || user === void 0 ? void 0 : user.announcement) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        for (const car of user === null || user === void 0 ? void 0 : user.announcement) {
            yield (0, deleteCar_service_1.deleteCarService)(car.id);
        }
    }
    if (user === null || user === void 0 ? void 0 : user.comments) {
        for (const comment of user === null || user === void 0 ? void 0 : user.comments) {
            yield (0, deleteComments_service_1.deleteCommentService)(comment.id);
        }
    }
    yield userRepository.remove(user);
});
exports.deleteUserService = deleteUserService;
