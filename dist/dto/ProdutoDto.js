"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Exception_1 = require("../common/Exception");
class ProdutoDto {
    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }
    converteValor(valor) {
        return __awaiter(this, void 0, void 0, function* () {
            var conversorMonetarioService;
            return yield conversorMonetarioService.converteMoedas('BRL', 'USD', valor);
        });
    }
    fromDB(produto) {
        return __awaiter(this, void 0, void 0, function* () {
            this.id = produto.id;
            this.nome = produto.nome;
            this.descricao = produto.descricao;
            this.marca = produto.marca;
            this.valorUnitario = produto.valorUnitario;
            this.valorUnitarioDolar = produto.valorUnitarioDolar;
            this.origem = produto.origem;
            this.usuarioCadastro = yield this.usuarioService.buscarPeloId(produto.usuarioCadastro);
        });
    }
    toDB() {
        return __awaiter(this, void 0, void 0, function* () {
            var produtoDB = {
                id: this.id,
                nome: this.nome,
                descricao: this.descricao,
                marca: this.marca,
                valorUnitario: this.valorUnitario,
                valorUnitarioDolar: this.valorUnitarioDolar,
                origem: this.origem,
                usuarioCadastro: this.usuarioCadastro,
            };
            produtoDB.id = this.id;
            produtoDB.nome = this.nome;
            produtoDB.descricao = this.descricao;
            produtoDB.marca = this.marca;
            produtoDB.valorUnitario = this.valorUnitario;
            produtoDB.valorUnitarioDolar = this.valorUnitarioDolar;
            produtoDB.origem = this.origem;
            produtoDB.usuarioCadastro = this.usuarioCadastro;
            return produtoDB;
        });
    }
    valide() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.nome.length < 2) {
                return new Exception_1.Exception('O nome do produto precisa conter no mínimo 2 caracteres', true);
            }
            return new Exception_1.Exception('', false);
        });
    }
}
exports.ProdutoDto = ProdutoDto;
//# sourceMappingURL=ProdutoDto.js.map