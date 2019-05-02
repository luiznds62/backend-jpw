import {
  Authenticated,
  BodyParams,
  Controller,
  Delete,
  Get,
  PathParams,
  Post,
  Put,
  Required,
  Status
} from "@tsed/common";
import {EventsCtrl} from "../events/EventsCtrl";
import { SomaService } from "../../services/soma/SomaService";

@Controller("/soma", EventsCtrl)
export class SomaCtrl {

  constructor(private somaService: SomaService){

  }

  @Post("/:n1/:n2")
  async update (@PathParams("n1") n1: number,
                @PathParams("n2") n2: number) {
                  return this.somaService.somar(n1,n2);
                }
}
