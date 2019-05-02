import {Service} from "@tsed/common";

@Service()
export class ImcService {

  async calcularImc(peso: number, altura: number){
    var imc = peso / (altura * 2);
    if (imc < 17){
      return `IMC: ${imc} - Muito abaixo do peso`;
    }
    if (imc > 17 && imc < 18.5){
      return `IMC: ${imc} - Abaixo do peso`;
    }
    if (imc > 18.5 && imc < 25){
      return `IMC: ${imc} - Peso normal`;
    }
    if (imc > 25 && imc < 30){
      return `IMC: ${imc} - Acima do peso`;
    }
    if (imc > 30 && imc < 35){
      return `IMC: ${imc} - Obesidade I`;
    }
    if (imc > 35 && imc < 40){
      return `IMC: ${imc} - Obesidade II(Severa)`;
    }
    if (imc > 40){
      return `IMC: ${imc} - Obesidade III(Mórbida)`;
    }
  }
}