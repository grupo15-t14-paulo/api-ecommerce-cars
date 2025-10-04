"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carUpdateSchema = exports.returnAllCarsSchema = exports.returnAllCarInfoSchema = exports.returnCarAndUserSchema = exports.returnCarSchema = exports.returnWithComments = exports.returnSchemaWithoutPassword = exports.returnSchemaWithoutPasswordAll = exports.carCreateSchema = void 0;
const zod_1 = require("zod");
const image_schema_1 = require("./image.schema");
const cars_entities_1 = require("../entities/cars.entities");
const users_schema_1 = require("./users.schema");
exports.carCreateSchema = zod_1.z.object({
    brand: zod_1.z.string().min(1).max(100),
    model: zod_1.z.string().min(1).max(100),
    year: zod_1.z.string(),
    typeCar: zod_1.z.nativeEnum(cars_entities_1.fuel),
    mileage: zod_1.z.number().positive(),
    color: zod_1.z.string().min(1).max(100),
    fipePrice: zod_1.z.number().positive(),
    price: zod_1.z.number().positive(),
    description: zod_1.z.string().optional().nullable(),
    imageCover: zod_1.z.string().min(1).max(250),
    isAvailable: zod_1.z.boolean().optional().nullable(),
    images: image_schema_1.imageCreateSchema.array(),
});
const userSchemaGetOne = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
});
exports.returnSchemaWithoutPasswordAll = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    brand: zod_1.z.string().min(1).max(100),
    model: zod_1.z.string().min(1).max(100),
    year: zod_1.z.string(),
    typeCar: zod_1.z.nativeEnum(cars_entities_1.fuel),
    mileage: zod_1.z.number().positive(),
    color: zod_1.z.string().min(1).max(100),
    fipePrice: zod_1.z.number().positive(),
    price: zod_1.z.number().positive(),
    description: zod_1.z.string().optional().nullable(),
    imageCover: zod_1.z.string().min(1).max(250),
    isAvailable: zod_1.z.boolean().optional().nullable(),
    images: image_schema_1.imageCreateSchema.array(),
    user: zod_1.z.object({
        id: zod_1.z.string().uuid(),
        name: zod_1.z.string().min(3).max(255),
        email: zod_1.z.string().email({ message: "Invalid email address" }),
        cpf: zod_1.z.string().min(11),
        tel: zod_1.z.string().min(10, { message: "for example number 62994567899" }),
        dateBirth: zod_1.z.string(),
        description: zod_1.z.string().nullable(),
        isSeller: zod_1.z.boolean().default(false),
    }),
    comments: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string().uuid(),
        comment: zod_1.z.string(),
        createdAt: zod_1.z.date(),
        user: userSchemaGetOne,
    })),
});
exports.returnSchemaWithoutPassword = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string().min(3).max(255),
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    cpf: zod_1.z.string().min(11),
    tel: zod_1.z.string().min(10, { message: "for example number 62994567899" }),
    dateBirth: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    isSeller: zod_1.z.boolean().default(false),
    address: zod_1.z.object({
        street: zod_1.z.string().min(1).max(255),
        city: zod_1.z.string().min(1).max(255),
        cep: zod_1.z.string().min(8),
        number: zod_1.z.string().min(1).max(11),
        state: zod_1.z.string().max(150),
        complement: zod_1.z.string().nullable(),
    }),
    announcement: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string().uuid(),
        brand: zod_1.z.string().min(1).max(100),
        model: zod_1.z.string().min(1).max(100),
        year: zod_1.z.string(),
        typeCar: zod_1.z.nativeEnum(cars_entities_1.fuel),
        mileage: zod_1.z.number().positive(),
        color: zod_1.z.string().min(1).max(100),
        fipePrice: zod_1.z.number().positive(),
        price: zod_1.z.number().positive(),
        description: zod_1.z.string().optional().nullable(),
        imageCover: zod_1.z.string().min(1).max(250),
        isAvailable: zod_1.z.boolean().optional().nullable(),
        images: image_schema_1.imageCreateSchema.array(),
        comments: zod_1.z.array(zod_1.z.object({
            id: zod_1.z.string().uuid(),
            comment: zod_1.z.string(),
            user: zod_1.z.object({
                id: zod_1.z.string().uuid(),
            }),
        })),
    })),
});
exports.returnWithComments = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    comment: zod_1.z.string(),
    user: users_schema_1.returnUserSchemaWithOutAdress,
});
exports.returnCarSchema = exports.carCreateSchema.extend({
    id: zod_1.z.string().uuid(),
    createdAt: zod_1.z.string(),
    images: zod_1.z.array(image_schema_1.imageReturnSchema),
});
exports.returnCarAndUserSchema = exports.returnCarSchema.extend({
    user: users_schema_1.returnUserSchemaWithOutAdress,
    comments: zod_1.z
        .array(zod_1.z.object({
        id: zod_1.z.string().uuid(),
        comment: zod_1.z.string(),
        user: zod_1.z.object({
            id: zod_1.z.string().uuid(),
        }),
    }))
        .optional(),
});
exports.returnAllCarInfoSchema = exports.returnCarAndUserSchema.array();
exports.returnAllCarsSchema = exports.returnCarSchema.array();
exports.carUpdateSchema = exports.carCreateSchema.partial();
