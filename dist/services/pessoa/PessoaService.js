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
const NeDBPessoa_1 = require("../nedb/NeDBPessoa");
let PessoaService = class PessoaService {
    constructor(neDBService) {
        this.neDBService = neDBService;
    }
    validarCNPJ(cnpj) {
        var tamanho, numeros, digitos, soma, pos, resultado, i;
        cnpj = cnpj.replace(/[^\d]+/g, '');
        if (cnpj == '')
            return false;
        if (cnpj.length != 14)
            return false;
        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" ||
            cnpj == "11111111111111" ||
            cnpj == "22222222222222" ||
            cnpj == "33333333333333" ||
            cnpj == "44444444444444" ||
            cnpj == "55555555555555" ||
            cnpj == "66666666666666" ||
            cnpj == "77777777777777" ||
            cnpj == "88888888888888" ||
            cnpj == "99999999999999")
            return false;
        // Valida DVs
        tamanho = cnpj.length - 2;
        numeros = cnpj.substring(0, tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;
        return true;
    }
    validaCpf(strCPF) {
        var Soma;
        var Resto;
        Soma = 0;
        var i;
        if (strCPF == "00000000000")
            return false;
        for (i = 1; i <= 9; i++)
            Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;
        if ((Resto == 10) || (Resto == 11))
            Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10)))
            return false;
        Soma = 0;
        for (i = 1; i <= 10; i++)
            Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
        if ((Resto == 10) || (Resto == 11))
            Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11)))
            return false;
        return true;
    }
    cadastrar(pessoa) {
        return __awaiter(this, void 0, void 0, function* () {
            var cnpjCpf = pessoa.documento.replace(/[^0-9]/g, '');
            var isValid;
            if (pessoa.tipo === 'PESSOA_FISICA') {
                isValid = this.validaCpf(cnpjCpf);
            }
            if (pessoa.tipo === 'PESSOA_JURIDICA') {
                isValid = this.validarCNPJ(cnpjCpf);
            }
            if (!isValid) {
                return `O CPF/CNPJ informado para a pessoa (${pessoa.nome}) é inválido.`;
            }
            return yield this.neDBService.create(pessoa);
        });
    }
    buscarTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.neDBService.findAllDocuments();
        });
    }
    buscarPeloId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.neDBService.getById(id);
        });
    }
    atualizaPessoa(id, pessoa) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.neDBService.updatePessoa(id, pessoa);
        });
    }
    removePessoa(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.neDBService.deleteById(id);
        });
    }
};
PessoaService = __decorate([
    common_1.Service(),
    __metadata("design:paramtypes", [NeDBPessoa_1.NeDBPessoa])
], PessoaService);
exports.PessoaService = PessoaService;
//# sourceMappingURL=PessoaService.js.map