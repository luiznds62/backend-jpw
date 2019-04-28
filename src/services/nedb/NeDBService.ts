import { Service } from "@tsed/common";
var Datastore = require('nedb');
var db = new Datastore({
     filename: 'C:\ ' 
});

@Service()
export class NeDBService {
   
   constructor(){
    db.loadDatabase(function (err) {    
      console.log(`Erros no loadDatabase >> ${err}`)
    });
   }

   async create(doc){
    console.log(`Salvando no NeDB >> ${doc}`);
    db.insert(doc, function (err, newDoc) {   
      console.log(`Erros create >> ${err} Sucesso create >> ${newDoc}`)  
      return newDoc
    });
   }

   async findAllDocuments(){
    db.find({}, function (err, docs) {
      console.log(`Erros no findAllDocuments >> ${err} Sucesso no findAllDocuments >> ${docs}`)
      docs.forEach(element => {
        console.log(element);
      });
      return docs
    });
   }

   async getById(id){
    db.findOne({ _id: id }, function (err, doc) {
      console.log(`Erros no getById >> ${err} Sucesso no getById >> ${doc}`)
      return doc;
    });
   }

   async updatePessoa(id,nome,tipo,documento){
    db.update({ _id: id }, { $set: { nome: nome, tipo: tipo, documento: documento } }, { multi: true }, function (err, numReplaced) {
      console.log(`Erros no updatePessoa >> ${err} Sucesso no updatePessoa >> ${numReplaced}`);
      return numReplaced;
    });
   }

   async deleteById(id){
    db.remove({ _id: id }, {}, function (err, numRemoved) {
      console.log(`Erros no deleteById >> ${err} Sucesso no deleteById >> ${numRemoved}`);
      return numRemoved;
    });
   }

   async updateConta(id,descricao,pessoa,tipo,valor){
    db.update({ _id: id }, { $set: { descricao: descricao, pessoa: pessoa, tipo: tipo, valor: valor } }, { multi: true }, function (err, numReplaced) {
      console.log(`Erros no updateConta >> ${err} Sucesso no updateConta >> ${numReplaced}`);
      return numReplaced;
    });
   }
}