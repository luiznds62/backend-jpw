import {
    Authenticated,
    BodyParams,
    Controller,
    Delete,
    Get,
    PathParams,
    Post,
    Put,
    Required,
    Status
} from "@tsed/common";
import { EventsCtrl } from "../events/EventsCtrl";
import { PessoaService } from "../../services/pessoa/PessoaService";
import { resolve } from "bluebird";

@Controller("/pessoa", EventsCtrl)
export class PessoaCtrl {

    constructor(private pessoaService: PessoaService){

    }

    @Post("/")
    async cadastraPessoa(@BodyParams() body: any){
        return this.pessoaService.cadastrar(body.Nome,body.Tipo,body.Documento);
    }

    @Get("/")
    async buscarTodasPessoas(){
        return Object.values(this.pessoaService.buscarTodos());
    }

    @Get("/:id")
    async buscarPeloId(@PathParams("id") id: String){
        return this.pessoaService.buscarPeloId(id); 
    }

    @Put("/:id")
    async atualizarPessoa(@BodyParams() body: any, @PathParams("id") id: String){
        return this.pessoaService.atualizaPessoa(id,body.Nome,body.Tipo,body.Documento);
    }

    @Delete("/:id")
    async deletarPessoa(@PathParams("id") id: String){
        return this.pessoaService.removePessoa(id);
    }
}

