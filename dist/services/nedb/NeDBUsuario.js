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
    filename: 'usuario.json'
});
let NeDBUsuario = class NeDBUsuario {
    constructor() {
        db.loadDatabase(function (err) {
            if (err) {
                console.log(`Erros no database Usuario >> ${err}`);
            }
        });
    }
    getUsuarioByUsuario(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.find({ usuario: usuario }, function (err, doc) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(doc);
                    }
                });
            });
        });
    }
    create(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.insert(usuario, function (err, newDoc) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(`${newDoc} - Usuário criado com sucesso!`);
                    }
                });
            });
        });
    }
    findAllDocuments() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.find({}, function (err, docs) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(docs);
                    }
                });
            });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.find({ _id: id }, function (err, doc) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(doc);
                    }
                });
            });
        });
    }
    updateUsuario(id, usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.update({ _id: id }, usuario, function (err, numReplaced) {
                    if (err) {
                        reject(err);
                    }
                    resolve(`${numReplaced} - Usuário alterado com sucesso!`);
                });
            });
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                db.remove({ _id: id }, {}, function (err, numRemoved) {
                    if (err) {
                        reject(err);
                    }
                    resolve(`${numRemoved} - Usuário removido com sucesso!`);
                });
            });
        });
    }
};
NeDBUsuario = __decorate([
    common_1.Service(),
    __metadata("design:paramtypes", [])
], NeDBUsuario);
exports.NeDBUsuario = NeDBUsuario;
//# sourceMappingURL=NeDBUsuario.js.map