import {
    Controller,
    PathParams,
    Post,
  } from "@tsed/common";
  import {EventsCtrl} from "../events/EventsCtrl";
  import {ImcService} from "../../services/imc/ImcService";
    
  @Controller("/imc", EventsCtrl)
  export class ImcCtrl {
  
    constructor(private imcService: ImcService){
  
    }
  
    @Post("/:peso/:altura")
    async update (@PathParams("peso") peso: number, @PathParams("altura") altura: number) {
        return this.imcService.calcularImc(peso,altura);
    }
  }
  