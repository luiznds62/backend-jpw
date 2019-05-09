import { Service } from "@tsed/common";
import { Venda } from "../../interfaces/Venda";
var Datastore = require('nedb');
var db = new Datastore({
    filename: 'venda.json'
});

@Service()
export class NeDBVenda {

    constructor() {
        db.loadDatabase(function (err) {
            if(err){
                console.log(`Erros no database Venda >> ${err}`)
            }
        });
    }

    async create(venda: Venda) {
        return new Promise((resolve, reject) => {
            db.insert(venda, function (err, newDoc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(`${newDoc} - Venda criado com sucesso!`);
                }
            });
        });
    }

    async findAllDocuments(): Promise<Venda[]> {
        return new Promise((resolve, reject) => {
            db.find({}, function (err, docs) {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    }

    async getById(id: string): Promise<Venda> {
        return new Promise((resolve, reject) => {
            db.find({ _id: id }, function (err, doc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
        });
    }

    async updateVenda(id: String, Venda: Venda) {
        return new Promise((resolve, reject) => {
            db.update({ _id: id }, Venda, function (err, numReplaced) {
                if (err) {
                    reject(err);
                }
                resolve(`${numReplaced} - Venda alterado com sucesso!`);
            });
        });
    }

    async deleteById(id: String) {
        return new Promise((resolve, reject) => {
            db.remove({ _id: id }, {}, function (err, numRemoved) {
                if (err) {
                    reject(err);
                }
                resolve(`${numRemoved} - Venda removido com sucesso!`);
            });
        });
    }
}