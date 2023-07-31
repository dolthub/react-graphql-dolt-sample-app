import { Query, Resolver } from "@nestjs/graphql";
import { DoltBranchesService } from "../doltBranches/doltBranch.service";
import { Branch, fromDoltBranchesRow } from "./branch.model";

@Resolver((_of) => Branch)
export class BranchResolver {
  constructor(private doltBranchService: DoltBranchesService) {}

  @Query((_returns) => [Branch])
  async branches(): Promise<Branch[]> {
    const branches = await this.doltBranchService.findAll();
    return branches.map(fromDoltBranchesRow);
  }
}
