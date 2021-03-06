import { Service } from "@tsed/common";
import { NeDBProduto } from "../nedb/NeDBProduto";
import { Produto } from "../../interfaces/Produto";
import { NeDBUsuario } from "../nedb/NeDBUsuario";
import { ConversorMonetarioService } from "../conversorMonetario/conversorMonetarioService";

@Service()
export class ProdutoService {

    constructor(
        private neDBService: NeDBProduto,
        private neDBUsuario: NeDBUsuario,
        private conversorMonetarioService: ConversorMonetarioService) {

    }

    async cadastrar(produto: Produto) {
        console.log(await this.conversorMonetarioService.converteMoedas('BRL','USD',produto.valorUnitario));
        produto.valorUnitarioDolar = await this.conversorMonetarioService.converteMoedas('BRL','USD',produto.valorUnitario);
        return await this.neDBService.create(produto);
    }

    async buscarTodos() {
        var produtos = await this.neDBService.findAllDocuments();
        for (var i = 0; i < produtos[0].length; i++) {
            produtos[i].usuarioCadastro = await this.neDBUsuario.getById(produtos[i].usuarioCadastro);
        }
        return produtos
    }

    async buscarPeloId(id: string) {
        var produto = await this.neDBService.getById(id);
        produto[0].usuarioCadastro = await this.neDBUsuario.getById(produto[0].usuarioCadastro);
        return produto
    }

    async atualizaProduto(id: string, produto: Produto) {
        return await this.neDBService.updateProduto(id, produto);
    }

    async removeProduto(id) {
        return await this.neDBService.deleteById(id);
    }
}