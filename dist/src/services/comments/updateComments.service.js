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
exports.updateComentService = void 0;
const data_source_1 = require("../../data-source");
const comments_entites_1 = require("../../entities/comments.entites");
const comments_schema_1 = require("../../schemas/comments.schema");
const updateComentService = (data, comentId) => __awaiter(void 0, void 0, void 0, function* () {
    const commentRepo = data_source_1.AppDataSource.getRepository(comments_entites_1.Comments);
    const findComment = yield commentRepo.findOneBy({
        id: comentId,
    });
    const comment = commentRepo.create(Object.assign(Object.assign({}, findComment), data));
    yield commentRepo.save(comment);
    const updateComment = comments_schema_1.returnPatchComment.parse(comment);
    return updateComment;
});
exports.updateComentService = updateComentService;
