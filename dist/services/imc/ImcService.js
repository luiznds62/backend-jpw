"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
let ImcService = class ImcService {
    calcularImc(peso, altura) {
        return __awaiter(this, void 0, void 0, function* () {
            var imc = peso / (altura * 2);
            if (imc < 17) {
                return `IMC: ${imc} - Muito abaixo do peso`;
            }
            if (imc > 17 && imc < 18.5) {
                return `IMC: ${imc} - Abaixo do peso`;
            }
            if (imc > 18.5 && imc < 25) {
                return `IMC: ${imc} - Peso normal`;
            }
            if (imc > 25 && imc < 30) {
                return `IMC: ${imc} - Acima do peso`;
            }
            if (imc > 30 && imc < 35) {
                return `IMC: ${imc} - Obesidade I`;
            }
            if (imc > 35 && imc < 40) {
                return `IMC: ${imc} - Obesidade II(Severa)`;
            }
            if (imc > 40) {
                return `IMC: ${imc} - Obesidade III(Mórbida)`;
            }
        });
    }
};
ImcService = __decorate([
    common_1.Service()
], ImcService);
exports.ImcService = ImcService;
//# sourceMappingURL=ImcService.js.map