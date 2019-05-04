import { Usuario } from "../interfaces/Usuario";
import { Exception } from "../common/Exception";

export class UsuarioDTO{

    id: string;
    usuario: string;
    senha: string;
    email: string;

    async fromDB(usuario:Usuario){        
        this.id = usuario.id;
        this.usuario = usuario.usuario;
        this.senha = usuario.senha;
        this.email = usuario.email;
    }

    async toDB():Promise<Usuario>{
        var usuarioDB:Usuario = {
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

    async valide():Promise<Exception>{
        if(this.senha.length < 8){
            return new Exception('Senha deve possuir no minimo 8 caracteres!', true)
        }
        return new Exception('', false);
    }
}