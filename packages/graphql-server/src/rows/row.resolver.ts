import { Args, ArgsType, Field, Query, Resolver } from "@nestjs/graphql";
import { ColumnResolver } from "src/columns/column.resolver";
import { DataSource } from "typeorm";
import { Row, RowListWithCols, fromDoltListRowWithColsRes } from "./row.model";

@ArgsType()
export class ListRowsArgs {
  @Field()
  refName: string;

  @Field()
  tableName: string;
}

@Resolver((_of) => Row)
export class RowResolver {
  constructor(
    private readonly dataSource: DataSource,
    private readonly columnResolver: ColumnResolver
  ) {}

  @Query((_returns) => RowListWithCols)
  async rowsForDiff(@Args() args: ListRowsArgs): Promise<RowListWithCols> {
    const columns = await this.columnResolver.columns(args);
    const rows = await this.dataSource.query("SELECT * FROM ?? AS OF ?", [
      args.tableName,
      args.refName,
    ]);
    return fromDoltListRowWithColsRes(rows, columns);
  }
}
