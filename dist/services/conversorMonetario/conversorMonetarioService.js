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
var axios = require('axios');
var valorConvertido = 0;
let ConversorMonetarioService = class ConversorMonetarioService {
    converteMoedas(moedaOrigem, moedaDestino, valorConversao) {
        return __awaiter(this, void 0, void 0, function* () {
            var parametros = (`${moedaOrigem}_${moedaDestino}`).toUpperCase();
            var url = `https://free.currconv.com/api/v7/convert?q=${parametros}&compact=ultra&apiKey=5710634e81a8da6e9923`;
            axios.get(url).then(function (response) {
                for (const key in response.data) {
                    if (response.data.hasOwnProperty(key)) {
                        var valorMoeda = response.data[key];
                    }
                }
                setValorConvertido(valorConversao * valorMoeda);
            });
            return valorConvertido;
        });
    }
};
ConversorMonetarioService = __decorate([
    common_1.Service()
], ConversorMonetarioService);
exports.ConversorMonetarioService = ConversorMonetarioService;
function setValorConvertido(valor) {
    valorConvertido = valor;
}
//# sourceMappingURL=conversorMonetarioService.js.map