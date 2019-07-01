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
const NeDBVenda_1 = require("../nedb/NeDBVenda");
const NeDBUsuario_1 = require("../nedb/NeDBUsuario");
const conversorMonetarioService_1 = require("../conversorMonetario/conversorMonetarioService");
const NeDBProduto_1 = require("../nedb/NeDBProduto");
let VendaService = class VendaService {
    constructor(neDBService, neDBProduto, neDBUsuario, conversorMonetarioService) {
        this.neDBService = neDBService;
        this.neDBProduto = neDBProduto;
        this.neDBUsuario = neDBUsuario;
        this.conversorMonetarioService = conversorMonetarioService;
    }
    cadastrar(venda) {
        return __awaiter(this, void 0, void 0, function* () {
            var produto = yield this.neDBProduto.getById(venda.produto);
            venda.valorTotal = (produto[0].valorUnitario) * venda.quantidade;
            venda.valorTotalDolar = yield this.conversorMonetarioService.converteMoedas('BRL', 'USD', venda.valorTotal);
            return yield this.neDBService.create(venda);
        });
    }
    buscarTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            var Vendas = yield this.neDBService.findAllDocuments();
            for (var i = 0; i < Vendas[0].length; i++) {
                Vendas[i].usuarioCadastro = yield this.neDBUsuario.getById(Vendas[i].usuarioCadastro);
                Vendas[i].produto = yield this.neDBProduto.getById(Vendas[i].produto);
            }
            return Vendas;
        });
    }
    buscarPeloId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var Venda = yield this.neDBService.getById(id);
            Venda[0].usuarioCadastro = yield this.neDBUsuario.getById(Venda[0].usuarioCadastro);
            Venda[0].produto = yield this.neDBProduto.getById(Venda[0].produto);
            return Venda;
        });
    }
    buscarVendaPorProduto(idProduto) {
        return __awaiter(this, void 0, void 0, function* () {
            var vendas = yield this.neDBService.getByProduto(idProduto);
            for (var i = 0; i < vendas[0].length; i++) {
                vendas[i].usuarioCadastro = yield this.neDBUsuario.getById(vendas[i].usuarioCadastro);
                vendas[i].produto = yield this.neDBProduto.getById(vendas[i].produto);
            }
            return vendas;
        });
    }
    atualizaVenda(id, venda) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.neDBService.updateVenda(id, venda);
        });
    }
    removeVenda(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.neDBService.deleteById(id);
        });
    }
};
VendaService = __decorate([
    common_1.Service(),
    __metadata("design:paramtypes", [NeDBVenda_1.NeDBVenda,
        NeDBProduto_1.NeDBProduto,
        NeDBUsuario_1.NeDBUsuario,
        conversorMonetarioService_1.ConversorMonetarioService])
], VendaService);
exports.VendaService = VendaService;
//# sourceMappingURL=VendaService.js.map