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
const UsuarioService_1 = require("../services/usuario/UsuarioService");
function validarEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
class UsuarioDTO {
    constructor() {
        this.usuarioService = new UsuarioService_1.UsuarioService;
    }
    fromDB(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            this.id = usuario.id;
            this.usuario = usuario.usuario;
            this.senha = usuario.senha;
            this.email = usuario.email;
        });
    }
    toDB() {
        return __awaiter(this, void 0, void 0, function* () {
            var usuarioDB = {
                id: this.id,
                usuario: this.usuario,
                senha: this.senha,
                email: this.email
            };
            usuarioDB.id = this.id;
            usuarioDB.usuario = this.usuario;
            usuarioDB.senha = this.senha;
            usuarioDB.email = this.email;
            return usuarioDB;
        });
    }
    valide() {
        return __awaiter(this, void 0, void 0, function* () {
            var usuarios = yield this.usuarioService.buscarTodos();
            for (var i = 0; i < usuarios.length; i++) {
                if (this.email === usuarios[i].email) {
                    return new Exception_1.Exception('Email já utilizado!', true);
                }
                if (this.usuario === usuarios[i].usuario) {
                    console.log(this.usuario);
                    console.log(usuarios[i].usuario);
                    return new Exception_1.Exception('Nome de usuário já utilizado!', true);
                }
            }
            if (this.usuario === "") {
                return new Exception_1.Exception('Usuário inválido!', true);
            }
            if (this.senha === "") {
                return new Exception_1.Exception('Senha inválido!', true);
            }
            if (this.email === "") {
                return new Exception_1.Exception('Email inválido!', true);
            }
            if (!validarEmail(this.email)) {
                return new Exception_1.Exception('Email inválido!', true);
            }
            if (this.senha.length < 8) {
                return new Exception_1.Exception('Senha deve possuir no minimo 8 caracteres!', true);
            }
            return new Exception_1.Exception('', false);
        });
    }
}
exports.UsuarioDTO = UsuarioDTO;
//# sourceMappingURL=UsuarioDto.js.map