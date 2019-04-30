import { Service } from "@tsed/common";
import { Pessoa } from "../../interfaces/Pessoa";
var Datastore = require('nedb');
var db = new Datastore({
  filename: 'pessoa.json'
});

@Service()
export class NeDBPessoa {

  constructor() {
    db.loadDatabase(function (err) {
      console.log(`Erros no database Pessoa >> ${err}`)
    });
  }

  async create(pessoa: Pessoa){
    return new Promise((resolve,reject) => {
      db.insert(pessoa, function (err, newDoc) {
        if(err){
          reject(err);
        } else{
          resolve(`${newDoc} criado com sucesso!`);
        }
      });
    });
  }

  async findAllDocuments(): Promise<Pessoa[]>{
    return new Promise((resolve,reject) => {
      db.find({}, function (err, docs) {
        if(err){
          reject(err);
        } else {
          console.log(docs);
          resolve(docs);
        }
      });
    });
  }

  async getById(id: string): Promise<Pessoa> {
    return new Promise((resolve,reject) => {
      db.find({ _id: id }, function (err, doc) {
        if(err){
          reject(err);
        } else {
          resolve(doc);
        }
      });
    });
  }

  async updatePessoa(id: String, pessoa: Pessoa) {
    return new Promise((resolve,reject) => {
      db.update({ _id: id }, pessoa , function (err, numReplaced) {
        if(err){
          reject(err);
        }
        resolve(`${numReplaced} alterado com sucesso!`);
      });
    });
  }

  async deleteById(id: String){
    return new Promise((resolve,reject) => {
      db.remove({ _id: id }, {}, function (err, numRemoved) {
        if(err){
          reject(err);
        }
        resolve(`${numRemoved} removido com sucesso!`);
      });
    });
  }
}