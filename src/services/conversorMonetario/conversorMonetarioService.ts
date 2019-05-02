import {Service} from "@tsed/common";
var axios = require('axios');
var valorConvertido = 0;

@Service()
export class ConversorMonetarioService {

  async converteMoedas(moedaOrigem: String, moedaDestino: String, valorConversao: number){
    var parametros = (`${moedaOrigem}_${moedaDestino}`).toUpperCase();
    var url = `https://free.currconv.com/api/v7/convert?q=${parametros}&compact=ultra&apiKey=5710634e81a8da6e9923`;
    axios.get(url).then(function(response){
        for (const key in response.data) {
          if (response.data.hasOwnProperty(key)) {
            var valorMoeda = response.data[key];
          }
        }
        setValorConvertido(valorConversao * valorMoeda);
    }); 
    return `Moeda origem: ${moedaOrigem}<br>Moeda destino: ${moedaDestino}<br>Valor origem:${valorConversao}<br>Valor convertido: ${valorConvertido}` 
  }
}

function setValorConvertido(valor){
  valorConvertido = valor;
}
