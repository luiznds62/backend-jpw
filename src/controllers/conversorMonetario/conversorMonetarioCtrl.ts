import {
    Controller,
    PathParams,
    Get,
  } from "@tsed/common";
  import {EventsCtrl} from "../events/EventsCtrl";
  import {ConversorMonetarioService} from "../../services/conversorMonetario/conversorMonetarioService";
    
  @Controller("/conversorMonetario", EventsCtrl)
  export class conversorMonetario {
  
    constructor(private conversorMonetarioService: ConversorMonetarioService){
  
    }
  
    @Get("/:moedaOrigem/:moedaDestino/:valorConversao")
    async get (@PathParams("moedaOrigem") moedaOrigem: String,
                  @PathParams("moedaDestino") moedaDestino: String,
                  @PathParams("valorConversao") valorConversao: number) {
        return this.conversorMonetarioService.converteMoedas(moedaOrigem,moedaDestino,valorConversao);
    }
  }
  