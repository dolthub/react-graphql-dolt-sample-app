import { Args, ArgsType, Field, Query, Resolver } from "@nestjs/graphql";
import { DataSource } from "typeorm";
import { Column, fromDoltRowRes } from "./column.model";

@ArgsType()
class TableArgs {
  @Field()
  tableName: string;

  @Field()
  refName: string;
}

@Resolver((_of) => Column)
export class ColumnResolver {
  constructor(private readonly dataSource: DataSource) {}

  @Query((_returns) => [Column])
  async columns(@Args() args: TableArgs): Promise<Column[]> {
    const res = await this.dataSource.query("DESCRIBE ?? AS OF ?", [
      args.tableName,
      args.refName,
    ]);
    // console.log("columns", res);
    return res.map(fromDoltRowRes);
  }
}
