import {Service} from "@tsed/common";

@Service()
export class ConversorCSVService{

    async geraCsvUsuario(dadosJson){
        const { Parser } = require('json2csv');
        const fields = ['id', 'usuario', 'senha', 'email', '_id'];
        
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(dadosJson);

        return csv
    }

    async geraCsvVenda(dadosJson){
        const { Parser } = require('json2csv');
        const fields = ['id', 'produto', 'usuarioCadastro', 'quantidade', 'valorTotal', 'valorTotalDolar', '_id'];
        
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(dadosJson);

        return csv
    }

    async geraCsvProduto(dadosJson){
        const { Parser } = require('json2csv');
        const fields = ['id', 'nome', 'descricao', 'marca',
         'valorUnitario', 'valorUnitarioDolar', 'origem', 'usuarioCadastro','_id'];
        
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(dadosJson);

        return csv
    }
}