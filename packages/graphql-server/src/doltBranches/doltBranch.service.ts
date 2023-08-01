import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DoltBranches } from "./doltBranch.entity";

export class CreateBranchArgs {
  newBranchName: string;
  refName: string;
}

@Injectable()
export class DoltBranchesService {
  constructor(
    @InjectRepository(DoltBranches)
    private doltBranchesRepository: Repository<DoltBranches>
  ) {}

  findAll(): Promise<DoltBranches[]> {
    return this.doltBranchesRepository.find();
  }

  findOne(name: string): Promise<DoltBranches | null> {
    return this.doltBranchesRepository.findOneBy({ name });
  }

  // The `dolt_branch` system table does not support manual inserts or deletes. We must use
  // the stored procedure instead.
  async remove(name: string): Promise<boolean> {
    await this.doltBranchesRepository.query(
      `CALL DOLT_BRANCH('-d', '${name}')`
    );
    return true;
  }
}
