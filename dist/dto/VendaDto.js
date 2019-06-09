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
class VendaDto {
    constructor(usuarioService, produtoService) {
        this.usuarioService = usuarioService;
        this.produtoService = produtoService;
    }
    converteValor(valor) {
        return __awaiter(this, void 0, void 0, function* () {
            var conversorMonetarioService;
            return yield conversorMonetarioService.converteMoedas('BRL', 'USD', valor);
        });
    }
    fromDB(Venda) {
        return __awaiter(this, void 0, void 0, function* () {
            this.id = Venda.id;
            this.produto = Venda.produto;
            this.usuarioCadastro = Venda.usuarioCadastro;
            this.quantidade = Venda.quantidade;
            this.valorTotal = Venda.valorTotal;
            this.valorTotalDolar = Venda.valorTotalDolar;
        });
    }
    toDB() {
        return __awaiter(this, void 0, void 0, function* () {
            var vendaDB = {
                id: this.id,
                produto: this.produto,
                usuarioCadastro: this.usuarioCadastro,
                quantidade: this.quantidade,
                valorTotal: this.valorTotal,
                valorTotalDolar: this.valorTotalDolar,
            };
            vendaDB.id = this.id;
            vendaDB.produto = this.produto;
            vendaDB.usuarioCadastro = this.usuarioCadastro;
            vendaDB.quantidade = this.quantidade;
            vendaDB.valorTotal = this.valorTotal;
            vendaDB.valorTotalDolar = this.valorTotalDolar;
            return vendaDB;
        });
    }
    valide() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.produto.length === 0) {
                return new Exception_1.Exception('O produto não foi informado!', true);
            }
            if (this.usuarioCadastro.length === 0) {
                return new Exception_1.Exception('O usuário não foi informado!', true);
            }
            if (this.quantidade === 0) {
                return new Exception_1.Exception('A quantidade não foi informado!', true);
            }
            return new Exception_1.Exception('', false);
        });
    }
}
exports.VendaDto = VendaDto;
//# sourceMappingURL=VendaDto.js.map