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
const NeDBProduto_1 = require("../nedb/NeDBProduto");
const NeDBUsuario_1 = require("../nedb/NeDBUsuario");
const conversorMonetarioService_1 = require("../conversorMonetario/conversorMonetarioService");
let ProdutoService = class ProdutoService {
    constructor(neDBService, neDBUsuario, conversorMonetarioService) {
        this.neDBService = neDBService;
        this.neDBUsuario = neDBUsuario;
        this.conversorMonetarioService = conversorMonetarioService;
    }
    cadastrar(produto) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(yield this.conversorMonetarioService.converteMoedas('BRL', 'USD', produto.valorUnitario));
            produto.valorUnitarioDolar = yield this.conversorMonetarioService.converteMoedas('BRL', 'USD', produto.valorUnitario);
            return yield this.neDBService.create(produto);
        });
    }
    buscarTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            var produtos = yield this.neDBService.findAllDocuments();
            for (var i = 0; i < produtos[0].length; i++) {
                produtos[i].usuarioCadastro = yield this.neDBUsuario.getById(produtos[i].usuarioCadastro);
            }
            return produtos;
        });
    }
    buscarPeloId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var produto = yield this.neDBService.getById(id);
            produto[0].usuarioCadastro = yield this.neDBUsuario.getById(produto[0].usuarioCadastro);
            return produto;
        });
    }
    atualizaProduto(id, produto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.neDBService.updateProduto(id, produto);
        });
    }
    removeProduto(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.neDBService.deleteById(id);
        });
    }
};
ProdutoService = __decorate([
    common_1.Service(),
    __metadata("design:paramtypes", [NeDBProduto_1.NeDBProduto,
        NeDBUsuario_1.NeDBUsuario,
        conversorMonetarioService_1.ConversorMonetarioService])
], ProdutoService);
exports.ProdutoService = ProdutoService;
//# sourceMappingURL=ProdutoService.js.map