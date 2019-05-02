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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@tsed/common");
const EventsCtrl_1 = require("../events/EventsCtrl");
const ImcService_1 = require("../../services/imc/ImcService");
let ImcCtrl = class ImcCtrl {
    constructor(imcService) {
        this.imcService = imcService;
    }
    update(peso, altura) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.imcService.calcularImc(peso, altura);
        });
    }
};
__decorate([
    common_1.Post("/:peso/:altura"),
    __param(0, common_1.PathParams("peso")), __param(1, common_1.PathParams("altura")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ImcCtrl.prototype, "update", null);
ImcCtrl = __decorate([
    common_1.Controller("/imc", EventsCtrl_1.EventsCtrl),
    __metadata("design:paramtypes", [ImcService_1.ImcService])
], ImcCtrl);
exports.ImcCtrl = ImcCtrl;
//# sourceMappingURL=ImcCtrl.js.map