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
exports.deleteCommentsController = exports.updateCommentsController = exports.createCommentsController = void 0;
const createComments_service_1 = require("../services/comments/createComments.service");
const deleteComments_service_1 = require("../services/comments/deleteComments.service");
const updateComments_service_1 = require("../services/comments/updateComments.service");
const createCommentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comments = req.body;
    const id = req.params.id;
    const userId = res.locals.user.id;
    const newComment = yield (0, createComments_service_1.createCommentsService)(comments, id, userId);
    return res.status(201).json(newComment);
});
exports.createCommentsController = createCommentsController;
const updateCommentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comentData = req.body;
    const comentId = req.params.id;
    const comment = yield (0, updateComments_service_1.updateComentService)(comentData, comentId);
    return res.json(comment);
});
exports.updateCommentsController = updateCommentsController;
const deleteCommentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield (0, deleteComments_service_1.deleteCommentService)(id);
    return res.status(200).send();
});
exports.deleteCommentsController = deleteCommentsController;
