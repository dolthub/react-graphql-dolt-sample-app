import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DoltBranchesController } from "./doltBranch.controller";
import { DoltBranches } from "./doltBranch.entity";
import { DoltBranchesService } from "./doltBranch.service";

@Module({
  imports: [TypeOrmModule.forFeature([DoltBranches])],
  providers: [DoltBranchesService],
  controllers: [DoltBranchesController],
  exports: [DoltBranchesService],
})
export class DoltBranchesModule {}
