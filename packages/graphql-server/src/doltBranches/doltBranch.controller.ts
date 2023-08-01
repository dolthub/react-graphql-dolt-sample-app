import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { DoltBranches } from "./doltBranch.entity";
import { CreateBranchArgs, DoltBranchesService } from "./doltBranch.service";

@Controller("doltBranches")
export class DoltBranchesController {
  constructor(private readonly doltBranchesService: DoltBranchesService) {}

  @Get()
  findAll(): Promise<DoltBranches[]> {
    return this.doltBranchesService.findAll();
  }

  @Get(":name")
  findOne(@Param("name") name: string): Promise<DoltBranches | null> {
    return this.doltBranchesService.findOne(name);
  }

  @Post()
  create(@Body() args: CreateBranchArgs): Promise<boolean> {
    return this.doltBranchesService.create(args);
  }

  @Delete(":name")
  remove(@Param("name") name: string): Promise<boolean> {
    return this.doltBranchesService.remove(name);
  }
}
