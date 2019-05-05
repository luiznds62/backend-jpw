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
const ProdutoService_1 = require("../../services/produto/ProdutoService");
const ProdutoDto_1 = require("../../dto/ProdutoDto");
const ReturnDTO_1 = require("../../common/ReturnDTO");
const ExceptionsMensagens_1 = require("../../common/ExceptionsMensagens");
const UsuarioService_1 = require("../../services/usuario/UsuarioService");
let ProdutoCtrl = class ProdutoCtrl {
    constructor(produtoService, usuarioService) {
        this.produtoService = produtoService;
        this.usuarioService = usuarioService;
    }
    cadastrarUsuario(produtoDto) {
        return __awaiter(this, void 0, void 0, function* () {
            var exception = yield produtoDto.valide();
            if (exception.erro) {
                return yield new ReturnDTO_1.ReturnDTO(exception.mensagem, false, null);
            }
            var produto = yield produtoDto.toDB();
            return yield this.produtoService.cadastrar(produto).then(function (produtoDB) {
                return new ReturnDTO_1.ReturnDTO('', true, produtoDB);
            }).catch(function () {
                new ReturnDTO_1.ReturnDTO(new ExceptionsMensagens_1.ExceptionMensagens().mensagemPadraoBanco, false, null);
            });
        });
    }
    buscarPeloId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.produtoService.buscarPeloId(id).then(function (produtoDB) {
                return new ReturnDTO_1.ReturnDTO('', true, produtoDB);
            }).catch(function () {
                new ReturnDTO_1.ReturnDTO(new ExceptionsMensagens_1.ExceptionMensagens().mensagemPadraoBanco, false, null);
            });
        });
    }
    buscarTodosProdutos() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.produtoService.buscarTodos().then(function (produtosDB) {
                return new ReturnDTO_1.ReturnDTO('', true, produtosDB);
            }).catch(function () {
                new ReturnDTO_1.ReturnDTO(new ExceptionsMensagens_1.ExceptionMensagens().mensagemPadraoBanco, false, null);
            });
        });
    }
    atualizarProduto(id, produtoDto) {
        return __awaiter(this, void 0, void 0, function* () {
            var exception = yield produtoDto.valide();
            if (exception.erro) {
                return yield new ReturnDTO_1.ReturnDTO(exception.mensagem, false, null);
            }
            var produto = yield produtoDto.toDB();
            return yield this.produtoService.atualizaProduto(id, produto).then(function (retorno) {
                if (retorno === '0 - Produto alterado com sucesso!') {
                    return new ReturnDTO_1.ReturnDTO('', false, retorno);
                }
                return new ReturnDTO_1.ReturnDTO('', true, retorno);
            }).catch(function () {
                new ReturnDTO_1.ReturnDTO(new ExceptionsMensagens_1.ExceptionMensagens().mensagemPadraoBanco, false, null);
            });
        });
    }
    deletarProduto(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.produtoService.removeProduto(id).then(function (retorno) {
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
    __metadata("design:paramtypes", [ProdutoDto_1.ProdutoDto]),
    __metadata("design:returntype", Promise)
], ProdutoCtrl.prototype, "cadastrarUsuario", null);
__decorate([
    common_1.Get("/:id"),
    __param(0, common_1.PathParams("id")), __param(0, common_1.Required()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProdutoCtrl.prototype, "buscarPeloId", null);
__decorate([
    common_1.Get("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProdutoCtrl.prototype, "buscarTodosProdutos", null);
__decorate([
    common_1.Put("/:id"),
    __param(0, common_1.PathParams("id")), __param(1, common_1.BodyParams()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ProdutoDto_1.ProdutoDto]),
    __metadata("design:returntype", Promise)
], ProdutoCtrl.prototype, "atualizarProduto", null);
__decorate([
    common_1.Delete("/:id"),
    __param(0, common_1.PathParams("id")), __param(0, common_1.Required()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProdutoCtrl.prototype, "deletarProduto", null);
ProdutoCtrl = __decorate([
    common_1.Controller("/produto"),
    __metadata("design:paramtypes", [ProdutoService_1.ProdutoService, UsuarioService_1.UsuarioService])
], ProdutoCtrl);
exports.ProdutoCtrl = ProdutoCtrl;
//# sourceMappingURL=ProdutoCtrl.js.map