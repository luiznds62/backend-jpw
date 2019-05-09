import {
    BodyParams,
    Controller,
    Delete,
    Get,
    PathParams,
    Post,
    Put,
    Required,
    Res,
    Req,
    Next,
} from "@tsed/common";
import { VendaService } from "../../services/Venda/VendaService";
import { Venda } from "../../interfaces/Venda";
import { VendaDto } from "../../dto/VendaDto";
import { Exception } from "../../common/Exception";
import { ReturnDTO } from "../../common/ReturnDTO";
import { ExceptionMensagens } from "../../common/ExceptionsMensagens";
import { UsuarioService } from "../../services/usuario/UsuarioService";
import { ConversorCSVService } from "../../services/conversorCSV/ConversorCSVService";
import * as Express from "express";
var path = require('path');
var mime = require('mime');
var fs = require('fs');

@Controller("/venda")
export class VendaCtrl {

    constructor(private vendaService: VendaService, private usuarioService: UsuarioService, private csvService: ConversorCSVService) {

    }

    @Post("/")
    async cadastrarUsuario(@BodyParams() vendaDto: VendaDto) {
        var exception: Exception = await vendaDto.valide();

        if (exception.erro) {
            return await new ReturnDTO(exception.mensagem, false, null);
        }

        var venda = await vendaDto.toDB()

        return await this.vendaService.cadastrar(venda).then(function (vendaDB: Venda) {
            return new ReturnDTO('', true, vendaDB);
        }).catch(function () {
            new ReturnDTO(new ExceptionMensagens().mensagemPadraoBanco, false, null);
        });
    }

    @Get("/relatorio/venda")
    async relatorioVenda(
        @Req() req: Express.Request,
        @Res() res: Express.Response,
        @Next() next: Express.NextFunction
    ){
        var dadosVenda = await this.vendaService.buscarTodos();
        var csv = await this.csvService.geraCsvVenda(dadosVenda);

        var writerStream = fs.createWriteStream('Vendas.csv');
        writerStream.write(csv,'UTF8');
        writerStream.end();
        var file = "vendas.csv"

        var filename = path.basename(file);
        var mimetype = mime.lookup(file);

        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', mimetype);

        var filestream = fs.createReadStream(file);
        filestream.pipe(res);
    }

    @Get("/:id")
    async buscarPeloId(@PathParams("id") @Required() id: string) {
        return await this.vendaService.buscarPeloId(id).then(function (VendaDB: VendaDto) {
            return new ReturnDTO('', true, VendaDB);
        }).catch(function () {
            new ReturnDTO(new ExceptionMensagens().mensagemPadraoBanco, false, null);
        });
    }

    @Get("/")
     async buscarTodosVendas(){
         return await this.vendaService.buscarTodos().then(function(VendasDB:VendaDto[]){
            return new ReturnDTO('',true,VendasDB)
         }).catch(function(){
            new ReturnDTO(new ExceptionMensagens().mensagemPadraoBanco, false, null);
         });
    }

    @Put("/:id")
    async atualizarVenda(@PathParams("id") id: string, @BodyParams() vendaDto: VendaDto){
        var exception:Exception = await vendaDto.valide();

        if(exception.erro){
            return await new ReturnDTO(exception.mensagem, false, null);
        }

        var venda = await vendaDto.toDB();

        return await this.vendaService.atualizaVenda(id,venda).then(function(retorno: string){
            if(retorno === '0 - Venda alterado com sucesso!'){
                return new ReturnDTO('', false, retorno);
            }
            return new ReturnDTO('', true, retorno);
        }).catch(function(){
            new ReturnDTO(new ExceptionMensagens().mensagemPadraoBanco, false, null);
        });
    }

    @Delete("/:id")
    async deletarVenda(@PathParams("id") @Required() id: string){
        return await this.vendaService.removeVenda(id).then(function(retorno: string){
            return new ReturnDTO('',true,retorno);
        }).catch(function(){
            new ReturnDTO(new ExceptionMensagens().mensagemPadraoBanco, false, null);
        });
    }
}