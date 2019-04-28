import { Service } from "@tsed/common";
import { NeDBService } from "../nedb/NeDBService";

@Service()
export class PessoaService {

    constructor(private neDBService: NeDBService){
        
    }

    async cadastrar(nome,tipo,documento){
        var doc = {nome: nome,
                   tipo: tipo,
                   documento: documento};
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

    async atualizaPessoa(id,nome,tipo,documento){
        return this.neDBService.updatePessoa(id,nome,tipo,documento);
    }

    async removePessoa(id){
        return this.neDBService.deleteById(id);
    }
}