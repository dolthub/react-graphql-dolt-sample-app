import { Controller, Get } from "@nestjs/common";
import { DoltBranches } from "./doltBranch.entity";
import { DoltBranchesService } from "./doltBranch.service";

@Controller("doltBranches")
export class DoltBranchesController {
  constructor(private readonly doltBranchesService: DoltBranchesService) {}

  @Get()
  findAll(): Promise<DoltBranches[]> {
    return this.doltBranchesService.findAll();
  }
}
