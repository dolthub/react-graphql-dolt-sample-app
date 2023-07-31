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
}
