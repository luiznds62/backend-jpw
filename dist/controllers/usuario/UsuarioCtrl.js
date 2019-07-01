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
const UsuarioService_1 = require("../../services/usuario/UsuarioService");
const UsuarioDto_1 = require("../../dto/UsuarioDto");
const ReturnDTO_1 = require("../../common/ReturnDTO");
const ExceptionsMensagens_1 = require("../../common/ExceptionsMensagens");
const ConversorCSVService_1 = require("../../services/conversorCSV/ConversorCSVService");
const Express = require("express");
var path = require('path');
var mime = require('mime');
var fs = require('fs');
let UsuarioCtrl = class UsuarioCtrl {
    constructor(usuarioService, csvService) {
        this.usuarioService = usuarioService;
        this.csvService = csvService;
    }
    cadastrarUsuario(usuarioDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            var exception = yield usuarioDTO.valide();
            if (exception.erro) {
                return yield new ReturnDTO_1.ReturnDTO(exception.mensagem, false, null);
            }
            var usuario = yield usuarioDTO.toDB();
            return yield this.usuarioService.cadastrar(usuario).then(function (usuarioDB) {
                return new ReturnDTO_1.ReturnDTO('', true, usuarioDB);
            }).catch(function () {
                new ReturnDTO_1.ReturnDTO(new ExceptionsMensagens_1.ExceptionMensagens().mensagemPadraoBanco, false, null);
            });
        });
    }
    buscarPeloId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usuarioService.buscarPeloId(id).then(function (usuarioDB) {
                return new ReturnDTO_1.ReturnDTO('', true, usuarioDB);
            }).catch(function () {
                new ReturnDTO_1.ReturnDTO(new ExceptionsMensagens_1.ExceptionMensagens().mensagemPadraoBanco, false, null);
            });
        });
    }
    relatorioUsuario(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var dadosUsuario = yield this.usuarioService.buscarTodos();
            var csv = yield this.csvService.geraCsvUsuario(dadosUsuario);
            var writerStream = fs.createWriteStream('usuarios.csv');
            writerStream.write(csv, 'UTF8');
            writerStream.end();
            var file = "usuarios.csv";
            var filename = path.basename(file);
            var mimetype = mime.lookup(file);
            res.setHeader('Content-disposition', 'attachment; filename=' + filename);
            res.setHeader('Content-type', mimetype);
            var filestream = fs.createReadStream(file);
            filestream.pipe(res);
        });
    }
    buscarTodosUsuarios() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usuarioService.buscarTodos().then(function (usuariosDB) {
                return new ReturnDTO_1.ReturnDTO('', true, usuariosDB);
            }).catch(function () {
                new ReturnDTO_1.ReturnDTO(new ExceptionsMensagens_1.ExceptionMensagens().mensagemPadraoBanco, false, null);
            });
        });
    }
    login(usuario, senha) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usuarioService.login(usuario, senha).then(function (retorno) {
                if (retorno) {
                    return new ReturnDTO_1.ReturnDTO('Login realizado com sucesso', true, retorno);
                }
                else {
                    return new ReturnDTO_1.ReturnDTO('Senha inválida', false, '');
                }
            }).catch(function () {
                new ReturnDTO_1.ReturnDTO(new ExceptionsMensagens_1.ExceptionMensagens().mensagemPadraoBanco, false, null);
            });
        });
    }
    atualizarUsuario(id, usuarioDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            var exception = yield usuarioDTO.valide();
            if (exception.erro) {
                return yield new ReturnDTO_1.ReturnDTO(exception.mensagem, false, null);
            }
            var usuario = yield usuarioDTO.toDB();
            return yield this.usuarioService.atualizaUsuario(id, usuario).then(function (retorno) {
                if (retorno === '0 - Usuário alterado com sucesso!') {
                    return new ReturnDTO_1.ReturnDTO('', false, retorno);
                }
                return new ReturnDTO_1.ReturnDTO('', true, retorno);
            }).catch(function () {
                new ReturnDTO_1.ReturnDTO(new ExceptionsMensagens_1.ExceptionMensagens().mensagemPadraoBanco, false, null);
            });
        });
    }
    deletarUsuario(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usuarioService.removeUsuario(id).then(function (retorno) {
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
    __metadata("design:paramtypes", [UsuarioDto_1.UsuarioDTO]),
    __metadata("design:returntype", Promise)
], UsuarioCtrl.prototype, "cadastrarUsuario", null);
__decorate([
    common_1.Get("/:id"),
    __param(0, common_1.PathParams("id")), __param(0, common_1.Required()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsuarioCtrl.prototype, "buscarPeloId", null);
__decorate([
    common_1.Get("/relatorio/usuario"),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __param(2, common_1.Next()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UsuarioCtrl.prototype, "relatorioUsuario", null);
__decorate([
    common_1.Get("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsuarioCtrl.prototype, "buscarTodosUsuarios", null);
__decorate([
    common_1.Get("/login/:usuario/:senha"),
    __param(0, common_1.PathParams("usuario")), __param(0, common_1.Required()),
    __param(1, common_1.PathParams("senha")), __param(1, common_1.Required()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsuarioCtrl.prototype, "login", null);
__decorate([
    common_1.Put("/:id"),
    __param(0, common_1.PathParams("id")), __param(1, common_1.BodyParams()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UsuarioDto_1.UsuarioDTO]),
    __metadata("design:returntype", Promise)
], UsuarioCtrl.prototype, "atualizarUsuario", null);
__decorate([
    common_1.Delete("/:id"),
    __param(0, common_1.PathParams("id")), __param(0, common_1.Required()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsuarioCtrl.prototype, "deletarUsuario", null);
UsuarioCtrl = __decorate([
    common_1.Controller("/usuario"),
    __metadata("design:paramtypes", [UsuarioService_1.UsuarioService, ConversorCSVService_1.ConversorCSVService])
], UsuarioCtrl);
exports.UsuarioCtrl = UsuarioCtrl;
//# sourceMappingURL=UsuarioCtrl.js.map