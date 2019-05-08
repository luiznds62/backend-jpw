import { Service } from "@tsed/common";
import { Usuario } from "../../interfaces/Usuario";
var Datastore = require('nedb');
var db = new Datastore({
  filename: 'usuario.json'
});

@Service()
export class NeDBUsuario {

  constructor() {
    db.loadDatabase(function (err) {
      if(err){
        console.log(`Erros no database Usuario >> ${err}`)
      }
    });
  }

  async getUsuarioByUsuario(usuario: string): Promise<Usuario>{
    return new Promise((resolve,reject) => {
      db.find({ usuario: usuario }, function (err, doc) {
        if(err){
          reject(err);
        } else {
          resolve(doc);
        }
      });
    });
  }

  async create(usuario: Usuario){
    return new Promise((resolve,reject) => {
      db.insert(usuario, function (err, newDoc) {
        if(err){
          reject(err);
        } else{
          resolve(`${newDoc} - Usuário criado com sucesso!`);
        }
      });
    });
  }

  async findAllDocuments(): Promise<Usuario[]>{
    return new Promise((resolve,reject) => {
      db.find({}, function (err, docs) {
        if(err){
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });
  }

  async getById(id: string): Promise<Usuario> {
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

  async updateUsuario(id: String, usuario: Usuario) {
    return new Promise((resolve,reject) => {
      db.update({ _id: id }, usuario , function (err, numReplaced) {
        if(err){
          reject(err);
        }
        resolve(`${numReplaced} - Usuário alterado com sucesso!`);
      });
    });
  }

  async deleteById(id: String){
    return new Promise((resolve,reject) => {
      db.remove({ _id: id }, {}, function (err, numRemoved) {
        if(err){
          reject(err);
        }
        resolve(`${numRemoved} - Usuário removido com sucesso!`);
      });
    });
  }
}