import { Args, ArgsType, Field, Query, Resolver } from "@nestjs/graphql";
import { DataSource } from "typeorm";
import { ColumnResolver } from "../columns/column.resolver";
import { TableDiffType } from "../diffSummaries/diffSummary.enums";
import { DiffSummaryResolver } from "../diffSummaries/diffSummary.resolver";
import { RowResolver } from "../rows/row.resolver";
import {
  RowDiff,
  RowDiffList,
  fromOneSidedTable,
  fromRowDiffRowsWithCols,
} from "./rowDiff.model";
import { unionCols } from "./utils";

@ArgsType()
class ListRowDiffsArgs {
  // Uses resolved commits
  @Field({ nullable: true })
  fromRefName: string;

  @Field({ nullable: true })
  toRefName: string;

  @Field()
  tableName: string;
}

@Resolver((_of) => RowDiff)
export class RowDiffResolver {
  constructor(
    private readonly dataSource: DataSource,
    private readonly columnResolver: ColumnResolver,
    private readonly rowResolver: RowResolver,
    private readonly diffSummaryResolver: DiffSummaryResolver
  ) {}

  @Query((_returns) => RowDiffList)
  async rowDiffs(
    @Args()
    args: ListRowDiffsArgs
  ): Promise<RowDiffList> {
    const ds = await this.diffSummaryResolver.tableDiffSummary(args);
    if (!ds) {
      throw new Error(`Could not get summary for table "${args.tableName}"`);
    }

    const { tableType, fromTableName, toTableName } = ds;

    if (tableType === TableDiffType.Dropped) {
      const rows = await this.rowResolver.rowsForDiff({
        tableName: args.tableName,
        refName: args.fromRefName,
      });
      return fromOneSidedTable(rows, "dropped");
    }
    if (tableType === TableDiffType.Added) {
      const rows = await this.rowResolver.rowsForDiff({
        tableName: args.tableName,
        refName: args.toRefName,
      });
      return fromOneSidedTable(rows, "added");
    }

    const oldCols = await this.columnResolver.columns({
      refName: args.fromRefName,
      tableName: fromTableName,
    });
    const newCols = await this.columnResolver.columns({
      refName: args.toRefName,
      tableName: toTableName,
    });

    const colsUnion = unionCols(oldCols, newCols);

    const diffs = await this.dataSource.query(
      "SELECT * FROM DOLT_DIFF(?, ?, ?)",
      [args.fromRefName, args.toRefName, args.tableName]
    );

    return fromRowDiffRowsWithCols(colsUnion, diffs);
  }
}
