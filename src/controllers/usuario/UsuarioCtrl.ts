import {
    BodyParams,
    Controller,
    Delete,
    Get,
    PathParams,
    Post,
    Put,
    Required,
} from "@tsed/common";
import { UsuarioService } from "../../services/usuario/UsuarioService";
import { Usuario } from "../../interfaces/Usuario";

@Controller("/pessoa")
export class PessoaCtrl {

    constructor(private usuarioService: UsuarioService){

    }

    @Post("/")
    async cadastrarUsuario(@BodyParams() usuario: Usuario){
        return await this.usuarioService.cadastrar(usuario);
    }

    @Get("/:id")
    async buscarPeloId(@PathParams("id") @Required() id: string): Promise<Usuario>{
        return await this.usuarioService.buscarPeloId(id); 
    }

    @Get("/")
     async buscarTodosUsuarios(): Promise<Usuario[]>{
         return await this.usuarioService.buscarTodos();
    }

    @Put("/:id")
    async atualizarUsuario(@PathParams("id") id: string, @BodyParams() usuario: Usuario){
        return await this.usuarioService.atualizaUsuario(id,usuario);
    }

    @Delete("/:id")
    async deletarUsuario(@PathParams("id") @Required() id: string){
        return await this.usuarioService.removeUsuario(id);
    }
}

