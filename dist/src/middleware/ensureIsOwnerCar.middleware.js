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
exports.ensureIsOwnerCar = void 0;
const data_source_1 = require("../data-source");
const errors_1 = require("../errors");
const entities_1 = require("../entities");
const ensureIsOwnerCar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userAuth = res.locals.user;
    const id = req.params.id;
    const carRepo = data_source_1.AppDataSource.getRepository(entities_1.Car);
    const findCar = yield carRepo.findOne({
        where: { id: id },
        relations: {
            user: true,
        },
    });
    if (!findCar) {
        throw new errors_1.AppError("Annoucement not found!", 404);
    }
    console.log("to aqui");
    if (userAuth.id === findCar.user.id) {
        return next();
    }
    else {
        throw new errors_1.AppError("Insuficient permission", 404);
    }
});
exports.ensureIsOwnerCar = ensureIsOwnerCar;
