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
exports.updateUserService = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const users_schema_1 = require("../../schemas/users.schema");
const errors_1 = require("../../errors");
const address_schema_1 = require("../../schemas/address.schema");
const updateUserService = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const validations = [
        "cep",
        "street",
        "number",
        "city",
        "state",
        "complement",
    ];
    const userRepository = data_source_1.AppDataSource.getRepository(entities_1.User);
    const addressRepository = data_source_1.AppDataSource.getRepository(entities_1.Address);
    const validatorData = Object.keys(userData).every((prop) => validations.includes(prop));
    const findUser = yield userRepository.findOne({
        where: {
            id: userId,
        },
        relations: {
            address: true,
        },
    });
    if (!findUser) {
        throw new errors_1.AppError("User not found!", 404);
    }
    if (validatorData) {
        const findAddress = yield addressRepository.findOneBy({
            id: findUser.address.id,
        });
        const newAddress = addressRepository.create(Object.assign(Object.assign({}, findAddress), userData));
        yield addressRepository.save(newAddress);
        const returAddress = address_schema_1.returnAddressSchema.parse(newAddress);
        return returAddress;
    }
    const oldUser = yield userRepository.find({
        where: {
            id: userId,
        },
        relations: {
            address: true,
        },
    });
    const user = userRepository.create(Object.assign(Object.assign({}, oldUser[0]), userData));
    const test = yield userRepository.save(user);
    const updateUser = users_schema_1.returnUserSchema.parse(test);
    return updateUser;
});
exports.updateUserService = updateUserService;
