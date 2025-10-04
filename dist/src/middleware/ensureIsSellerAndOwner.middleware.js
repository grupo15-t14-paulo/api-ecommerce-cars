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
exports.ensureIsOwner = void 0;
const data_source_1 = require("../data-source");
const entities_1 = require("../entities");
const errors_1 = require("../errors");
const comments_entites_1 = require("../entities/comments.entites");
const ensureIsOwner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userAuth = res.locals.user;
    const id = req.params.id;
    const userRepository = data_source_1.AppDataSource.getRepository(entities_1.User);
    const user = yield userRepository.findOneBy({ id: userAuth.id });
    const commentsRepo = data_source_1.AppDataSource.getRepository(comments_entites_1.Comments);
    const findComment = yield commentsRepo.findOne({
        where: { id: id },
        relations: {
            user: true,
        },
    });
    if (!findComment) {
        throw new errors_1.AppError("Comment not found!", 404);
    }
    if (user.id === findComment.user.id) {
        return next();
    }
    else {
        throw new errors_1.AppError("Not have Autorizarization", 403);
    }
});
exports.ensureIsOwner = ensureIsOwner;
