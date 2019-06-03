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
const NeDBUsuario_1 = require("../nedb/NeDBUsuario");
let UsuarioService = class UsuarioService {
    constructor() {
        this.neDBService = new NeDBUsuario_1.NeDBUsuario;
    }
    login(usuario, senha) {
        return __awaiter(this, void 0, void 0, function* () {
            var usuarioLogin = yield this.neDBService.getUsuarioByUsuario(usuario);
            if (usuarioLogin) {
                if (usuarioLogin[0].senha === senha) {
                    return `Login realizado com sucesso`;
                }
                else {
                    return `Senha inválida`;
                }
            }
            else {
                return `Usuário não encontrado`;
            }
        });
    }
    cadastrar(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.neDBService.create(usuario);
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
    atualizaUsuario(id, usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.neDBService.updateUsuario(id, usuario);
        });
    }
    removeUsuario(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.neDBService.deleteById(id);
        });
    }
};
UsuarioService = __decorate([
    common_1.Service(),
    __metadata("design:paramtypes", [])
], UsuarioService);
exports.UsuarioService = UsuarioService;
//# sourceMappingURL=UsuarioService.js.map