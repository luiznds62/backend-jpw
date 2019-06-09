import { Usuario } from "../interfaces/Usuario";
import { Exception } from "../common/Exception";
import { UsuarioService } from "../services/usuario/UsuarioService";
import { NeDBUsuario } from "../services/nedb/NeDBUsuario";

function validarEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export class UsuarioDTO {
    id: string;
    usuario: string;
    senha: string;
    email: string;

    usuarioService = new UsuarioService;

    async fromDB(usuario: Usuario) {
        this.id = usuario.id;
        this.usuario = usuario.usuario;
        this.senha = usuario.senha;
        this.email = usuario.email;
    }

    async toDB(): Promise<Usuario> {
        var usuarioDB: Usuario = {
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
    }

    async valide(): Promise<Exception> {
        var usuarios = await this.usuarioService.buscarTodos()
        for(var i = 0; i < usuarios[0].length; i++){
            if (this.email === usuarios[i].email) {
                return new Exception('Email já utilizado!', true)
            }
            if (this.usuario === usuarios[i].usuario) {
                console.log(this.usuario);
                console.log(usuarios[i].usuario);
                return new Exception('Nome de usuário já utilizado!', true)
            }
        }

        if(this.usuario === ""){
            return new Exception('Usuário inválido!', true)
        }

        if(this.senha === ""){
            return new Exception('Senha inválido!', true)
        }

        if(this.email === ""){
            return new Exception('Email inválido!', true)
        }

        if (!validarEmail(this.email)) {
            return new Exception('Email inválido!', true)
        }

        if (this.senha.length < 8) {
            return new Exception('Senha deve possuir no minimo 8 caracteres!', true)
        }

        return new Exception('', false);
    }
}