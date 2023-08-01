import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DoltBranches } from "./doltBranch.entity";
import { DoltBranchesService } from "./doltBranch.service";

@Module({
  imports: [TypeOrmModule.forFeature([DoltBranches])],
  providers: [DoltBranchesService],
  exports: [DoltBranchesService],
})
export class DoltBranchesModule {}
