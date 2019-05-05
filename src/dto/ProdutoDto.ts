import { Exception } from "../common/Exception";
import { Produto } from "../interfaces/Produto";

export class ProdutoDto{

    id: string;
    nome: string;
    descricao: string;
    marca: string;
    valorUnitario: number;
    origem: string;
    usuarioCadastro: string;

    async fromDB(produto:Produto){        
        this.id = produto.id;
        this.nome = produto.nome;
        this.descricao = produto.descricao;
        this.marca = produto.marca;
        this.valorUnitario = produto.valorUnitario;
        this.origem = produto.origem;
        this.usuarioCadastro = produto.usuarioCadastro;
    }

    async toDB():Promise<Produto>{
        var produtoDB:Produto = {
            id: this.id,       
            nome: this.nome,      
            descricao: this.descricao,
            marca: this.marca,
            valorUnitario: this.valorUnitario,
            origem: this.origem,
            usuarioCadastro: this.usuarioCadastro,
        };
        
        produtoDB.id = this.id;        
        produtoDB.nome = this.nome;        
        produtoDB.descricao = this.descricao;        
        produtoDB.marca = this.marca;
        produtoDB.valorUnitario = this.valorUnitario;
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