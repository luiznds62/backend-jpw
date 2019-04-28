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
import { resolve } from "bluebird";
import { ContaService } from "../../services/conta/contaService";

@Controller("/contas", EventsCtrl)
export class ContaCtrl {

    constructor(private contaService: ContaService){

    }

    @Post("/")
    async cadastrarConta(@BodyParams() body: any){
        return this.contaService.cadastrar(body.Descricao,body.Pessoa,body.Tipo,body.Valor);
    }

    @Get("/")
    async buscarTodasContas(){
        return this.contaService.buscarTodos();
    }

    @Get("/:id")
    async buscarPeloId(@PathParams("id") id: String){
        return this.contaService.buscarPeloId(id);
    }

    @Put(":id")
    async atualizarConta(@BodyParams() body: any, @PathParams("id") id: String){
        return this.contaService.atualizaConta(id,body.Descricao,body.Pessoa,body.Tipo,body.Valor);
    }

    @Delete(":id")
    async deletarPessoa(@PathParams("id") id: String){
        return this.contaService.removeConta(id);
    }
}

