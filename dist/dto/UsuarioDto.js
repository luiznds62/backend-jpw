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
class UsuarioDTO {
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
            if (this.senha.length < 8) {
                return new Exception_1.Exception('Senha deve possuir no minimo 8 caracteres!', true);
            }
            return new Exception_1.Exception('', false);
        });
    }
}
exports.UsuarioDTO = UsuarioDTO;
//# sourceMappingURL=UsuarioDto.js.map