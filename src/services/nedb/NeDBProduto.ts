import { Service } from "@tsed/common";
import { Produto } from "../../interfaces/Produto";
var Datastore = require('nedb');
var db = new Datastore({
    filename: 'produto.json'
});

@Service()
export class NeDBProduto {

    constructor() {
        db.loadDatabase(function (err) {
            console.log(`Erros no database Produto >> ${err}`)
        });
    }

    async create(produto: Produto) {
        return new Promise((resolve, reject) => {
            db.insert(produto, function (err, newDoc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(`${newDoc} - Produto criado com sucesso!`);
                }
            });
        });
    }

    async findAllDocuments(): Promise<Produto[]> {
        return new Promise((resolve, reject) => {
            db.find({}, function (err, docs) {
                if (err) {
                    reject(err);
                } else {
                    console.log(docs);
                    resolve(docs);
                }
            });
        });
    }

    async getById(id: string): Promise<Produto> {
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

    async updateProduto(id: String, produto: Produto) {
        return new Promise((resolve, reject) => {
            db.update({ _id: id }, produto, function (err, numReplaced) {
                if (err) {
                    reject(err);
                }
                resolve(`${numReplaced} - Produto alterado com sucesso!`);
            });
        });
    }

    async deleteById(id: String) {
        return new Promise((resolve, reject) => {
            db.remove({ _id: id }, {}, function (err, numRemoved) {
                if (err) {
                    reject(err);
                }
                resolve(`${numRemoved} - Produto removido com sucesso!`);
            });
        });
    }
}