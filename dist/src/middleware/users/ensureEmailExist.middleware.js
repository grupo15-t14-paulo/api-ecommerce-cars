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
exports.ensureEmailExistMiddleware = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const errors_1 = require("../../errors");
const ensureEmailExistMiddleware = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(entities_1.User);
    const userEmail = request.body.email;
    const userTel = request.body.tel;
    const userCpf = request.body.cpf;
    const emailExist = yield userRepository.findOneBy({
        email: userEmail,
    });
    const telExist = yield userRepository.findOneBy({
        tel: userTel,
    });
    const cpfExist = yield userRepository.findOneBy({
        cpf: userCpf,
    });
    if (emailExist) {
        throw new errors_1.AppError("Email already exists", 409);
    }
    if (telExist) {
        throw new errors_1.AppError("Telephone already exists", 409);
    }
    if (cpfExist) {
        throw new errors_1.AppError("Cpf already exists", 409);
    }
    return next();
});
exports.ensureEmailExistMiddleware = ensureEmailExistMiddleware;
