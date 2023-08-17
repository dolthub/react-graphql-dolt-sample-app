import { Args, ArgsType, Field, Query, Resolver } from "@nestjs/graphql";
import { DataSource } from "typeorm";
import { ColumnResolver } from "../columns/column.resolver";
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
