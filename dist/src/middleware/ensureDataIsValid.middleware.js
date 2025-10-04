"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureDataIsValid = void 0;
const ensureDataIsValid = (schema) => (request, response, next) => {
    const validatedData = schema.parse(request.body);
    request.body = validatedData;
    return next();
};
exports.ensureDataIsValid = ensureDataIsValid;
