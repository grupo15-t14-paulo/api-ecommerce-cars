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
exports.createUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const users_schema_1 = require("../../schemas/users.schema");
const createUserService = (address, data) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(entities_1.User);
    const addressRepository = data_source_1.AppDataSource.getRepository(entities_1.Address);
    const validatedUserSchema = users_schema_1.userWithoutAddressSchema.parse(data);
    validatedUserSchema.password = (0, bcryptjs_1.hashSync)(validatedUserSchema.password, 10);
    data = validatedUserSchema;
    const newAddress = addressRepository.create(address);
    yield addressRepository.save(newAddress);
    const user = userRepository.create(Object.assign(Object.assign({}, data), { address: newAddress }));
    yield userRepository.save(user);
    return users_schema_1.returnUserSchema.parse(user);
});
exports.createUserService = createUserService;
