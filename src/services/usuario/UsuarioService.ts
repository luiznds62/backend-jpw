import { Service } from "@tsed/common";
import { NeDBUsuario } from "../nedb/NeDBUsuario";
import { Usuario } from "../../interfaces/Usuario";

@Service()
export class UsuarioService {
    neDBService = new NeDBUsuario;

    constructor() {

    }

    async login(usuario: string, senha: string){
        var usuarioLogin = await this.neDBService.getUsuarioByUsuario(usuario);
        if(usuarioLogin){
            if(usuarioLogin[0].senha === senha){
                return usuarioLogin
            }else{
                return false
            }
        }else{
            return false
        }
    }

    async cadastrar(usuario: Usuario) {
        return await this.neDBService.create(usuario);
    }

    async buscarTodos(): Promise<Usuario[]>{
        return await this.neDBService.findAllDocuments();
    }

    async buscarPeloId(id: string): Promise<Usuario>{
        return await this.neDBService.getById(id);
    }

    async atualizaUsuario(id: string, usuario: Usuario){
        return await this.neDBService.updateUsuario(id, usuario);
    }

    async removeUsuario(id){
        return await this.neDBService.deleteById(id);
    }
}