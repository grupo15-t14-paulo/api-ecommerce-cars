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
exports.reatriveUserService = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const cars_schema_1 = require("../../schemas/cars.schema");
const reatriveUserService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(entities_1.User);
    const users = yield userRepository.findOne({
        where: {
            id: userId,
        },
        relations: {
            address: true,
            announcement: {
                images: true,
                comments: {
                    user: true,
                },
            },
        },
    });
    const returnUser = cars_schema_1.returnSchemaWithoutPassword.parse(users);
    return returnUser;
});
exports.reatriveUserService = reatriveUserService;
