import { Service } from "@tsed/common";
import { NeDBVenda } from "../nedb/NeDBVenda";
import { Venda } from "../../interfaces/Venda";
import { NeDBUsuario } from "../nedb/NeDBUsuario";
import { ConversorMonetarioService } from "../conversorMonetario/conversorMonetarioService";
import { NeDBProduto } from "../nedb/NeDBProduto";

@Service()
export class VendaService {

    constructor(
        private neDBService: NeDBVenda,
        private neDBProduto: NeDBProduto,
        private neDBUsuario: NeDBUsuario,
        private conversorMonetarioService: ConversorMonetarioService) {

    }

    async cadastrar(venda: Venda) {
        console.log(await this.conversorMonetarioService.converteMoedas('BRL','USD',venda.valorTotal));
        venda.valorTotalDolar = await this.conversorMonetarioService.converteMoedas('BRL','USD',venda.valorTotal);
        return await this.neDBService.create(venda);
    }

    async buscarTodos(): Promise<Venda[]> {
        var Vendas = await this.neDBService.findAllDocuments();
        for (var i = 0; i < Vendas.length; i++) {
            Vendas[i].usuarioCadastro = await this.neDBUsuario.getById(Vendas[i].usuarioCadastro);
            Vendas[i].produto = await this.neDBProduto.getById(Vendas[i].produto);
        }
        return Vendas
    }

    async buscarPeloId(id: string): Promise<Venda> {
        var Venda = await this.neDBService.getById(id);
        Venda[0].usuarioCadastro = await this.neDBUsuario.getById(Venda[0].usuarioCadastro);
        Venda[0].produto = await this.neDBProduto.getById(Venda[0].produto);
        return Venda
    }

    async atualizaVenda(id: string, venda: Venda) {
        return await this.neDBService.updateVenda(id, venda);
    }

    async removeVenda(id) {
        return await this.neDBService.deleteById(id);
    }
}