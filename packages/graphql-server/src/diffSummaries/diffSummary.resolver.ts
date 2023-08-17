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
}

function sortByTableName(a: DiffSummary, b: DiffSummary) {
  if (a.toTableName.length && b.toTableName.length) {
    return a.toTableName.localeCompare(b.toTableName);
  }
  return a.fromTableName.localeCompare(b.fromTableName);
}
