import { Field, ObjectType } from "@nestjs/graphql";
import * as columns from "../columns/column.model";

// Using an unprintable string for null values so we can distinguish between
// string "null" and null
export const NULL_VALUE = "\uf5f2\ueb94NULL\uf5a8\ue6ff";

@ObjectType()
export class ColumnValue {
  @Field()
  displayValue: string;
}

@ObjectType()
export class Row {
  @Field((_type) => [ColumnValue])
  columnValues: ColumnValue[];
}

@ObjectType()
export class RowList {
  @Field((_type) => [Row])
  list: Row[];
}

@ObjectType()
export class RowListWithCols extends RowList {
  @Field((_type) => [columns.Column])
  columns: columns.Column[];
}

export function getCellValue(value: any): string {
  if (value === null || value === undefined) {
    return NULL_VALUE;
  }
  if (value === '""') {
    return "";
  }
  if (typeof value === "object") {
    // if (Object.prototype.toString.call(value) === "[object Date]") {
    //   return convertDateToUTCDatetimeString(value);
    // }
    if (Buffer.isBuffer(value)) {
      return value.toString("utf8");
    }
    return JSON.stringify(value);
  }

  return value;
}

export function fromDoltRowRes(row: Record<string, any>): Row {
  return {
    columnValues: Object.values(row).map((cell) => {
      return { displayValue: getCellValue(cell) };
    }),
  };
}

export function fromDoltListRowWithColsRes(
  rows: Array<Record<string, any>>,
  cols: columns.Column[]
): RowListWithCols {
  return {
    list: rows.map(fromDoltRowRes),
    columns: cols,
  };
}
