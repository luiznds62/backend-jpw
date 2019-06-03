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
const VendaService_1 = require("../../services/Venda/VendaService");
const VendaDto_1 = require("../../dto/VendaDto");
const ReturnDTO_1 = require("../../common/ReturnDTO");
const ExceptionsMensagens_1 = require("../../common/ExceptionsMensagens");
const UsuarioService_1 = require("../../services/usuario/UsuarioService");
const ConversorCSVService_1 = require("../../services/conversorCSV/ConversorCSVService");
const Express = require("express");
var path = require('path');
var mime = require('mime');
var fs = require('fs');
let VendaCtrl = class VendaCtrl {
    constructor(vendaService, usuarioService, csvService) {
        this.vendaService = vendaService;
        this.usuarioService = usuarioService;
        this.csvService = csvService;
    }
    cadastrarVenda(vendaDto) {
        return __awaiter(this, void 0, void 0, function* () {
            var exception = yield vendaDto.valide();
            if (exception.erro) {
                return yield new ReturnDTO_1.ReturnDTO(exception.mensagem, false, null);
            }
            var venda = yield vendaDto.toDB();
            return yield this.vendaService.cadastrar(venda).then(function (vendaDB) {
                return new ReturnDTO_1.ReturnDTO('', true, vendaDB);
            }).catch(function () {
                new ReturnDTO_1.ReturnDTO(new ExceptionsMensagens_1.ExceptionMensagens().mensagemPadraoBanco, false, null);
            });
        });
    }
    relatorioVenda(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var dadosVenda = yield this.vendaService.buscarTodos();
            var csv = yield this.csvService.geraCsvVenda(dadosVenda);
            var writerStream = fs.createWriteStream('vendas.csv');
            writerStream.write(csv, 'UTF8');
            writerStream.end();
            var file = "vendas.csv";
            var filename = path.basename(file);
            var mimetype = mime.lookup(file);
            res.setHeader('Content-disposition', 'attachment; filename=' + filename);
            res.setHeader('Content-type', mimetype);
            var filestream = fs.createReadStream(file);
            filestream.pipe(res);
        });
    }
    buscarPeloId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.vendaService.buscarPeloId(id).then(function (VendaDB) {
                return new ReturnDTO_1.ReturnDTO('', true, VendaDB);
            }).catch(function () {
                new ReturnDTO_1.ReturnDTO(new ExceptionsMensagens_1.ExceptionMensagens().mensagemPadraoBanco, false, null);
            });
        });
    }
    buscarTodosVenda() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.vendaService.buscarTodos().then(function (VendasDB) {
                return new ReturnDTO_1.ReturnDTO('', true, VendasDB);
            }).catch(function () {
                new ReturnDTO_1.ReturnDTO(new ExceptionsMensagens_1.ExceptionMensagens().mensagemPadraoBanco, false, null);
            });
        });
    }
    consolideVendaProduto(idProduto) {
        return __awaiter(this, void 0, void 0, function* () {
            var totalValorVendas = 0;
            var totalValorVendasDolar = 0;
            return yield this.vendaService.buscarVendaPorProduto(idProduto).then(function (vendasDB) {
                for (var i = 0; i < vendasDB.length; i++) {
                    totalValorVendas += vendasDB[i].valorTotal;
                    totalValorVendasDolar += vendasDB[i].valorTotalDolar;
                }
                return new ReturnDTO_1.ReturnDTO(`Total vendido R$: ${totalValorVendas}, Total vendido USD: ${totalValorVendasDolar}`, true, vendasDB);
            }).catch(function () {
                new ReturnDTO_1.ReturnDTO(new ExceptionsMensagens_1.ExceptionMensagens().mensagemPadraoBanco, false, null);
            });
        });
    }
    atualizarVenda(id, vendaDto) {
        return __awaiter(this, void 0, void 0, function* () {
            var exception = yield vendaDto.valide();
            if (exception.erro) {
                return yield new ReturnDTO_1.ReturnDTO(exception.mensagem, false, null);
            }
            var venda = yield vendaDto.toDB();
            return yield this.vendaService.atualizaVenda(id, venda).then(function (retorno) {
                if (retorno === '0 - Venda alterado com sucesso!') {
                    return new ReturnDTO_1.ReturnDTO('', false, retorno);
                }
                return new ReturnDTO_1.ReturnDTO('', true, retorno);
            }).catch(function () {
                new ReturnDTO_1.ReturnDTO(new ExceptionsMensagens_1.ExceptionMensagens().mensagemPadraoBanco, false, null);
            });
        });
    }
    deletarVenda(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.vendaService.removeVenda(id).then(function (retorno) {
                return new ReturnDTO_1.ReturnDTO('', true, retorno);
            }).catch(function () {
                new ReturnDTO_1.ReturnDTO(new ExceptionsMensagens_1.ExceptionMensagens().mensagemPadraoBanco, false, null);
            });
        });
    }
};
__decorate([
    common_1.Post("/"),
    __param(0, common_1.BodyParams()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [VendaDto_1.VendaDto]),
    __metadata("design:returntype", Promise)
], VendaCtrl.prototype, "cadastrarVenda", null);
__decorate([
    common_1.Get("/relatorio/venda"),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __param(2, common_1.Next()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], VendaCtrl.prototype, "relatorioVenda", null);
__decorate([
    common_1.Get("/:id"),
    __param(0, common_1.PathParams("id")), __param(0, common_1.Required()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VendaCtrl.prototype, "buscarPeloId", null);
__decorate([
    common_1.Get("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VendaCtrl.prototype, "buscarTodosVenda", null);
__decorate([
    common_1.Get("/consolide/:idProduto"),
    __param(0, common_1.PathParams("idProduto")), __param(0, common_1.Required()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VendaCtrl.prototype, "consolideVendaProduto", null);
__decorate([
    common_1.Put("/:id"),
    __param(0, common_1.PathParams("id")), __param(1, common_1.BodyParams()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, VendaDto_1.VendaDto]),
    __metadata("design:returntype", Promise)
], VendaCtrl.prototype, "atualizarVenda", null);
__decorate([
    common_1.Delete("/:id"),
    __param(0, common_1.PathParams("id")), __param(0, common_1.Required()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VendaCtrl.prototype, "deletarVenda", null);
VendaCtrl = __decorate([
    common_1.Controller("/venda"),
    __metadata("design:paramtypes", [VendaService_1.VendaService, UsuarioService_1.UsuarioService, ConversorCSVService_1.ConversorCSVService])
], VendaCtrl);
exports.VendaCtrl = VendaCtrl;
//# sourceMappingURL=VendaCtrl.js.map