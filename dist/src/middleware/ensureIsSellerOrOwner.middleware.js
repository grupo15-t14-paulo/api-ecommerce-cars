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
exports.ensureIsOwnerOrSeller = void 0;
const data_source_1 = require("../data-source");
const comments_entites_1 = require("../entities/comments.entites");
const errors_1 = require("../errors");
const ensureIsOwnerOrSeller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userAuth = res.locals.user;
    const id = req.params.id;
    const commentsRepo = data_source_1.AppDataSource.getRepository(comments_entites_1.Comments);
    const findComment = yield commentsRepo.findOne({
        where: { id: id },
        relations: {
            car: { user: true },
            user: true,
        },
    });
    if (!findComment) {
        throw new errors_1.AppError("Comment not found!", 404);
    }
    if (userAuth.id === findComment.user.id ||
        findComment.car.user.id === userAuth.id) {
        return next();
    }
    else {
        throw new errors_1.AppError("Insuficient permission", 404);
    }
});
exports.ensureIsOwnerOrSeller = ensureIsOwnerOrSeller;
