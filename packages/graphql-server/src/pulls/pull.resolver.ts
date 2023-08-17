import {
  Args,
  ArgsType,
  Field,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { DataSource } from "typeorm";
import { Commit } from "../commits/commit.model";
import { CommitResolver } from "../commits/commit.resolver";
import { FileStoreService } from "../fileStore/fileStore.service";
import { PullState } from "./pull.enums";
import { Pull } from "./pull.model";

@ArgsType()
class GetPullArgs {
  @Field((_type) => Int)
  pullId: number;
}

@ArgsType()
class CreatePullArgs {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  fromBranchName: string;

  @Field()
  toBranchName: string;

  @Field()
  creatorName: string;
}

@Resolver((_of) => Pull)
export class PullResolver {
  constructor(
    private readonly fileStore: FileStoreService,
    private readonly dataSource: DataSource,
    private readonly commitResolver: CommitResolver
  ) {}

  @Query((_returns) => Pull, { nullable: true })
  async pull(@Args() args: GetPullArgs): Promise<Pull | undefined> {
    const p = this.fileStore.readPull(args.pullId);
    if (!p) return undefined;
    return toPullModel(p);
  }

  @Query((_returns) => [Pull])
  async pulls(): Promise<Pull[]> {
    const pulls = await this.fileStore.readPulls();
    return pulls.map(toPullModel);
  }

  @ResolveField((_returns) => [Commit])
  async commits(@Parent() pull: Pull): Promise<Commit[]> {
    return this.commitResolver.twoDotLogs({
      fromBranchName: pull.fromBranchName,
      toBranchName: pull.toBranchName,
    });
  }

  @Mutation((_returns) => Pull)
  async createPull(@Args() args: CreatePullArgs): Promise<Pull> {
    const premergeToCommit = await this.hashOf(args.toBranchName);
    const premergeFromCommit = await this.hashOf(args.fromBranchName);
    const mergeBaseCommit = await this.mergeBase(
      args.fromBranchName,
      args.toBranchName
    );

    return this.fileStore.writePullToFile({
      ...args,
      createdAt: new Date(Date.now()),
      state: PullState.Open,
      premergeFromCommit,
      premergeToCommit,
      mergeBaseCommit,
    });
  }

  async hashOf(branch: string): Promise<string> {
    const colName = `HASHOF('${branch}')`;
    const res = await this.dataSource.query(`SELECT HASHOF(?)`, [branch]);
    return res[0][colName];
  }

  async mergeBase(fromBranch: string, toBranch: string): Promise<string> {
    const colName = `DOLT_MERGE_BASE('${fromBranch}', '${toBranch}')`;
    const res = await this.dataSource.query(`SELECT DOLT_MERGE_BASE(?, ?)`, [
      fromBranch,
      toBranch,
    ]);
    return res[0][colName];
  }
}

function toPullModel(p: any): Pull {
  return { ...p, createdAt: new Date(p.createdAt) };
}
