import { Field, ObjectType } from "@nestjs/graphql";
import { Column } from "../columns/column.model";
import * as row from "../rows/row.model";

@ObjectType()
export class RowDiff {
  @Field((_type) => row.Row, { nullable: true })
  added?: row.Row;

  @Field((_type) => row.Row, { nullable: true })
  deleted?: row.Row;
}

@ObjectType()
export class RowDiffList {
  @Field((_type) => [RowDiff])
  list: RowDiff[];

  @Field((_type) => [Column])
  columns: Column[];
}

export function fromRowDiffRowsWithCols(
  cols: Column[],
  diffs: Array<Record<string, any>>
): RowDiffList {
  const rowDiffsList: RowDiff[] = diffs.map((rd) => {
    const addedVals: Array<string | null> = [];
    const deletedVals: Array<string | null> = [];
    cols.forEach((c) => {
      addedVals.push(rd[`to_${c.name}`]);
      deletedVals.push(rd[`from_${c.name}`]);
    });

    return { added: getDiffRow(addedVals), deleted: getDiffRow(deletedVals) };
  });

  return {
    list: rowDiffsList,
    columns: cols,
  };
}

export function fromOneSidedTable(
  rows: row.RowListWithCols,
  type: "added" | "dropped"
): RowDiffList {
  return {
    list: rows.list.map((r) =>
      type === "added" ? { added: r } : { deleted: r }
    ),
    columns: rows.columns,
  };
}

function getDiffRow(
  vals: Array<string | undefined | null>
): row.Row | undefined {
  if (vals.every((v) => v === null || v === undefined)) return undefined;
  return {
    columnValues: vals.map((v) => {
      return { displayValue: row.getCellValue(v) };
    }),
  };
}
