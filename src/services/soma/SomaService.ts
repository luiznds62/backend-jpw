import {Constant, Service} from "@tsed/common";

@Service()
export class SomaService {

  async somar(n1: number, n2: number){
    return n1 + n2;
  }
}