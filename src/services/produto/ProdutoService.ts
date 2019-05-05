import { Service } from "@tsed/common";
import { NeDBProduto } from "../nedb/NeDBProduto";
import { Produto } from "../../interfaces/Produto";

@Service()
export class ProdutoService {

    constructor(private neDBService: NeDBProduto) {

    }

    async cadastrar(produto: Produto) {
        return await this.neDBService.create(produto);
    }

    async buscarTodos(): Promise<Produto[]>{
        return await this.neDBService.findAllDocuments();
    }

    async buscarPeloId(id: string): Promise<Produto>{
        return await this.neDBService.getById(id);
    }

    async atualizaProduto(id: string, produto: Produto){
        return await this.neDBService.updateProduto(id, produto);
    }

    async removeProduto(id){
        return await this.neDBService.deleteById(id);
    }
}