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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserController = exports.resetPassword = exports.sendResetPassword = exports.listUserController = exports.reatriveUserController = exports.createUserController = void 0;
const createUser_service_1 = require("../services/users/createUser.service");
const reatriveUser_service_1 = require("../services/users/reatriveUser.service");
const deleteUser_service_1 = require("../services/users/deleteUser.service");
const updateUser_service_1 = require("../services/users/updateUser.service");
const resetPassword_service_1 = require("../services/users/resetPassword.service");
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { address } = _a, body = __rest(_a, ["address"]);
    const newUser = yield (0, createUser_service_1.createUserService)(address, body);
    return res.status(201).json(newUser);
});
exports.createUserController = createUserController;
const reatriveUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.user.id;
    const user = yield (0, reatriveUser_service_1.reatriveUserService)(userId);
    return res.status(200).json(user);
});
exports.reatriveUserController = reatriveUserController;
const listUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const user = yield (0, reatriveUser_service_1.reatriveUserService)(userId);
    return res.status(200).json(user);
});
exports.listUserController = listUserController;
const sendResetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    yield resetPassword_service_1.resetPasswordService.sendEmailResetPassword(email);
    return res.json({ message: "Token send" });
});
exports.sendResetPassword = sendResetPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    const { token } = req.params;
    yield resetPassword_service_1.resetPasswordService.resetUserPassword(password, token);
    return res.json({ message: "password change with sucess!" });
});
exports.resetPassword = resetPassword;
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.user.id;
    const body = req.body;
    const user = yield (0, updateUser_service_1.updateUserService)(userId, body);
    return res.status(200).json(user);
});
exports.updateUserController = updateUserController;
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.user.id;
    yield (0, deleteUser_service_1.deleteUserService)(userId);
    return res.status(204).send();
});
exports.deleteUserController = deleteUserController;
