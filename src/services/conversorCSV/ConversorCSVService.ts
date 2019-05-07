import {Service} from "@tsed/common";

@Service()
export class ConversorCSVService{

    async converteJsonToCsv(dadosJson: Object[]){
        const { Parser } = require('json2csv');
        const fields = ['id', 'usuario', 'senha', 'email', '_id'];
        
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(dadosJson);
        
        console.log(csv);
        return csv
    }
}