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
import { PessoaService } from "../../services/pessoa/PessoaService";
import { Pessoa } from "../../interfaces/Pessoa";

@Controller("/pessoa")
export class PessoaCtrl {

    constructor(private pessoaService: PessoaService){

    }

    @Post("/")
    async cadastraPessoa(@BodyParams() pessoa: Pessoa){
        return await this.pessoaService.cadastrar(pessoa);
    }

    @Get("/:id")
    async buscarPeloId(@PathParams("id") @Required() id: string): Promise<Pessoa>{
        return await this.pessoaService.buscarPeloId(id); 
    }

    @Get("/")
     async buscarTodasPessoas(): Promise<Pessoa[]>{
         return await this.pessoaService.buscarTodos();
    }

    @Put("/:id")
    async atualizarPessoa(@PathParams("id") id: string, @BodyParams() pessoa: Pessoa){
        return await this.pessoaService.atualizaPessoa(id,pessoa);
    }

    @Delete("/:id")
    async deletarPessoa(@PathParams("id") @Required() id: string){
        return await this.pessoaService.removePessoa(id);
    }
}

