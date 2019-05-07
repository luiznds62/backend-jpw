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
import { ProdutoService } from "../../services/produto/ProdutoService";
import { Produto } from "../../interfaces/Produto";
import { ProdutoDto } from "../../dto/ProdutoDto";
import { Exception } from "../../common/Exception";
import { ReturnDTO } from "../../common/ReturnDTO";
import { ExceptionMensagens } from "../../common/ExceptionsMensagens";
import { UsuarioService } from "../../services/usuario/UsuarioService";
import { ConversorCSVService } from "../../services/conversorCSV/ConversorCSVService";
import * as Express from "express";
var path = require('path');
var mime = require('mime');
var fs = require('fs');

@Controller("/produto")
export class ProdutoCtrl {

    constructor(private produtoService: ProdutoService, private usuarioService: UsuarioService, private csvService: ConversorCSVService) {

    }

    @Post("/")
    async cadastrarUsuario(@BodyParams() produtoDto: ProdutoDto) {
        var exception: Exception = await produtoDto.valide();

        if (exception.erro) {
            return await new ReturnDTO(exception.mensagem, false, null);
        }

        var produto = await produtoDto.toDB()

        return await this.produtoService.cadastrar(produto).then(function (produtoDB: Produto) {
            return new ReturnDTO('', true, produtoDB);
        }).catch(function () {
            new ReturnDTO(new ExceptionMensagens().mensagemPadraoBanco, false, null);
        });
    }

    @Get("/relatorio/produto")
    async relatorioProduto(
        @Req() req: Express.Request,
        @Res() res: Express.Response,
        @Next() next: Express.NextFunction
    ){
        var dadosProduto = await this.produtoService.buscarTodos();
        var csv = await this.csvService.geraCsvProduto(dadosProduto);

        var writerStream = fs.createWriteStream('produtos.csv');
        writerStream.write(csv,'UTF8');
        writerStream.end();
        var file = "produtos.csv"

        var filename = path.basename(file);
        var mimetype = mime.lookup(file);

        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', mimetype);

        var filestream = fs.createReadStream(file);
        filestream.pipe(res);
    }

    @Get("/:id")
    async buscarPeloId(@PathParams("id") @Required() id: string) {
        return await this.produtoService.buscarPeloId(id).then(function (produtoDB: ProdutoDto) {
            return new ReturnDTO('', true, produtoDB);
        }).catch(function () {
            new ReturnDTO(new ExceptionMensagens().mensagemPadraoBanco, false, null);
        });
    }

    @Get("/")
     async buscarTodosProdutos(){
         return await this.produtoService.buscarTodos().then(function(produtosDB:ProdutoDto[]){
            return new ReturnDTO('',true,produtosDB)
         }).catch(function(){
            new ReturnDTO(new ExceptionMensagens().mensagemPadraoBanco, false, null);
         });
    }

    @Put("/:id")
    async atualizarProduto(@PathParams("id") id: string, @BodyParams() produtoDto: ProdutoDto){
        var exception:Exception = await produtoDto.valide();

        if(exception.erro){
            return await new ReturnDTO(exception.mensagem, false, null);
        }

        var produto = await produtoDto.toDB();

        return await this.produtoService.atualizaProduto(id,produto).then(function(retorno: string){
            if(retorno === '0 - Produto alterado com sucesso!'){
                return new ReturnDTO('', false, retorno);
            }
            return new ReturnDTO('', true, retorno);
        }).catch(function(){
            new ReturnDTO(new ExceptionMensagens().mensagemPadraoBanco, false, null);
        });
    }

    @Delete("/:id")
    async deletarProduto(@PathParams("id") @Required() id: string){
        return await this.produtoService.removeProduto(id).then(function(retorno: string){
            return new ReturnDTO('',true,retorno);
        }).catch(function(){
            new ReturnDTO(new ExceptionMensagens().mensagemPadraoBanco, false, null);
        });
    }
}