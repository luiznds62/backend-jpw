import { Service } from "@tsed/common";
import { NeDBProduto } from "../nedb/NeDBProduto";
import { Produto } from "../../interfaces/Produto";
import { NeDBUsuario } from "../nedb/NeDBUsuario";

@Service()
export class ProdutoService {

    constructor(private neDBService: NeDBProduto, private neDBUsuario: NeDBUsuario) {

    }

    async cadastrar(produto: Produto) {
        return await this.neDBService.create(produto);
    }

    async buscarTodos(): Promise<Produto[]>{
        var produtos =  await this.neDBService.findAllDocuments();
        for(var i = 0; i < produtos.length; i++){
            produtos[i].usuarioCadastro = await this.neDBUsuario.getById(produtos[i].usuarioCadastro);
        }
        return produtos
    }

    async buscarPeloId(id: string): Promise<Produto>{
        var produto =  await this.neDBService.getById(id);
        produto[0].usuarioCadastro = await this.neDBUsuario.getById(produto[0].usuarioCadastro);
        return produto
    }

    async atualizaProduto(id: string, produto: Produto){
        return await this.neDBService.updateProduto(id, produto);
    }

    async removeProduto(id){
        return await this.neDBService.deleteById(id);
    }
}