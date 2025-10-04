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
exports.deleteCarController = exports.updateCarController = exports.listOneCarByIdController = exports.listCarsByUserIdController = exports.listAllCarsController = exports.createCarController = void 0;
const createCar_service_1 = require("../services/cars/createCar.service");
const listAllCars_service_1 = require("../services/cars/listAllCars.service");
const updateCar_service_1 = require("../services/cars/updateCar.service");
const deleteCar_service_1 = require("../services/cars/deleteCar.service");
const listCarsById_service_1 = require("../services/cars/listCarsById.service");
const listOneCar_service_1 = require("../services/cars/listOneCar.service");
const createCarController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carData = req.body;
        const userId = res.locals.user.id;
        const newCar = yield (0, createCar_service_1.createCarService)(carData, userId);
        res.status(201).json(newCar);
    }
    catch (error) {
        console.error("Error creating car:", error);
        res.status(500).json({ error: "Failed to create car" });
    }
});
exports.createCarController = createCarController;
const listAllCarsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 12;
    const { brand, model, color, year, minPrice, maxPrice, minMileage, maxMileage, fuel } = req.query;
    const filters = {
        brand: brand && brand.toString(),
        color: color && color.toString(),
        year: year && year.toString(),
        model: model && model.toString(),
        fuel: fuel && fuel.toString(),
        minPrice: minPrice && parseInt(minPrice),
        maxPrice: maxPrice && parseInt(maxPrice),
        minMileage: minMileage && parseInt(minMileage),
        maxMileage: maxMileage && parseInt(maxMileage),
    };
    try {
        const cars = yield (0, listAllCars_service_1.listAllCarsService)(page, pageSize, filters);
        res.json(cars);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.listAllCarsController = listAllCarsController;
const listCarsByUserIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const cars = yield (0, listCarsById_service_1.listCarsByUserIdService)(userId);
        res.json(cars);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.listCarsByUserIdController = listCarsByUserIdController;
const listOneCarByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carId = req.params.carId;
    try {
        const cars = yield (0, listOneCar_service_1.listOneCarById)(carId);
        res.json(cars);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.listOneCarByIdController = listOneCarByIdController;
const updateCarController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carData = req.body;
    const id = req.params.id;
    const car = yield (0, updateCar_service_1.updateCarService)(carData, id);
    return res.json(car);
});
exports.updateCarController = updateCarController;
const deleteCarController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield (0, deleteCar_service_1.deleteCarService)(id);
    return res.status(200).send();
});
exports.deleteCarController = deleteCarController;
