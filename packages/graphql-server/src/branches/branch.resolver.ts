import {
  Args,
  ArgsType,
  Field,
  Mutation,
  Query,
  Resolver,
} from "@nestjs/graphql";
import { DoltBranchesService } from "../doltBranches/doltBranch.service";
import { Branch, fromDoltBranchesRow } from "./branch.model";

@ArgsType()
class GetBranchArgs {
  @Field()
  name: string;
}

@ArgsType()
class CreateBranchArgs {
  @Field()
  newBranchName: string;

  @Field()
  fromRefName: string;
}

@Resolver((_of) => Branch)
export class BranchResolver {
  constructor(private doltBranchService: DoltBranchesService) {}

  @Query((_returns) => [Branch])
  async branches(): Promise<Branch[]> {
    const branches = await this.doltBranchService.findAll();
    return branches.map(fromDoltBranchesRow);
  }

  @Query((_returns) => Branch, { nullable: true })
  async branch(@Args() args: GetBranchArgs): Promise<Branch | undefined> {
    const branch = await this.doltBranchService.findOne(args.name);
    if (!branch) return undefined;
    return fromDoltBranchesRow(branch);
  }

  @Mutation((_returns) => Boolean)
  async deleteBranch(@Args() args: GetBranchArgs): Promise<boolean> {
    await this.doltBranchService.remove(args.name);
    return true;
  }

  @Mutation((_returns) => Boolean)
  async createBranch(@Args() args: CreateBranchArgs): Promise<boolean> {
    await this.doltBranchService.create(args.newBranchName, args.fromRefName);
    return true;
  }
}
