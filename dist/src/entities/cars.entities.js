"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = exports.fuel = void 0;
const typeorm_1 = require("typeorm");
const image_entities_1 = require("./image.entities");
const users_entities_1 = require("./users.entities");
const comments_entites_1 = require("./comments.entites");
var fuel;
(function (fuel) {
    fuel["DIESEL"] = "Diesel";
    fuel["ETANOL"] = "Etanol";
    fuel["GASOLINA"] = "Gasolina";
    fuel["FLEX"] = "Flex";
    fuel["ELETRICO"] = "El\u00E9trico";
    fuel["H\u00CDBRIDO"] = "H\u00EDbrido";
    fuel["DEFAULT"] = "N\u00E3o informado";
})(fuel || (exports.fuel = fuel = {}));
let Car = class Car {
};
exports.Car = Car;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Car.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], Car.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], Car.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], Car.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: fuel, default: fuel.DEFAULT }),
    __metadata("design:type", String)
], Car.prototype, "typeCar", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], Car.prototype, "mileage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], Car.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float" }),
    __metadata("design:type", Number)
], Car.prototype, "fipePrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float" }),
    __metadata("design:type", Number)
], Car.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], Car.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 250 }),
    __metadata("design:type", String)
], Car.prototype, "imageCover", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "date" }),
    __metadata("design:type", Object)
], Car.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Object)
], Car.prototype, "isAvailable", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comments_entites_1.Comments, (comment) => comment.car, { cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Car.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => image_entities_1.Image, (image) => image.car, { cascade: true }),
    __metadata("design:type", Array)
], Car.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entities_1.User, (user) => user.announcement),
    __metadata("design:type", users_entities_1.User)
], Car.prototype, "user", void 0);
exports.Car = Car = __decorate([
    (0, typeorm_1.Entity)("cars")
], Car);
