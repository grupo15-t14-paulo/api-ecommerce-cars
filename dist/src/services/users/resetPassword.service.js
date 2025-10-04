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
exports.resetPasswordService = void 0;
const crypto_1 = require("crypto");
const entities_1 = require("../../entities");
const data_source_1 = require("../../data-source");
const errors_1 = require("../../errors");
const sendEmail_utils_1 = require("../../utils/sendEmail.utils");
const bcryptjs_1 = require("bcryptjs");
class ResetPasswordService {
    sendEmailResetPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.AppDataSource.getRepository(entities_1.User);
            const user = yield userRepository.findOne({
                where: {
                    email: email,
                },
            });
            if (!user) {
                throw new errors_1.AppError("User not found", 404);
            }
            const resetToken = (0, crypto_1.randomUUID)();
            user.reset_token = resetToken;
            yield userRepository.save(user);
            const resetPasswordTemplate = sendEmail_utils_1.emailService.resetPasswordTemplate(user.name, email, resetToken);
            yield sendEmail_utils_1.emailService.sendEmail(resetPasswordTemplate);
        });
    }
    resetUserPassword(password, resetToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.AppDataSource.getRepository(entities_1.User);
            const user = yield userRepository.findOne({
                where: {
                    reset_token: resetToken,
                },
            });
            if (!user) {
                throw new errors_1.AppError("User not found", 404);
            }
            const newPasswordHashed = (0, bcryptjs_1.hashSync)(password, 10);
            user.password = newPasswordHashed;
            user.reset_token = null;
            yield userRepository.save(user);
        });
    }
}
const resetPasswordService = new ResetPasswordService();
exports.resetPasswordService = resetPasswordService;
