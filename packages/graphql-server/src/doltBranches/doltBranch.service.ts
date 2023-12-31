import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DoltBranches } from "./doltBranch.entity";

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

  // The `dolt_branch` system table does not support inserts or deletes. We must use
  // the stored procedure instead.
  async remove(name: string): Promise<void> {
    await this.doltBranchesRepository.query(`CALL DOLT_BRANCH('-d', ?)`, [
      name,
    ]);
  }

  async create(fromRefName: string, newBranchName: string): Promise<void> {
    await this.doltBranchesRepository.query(`CALL DOLT_BRANCH('-c', ?, ?)`, [
      fromRefName,
      newBranchName,
    ]);
  }
}
