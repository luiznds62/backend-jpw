import { Service } from "@tsed/common";
import { NeDBService } from "../nedb/NeDBService";

@Service()
export class ContaService {

    constructor(private neDBService: NeDBService){
        
    }

    async cadastrar(descricao,pessoa,tipo,valor){
        var doc = {descricao: descricao,
                   pessoa: pessoa,
                   tipo: tipo,
                   valor: valor};
        console.log(`Documento >> ${Object.values(doc)}`)                   
        var newDoc =this.neDBService.create(doc);
        return newDoc
    }

    async buscarTodos(){
        return this.neDBService.findAllDocuments();
    }

    async buscarPeloId(id){
        return this.neDBService.getById(id);
    }

    async atualizaConta(id,descricao,pessoa,tipo,valor){
        return this.neDBService.updateConta(id,descricao,pessoa,tipo,valor);
    }

    async removeConta(id){
        return this.neDBService.deleteById(id);
    }
}