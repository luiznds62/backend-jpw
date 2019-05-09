import { Exception } from "../common/Exception";
import { Venda } from "../interfaces/Venda";
import { ConversorMonetarioService } from "../services/conversorMonetario/conversorMonetarioService";
import { UsuarioService } from "../services/usuario/UsuarioService";
import { ProdutoService } from "../services/produto/ProdutoService";

export class VendaDto{
    async converteValor(valor){
        var conversorMonetarioService: ConversorMonetarioService;
        return await conversorMonetarioService.converteMoedas('BRL','USD',valor);
    }

    constructor(private usuarioService: UsuarioService, private produtoService: ProdutoService){
        
    }

    id: string;
    produto: any;
    usuarioCadastro: any;
    quantidade: number;
    valorTotal: number;
    valorTotalDolar: number;

    async fromDB(Venda:Venda){        
        this.id = Venda.id;
        this.produto = Venda.produto;
        this.usuarioCadastro = Venda.usuarioCadastro;
        this.quantidade = Venda.quantidade;
        this.valorTotal = Venda.valorTotal;
        this.valorTotalDolar = Venda.valorTotalDolar;
    }

    async toDB():Promise<Venda>{
        var vendaDB:Venda = {
            id: this.id,       
            produto: this.produto,      
            usuarioCadastro: this.usuarioCadastro,
            quantidade: this.quantidade,
            valorTotal: this.valorTotal,
            valorTotalDolar: this.valorTotalDolar,
        };
        
        vendaDB.id = this.id;        
        vendaDB.produto = this.produto;        
        vendaDB.usuarioCadastro = this.usuarioCadastro;        
        vendaDB.quantidade = this.quantidade;
        vendaDB.valorTotal = this.valorTotal;
        vendaDB.valorTotalDolar = this.valorTotalDolar;

        return vendaDB;
    }

    async valide():Promise<Exception>{
        if(this.produto.length === 0){
            return new Exception('O produto não foi informado!', true)
        }
        if(this.usuarioCadastro.length === 0){
            return new Exception('O usuário não foi informado!', true)
        }
        if(this.quantidade === 0){
            return new Exception('A quantidade não foi informado!', true)
        }
        if(this.valorTotal === 0){
            return new Exception('O valor total não foi informado!', true)
        }
 
        return new Exception('', false);
    }

}