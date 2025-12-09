import { Controller, Get, Param } from "@nestjs/common";
import { ScenariosService, Scenario } from "./scenarios.service";

@Controller("scenarios")
export class ScenariosController {
  constructor(private readonly scenariosService: ScenariosService) {}

  @Get()
  findAll(): Scenario[] {
    return this.scenariosService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Scenario | undefined {
    return this.scenariosService.findOne(id);
  }
}
