"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@tsed/common");
var Datastore = require('nedb');
var db = new Datastore({
    filename: 'C:\ '
});
let NeDBService = class NeDBService {
    constructor() {
        db.loadDatabase(function (err) {
            console.log(`Erros no loadDatabase >> ${err}`);
        });
    }
    create(doc) {
        console.log(`Salvando no NeDB >> ${doc}`);
        db.insert(doc, function (err, newDoc) {
            console.log(`Erros create >> ${err} Sucesso create >> ${newDoc}`);
            return newDoc;
        });
    }
    findAllDocuments() {
        db.find({}, function (err, docs) {
            console.log(`Erros no findAllDocuments >> ${err} Sucesso no findAllDocuments >> ${docs}`);
            docs.forEach(element => {
                console.log(element);
            });
            return docs;
        });
    }
    getById(id) {
        db.find({ _id: id }, function (err, doc) {
            console.log(`Erros no getById >> ${err} Sucesso no getById >> ${doc}`);
            return doc;
        });
    }
    updatePessoa(id, nome, tipo, documento) {
        db.update({ _id: id }, { $set: { nome: nome, tipo: tipo, documento: documento } }, { multi: true }, function (err, numReplaced) {
            console.log(`Erros no updatePessoa >> ${err} Sucesso no updatePessoa >> ${numReplaced}`);
            return numReplaced;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var retorno = "";
            db.remove({ _id: id }, {}, function (err, numRemoved) {
                console.log(`Erros no deleteById >> ${err} Sucesso no deleteById >> ${numRemoved}`);
                retorno += `Registro deletado : ${numRemoved}`;
            });
            return retorno;
        });
    }
    updateConta(id, descricao, pessoa, tipo, valor) {
        return __awaiter(this, void 0, void 0, function* () {
            db.update({ _id: id }, { $set: { descricao: descricao, pessoa: pessoa, tipo: tipo, valor: valor } }, { multi: true }, function (err, numReplaced) {
                console.log(`Erros no updateConta >> ${err} Sucesso no updateConta >> ${numReplaced}`);
                return numReplaced;
            });
        });
    }
};
NeDBService = __decorate([
    common_1.Service(),
    __metadata("design:paramtypes", [])
], NeDBService);
exports.NeDBService = NeDBService;
//# sourceMappingURL=NeDBService.js.map