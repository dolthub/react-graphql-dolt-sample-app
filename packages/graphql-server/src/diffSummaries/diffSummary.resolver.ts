import { Args, ArgsType, Field, Query, Resolver } from "@nestjs/graphql";
import { DataSource } from "typeorm";
import { DiffSummary, fromDoltDiffSummary } from "./diffSummary.model";

@ArgsType()
class DiffSummaryArgs {
  @Field()
  fromRefName: string;

  @Field()
  toRefName: string;
}

@ArgsType()
class TableDiffSummaryArgs extends DiffSummaryArgs {
  @Field()
  tableName: string;
}

@Resolver((_of) => DiffSummary)
export class DiffSummaryResolver {
  constructor(private readonly dataSource: DataSource) {}

  @Query((_returns) => [DiffSummary])
  async diffSummaries(@Args() args: DiffSummaryArgs): Promise<DiffSummary[]> {
    const res = await this.dataSource.query(
      "SELECT * FROM DOLT_DIFF_SUMMARY(?, ?)",
      [args.fromRefName, args.toRefName]
    );
    return res.map(fromDoltDiffSummary).sort(sortByTableName);
  }

  @Query((_returns) => DiffSummary, { nullable: true })
  async tableDiffSummary(
    @Args() args: TableDiffSummaryArgs
  ): Promise<DiffSummary | undefined> {
    const res = await this.dataSource.query(
      "SELECT * FROM DOLT_DIFF_SUMMARY(?, ?, ?)",
      [args.fromRefName, args.toRefName, args.tableName]
    );
    if (!res.length) return undefined;
    return fromDoltDiffSummary(res[0]);
  }
}

function sortByTableName(a: DiffSummary, b: DiffSummary) {
  if (a.toTableName.length && b.toTableName.length) {
    return a.toTableName.localeCompare(b.toTableName);
  }
  return a.fromTableName.localeCompare(b.fromTableName);
}
