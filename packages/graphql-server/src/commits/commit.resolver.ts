import { Args, ArgsType, Field, Query, Resolver } from "@nestjs/graphql";
import { DataSource } from "typeorm";
import { Commit, fromDoltLogsRow } from "./commit.model";

@ArgsType()
class TwoDotArgs {
  @Field()
  fromBranchName: string;

  @Field()
  toBranchName: string;
}

@Resolver((_of) => Commit)
export class CommitResolver {
  constructor(private readonly dataSource: DataSource) {}

  @Query((_returns) => [Commit])
  async twoDotLogs(@Args() args: TwoDotArgs): Promise<Commit[]> {
    const res = await this.dataSource.query("SELECT * FROM DOLT_LOG(?)", [
      `${args.toBranchName}..${args.fromBranchName}`,
    ]);
    if (!res.length) return [];
    return res.map(fromDoltLogsRow);
  }
}
