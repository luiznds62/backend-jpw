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
import { UsuarioService } from "../../services/usuario/UsuarioService";
import { Usuario } from "../../interfaces/Usuario";
import { UsuarioDTO } from "../../dto/UsuarioDto";
import { Exception } from "../../common/Exception";
import { ReturnDTO } from "../../common/ReturnDTO";
import { ExceptionMensagens } from "../../common/ExceptionsMensagens";
import * as Express from "express";

@Controller("/usuario")
export class UsuarioCtrl {

    constructor(private usuarioService: UsuarioService){

    }

    @Post("/")
    async cadastrarUsuario(@BodyParams() usuarioDTO: UsuarioDTO){
        var exception:Exception = await usuarioDTO.valide();
        
        if(exception.erro){
            return await new ReturnDTO(exception.mensagem, false, null);
        }

        var usuario = await usuarioDTO.toDB()

        return await this.usuarioService.cadastrar(usuario).then(function(usuarioDB:Usuario){
            return new ReturnDTO('', true, usuarioDB);
        }).catch(function(){
            new ReturnDTO(new ExceptionMensagens().mensagemPadraoBanco, false, null);
        });
    }

    @Get("/:id")
    async buscarPeloId(@PathParams("id") @Required() id: string){
        return await this.usuarioService.buscarPeloId(id).then(function(usuarioDB:Usuario){
            return new ReturnDTO('',true, usuarioDB);
        }).catch(function(){
            new ReturnDTO(new ExceptionMensagens().mensagemPadraoBanco, false, null);
        });
    }

    @Get("/relatorio/usuario")
    async relatorioUsuario( @Req() req: Express.Request, @Res() res: Express.Response, @Next() next: Express.NextFunction){
        var path = require('path');
        var mime = require('mime');
        var fs = require('fs');

        var dadosUsuario = await this.usuarioService.buscarTodos();
        var json = dadosUsuario;
        var fields = Object.keys(json[0])
        var replacer = function(key, value) { return value === null ? '' : value } 
        var csv = json.map(function(row){
        return fields.map(function(fieldName){
            return JSON.stringify(row[fieldName], replacer)
        }).join(',')
        })
        csv.unshift(fields.join(',')) 
        var fs = require("fs");
        var writerStream = fs.createWriteStream('/output.csv');
        writerStream.write(JSON.stringify(csv),'UTF8');
        writerStream.end();

        var file = "output.csv"

        var filename = path.basename(file);
        var mimetype = mime.lookup(file);

        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', mimetype);

        var filestream = fs.createReadStream(file);
        filestream.pipe(res);
    }

    @Get("/")
     async buscarTodosUsuarios(){
         return await this.usuarioService.buscarTodos().then(function(usuariosDB:Usuario[]){
            return new ReturnDTO('',true,usuariosDB)
         }).catch(function(){
            new ReturnDTO(new ExceptionMensagens().mensagemPadraoBanco, false, null);
         });
    }

    @Get("/login/:usuario/:senha")
    async login(@PathParams("usuario") @Required() usuario: string,
                @PathParams("senha") @Required() senha: string){
        return await this.usuarioService.login(usuario,senha).then(function(retorno: string){
            if(retorno === 'Login realizado com sucesso'){
                return new ReturnDTO(retorno,true,'');
            }else{
                return new ReturnDTO(retorno,false,'');
            }
        }).catch(function(){
            new ReturnDTO(new ExceptionMensagens().mensagemPadraoBanco, false, null);
        });
    }

    @Put("/:id")
    async atualizarUsuario(@PathParams("id") id: string, @BodyParams() usuarioDTO: UsuarioDTO){
        var exception:Exception = await usuarioDTO.valide();

        if(exception.erro){
            return await new ReturnDTO(exception.mensagem, false, null);
        }

        var usuario = await usuarioDTO.toDB();

        return await this.usuarioService.atualizaUsuario(id,usuario).then(function(retorno: string){
            if(retorno === '0 - Usuário alterado com sucesso!'){
                return new ReturnDTO('', false, retorno);
            }
            return new ReturnDTO('', true, retorno);
        }).catch(function(){
            new ReturnDTO(new ExceptionMensagens().mensagemPadraoBanco, false, null);
        });
    }

    @Delete("/:id")
    async deletarUsuario(@PathParams("id") @Required() id: string){
        return await this.usuarioService.removeUsuario(id).then(function(retorno: string){
            return new ReturnDTO('',true,retorno);
        }).catch(function(){
            new ReturnDTO(new ExceptionMensagens().mensagemPadraoBanco, false, null);
        });
    }
}

