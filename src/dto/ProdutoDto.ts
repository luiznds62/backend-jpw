import { Exception } from "../common/Exception";
import { Produto } from "../interfaces/Produto";
import { ConversorMonetarioService } from "../services/conversorMonetario/conversorMonetarioService";
import { UsuarioService } from "../services/usuario/UsuarioService";

export class ProdutoDto{
    async converteValor(valor){
        var conversorMonetarioService: ConversorMonetarioService;
        return await conversorMonetarioService.converteMoedas('BRL','USD',valor);
    }

    constructor(private usuarioService: UsuarioService){
        
    }

    id: string;
    nome: string;
    descricao: string;
    marca: string;
    valorUnitario: number;
    valorUnitarioDolar: any;
    origem: string;
    usuarioCadastro: any;

    async fromDB(produto:Produto){        
        this.id = produto.id;
        this.nome = produto.nome;
        this.descricao = produto.descricao;
        this.marca = produto.marca;
        this.valorUnitario = produto.valorUnitario;
        this.valorUnitarioDolar = produto.valorUnitarioDolar;
        this.origem = produto.origem;
        this.usuarioCadastro = await this.usuarioService.buscarPeloId(produto.usuarioCadastro);
    }

    async toDB():Promise<Produto>{
        var produtoDB:Produto = {
            id: this.id,       
            nome: this.nome,      
            descricao: this.descricao,
            marca: this.marca,
            valorUnitario: this.valorUnitario,
            valorUnitarioDolar: this.valorUnitarioDolar,
            origem: this.origem,
            usuarioCadastro: this.usuarioCadastro,
        };
        
        produtoDB.id = this.id;        
        produtoDB.nome = this.nome;        
        produtoDB.descricao = this.descricao;        
        produtoDB.marca = this.marca;
        produtoDB.valorUnitario = this.valorUnitario;
        produtoDB.valorUnitarioDolar = this.valorUnitarioDolar;
        produtoDB.origem = this.origem;
        produtoDB.usuarioCadastro = this.usuarioCadastro;

        return produtoDB;
    }

    async valide():Promise<Exception>{
        if(this.nome.length < 2){
            return new Exception('O nome do produto precisa conter no mínimo 2 caracteres', true)
        }
        return new Exception('', false);
    }

}