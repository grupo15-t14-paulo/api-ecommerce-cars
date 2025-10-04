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
exports.createCommentsService = void 0;
const comments_entites_1 = require("../../entities/comments.entites");
const comments_schema_1 = require("../../schemas/comments.schema");
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const createCommentsService = (data, announcementId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const commentRepo = data_source_1.AppDataSource.getRepository(comments_entites_1.Comments);
    const announcementRepo = data_source_1.AppDataSource.getRepository(entities_1.Car);
    const userRepo = data_source_1.AppDataSource.getRepository(entities_1.User);
    const announcement = yield announcementRepo.findOneBy({
        id: announcementId,
    });
    const user = yield userRepo.findOneBy({
        id: userId,
    });
    const createComment = commentRepo.create(Object.assign(Object.assign({}, data), { car: announcement, user: user }));
    yield commentRepo.save(createComment);
    return comments_schema_1.returnCommentSchema.parse(createComment);
});
exports.createCommentsService = createCommentsService;
