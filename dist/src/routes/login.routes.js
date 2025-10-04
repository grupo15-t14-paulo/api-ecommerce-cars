"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRoutes = void 0;
const express_1 = require("express");
const login_controller_1 = require("../controllers/login.controller");
const login_schema_1 = require("../schemas/login.schema");
const ensureDataIsValid_middleware_1 = require("../middleware/ensureDataIsValid.middleware");
exports.loginRoutes = (0, express_1.Router)();
exports.loginRoutes.post("", (0, ensureDataIsValid_middleware_1.ensureDataIsValid)(login_schema_1.createLoginSchema), login_controller_1.createLoginController);
