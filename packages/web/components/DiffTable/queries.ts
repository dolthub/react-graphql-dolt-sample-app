import { gql } from "@apollo/client";

export const ROW_DIFFS = gql`
  fragment Column on Column {
    name
    isPrimaryKey
    type
  }
  fragment ColumnValue on ColumnValue {
    displayValue
  }
  fragment Row on Row {
    columnValues {
      ...ColumnValue
    }
  }
  fragment RowDiff on RowDiff {
    added {
      ...Row
    }
    deleted {
      ...Row
    }
  }
  fragment RowDiffListWithCols on RowDiffList {
    list {
      ...RowDiff
    }
    columns {
      ...Column
    }
  }
  query RowDiffs(
    $tableName: String!
    $fromRefName: String!
    $toRefName: String!
  ) {
    rowDiffs(
      tableName: $tableName
      fromRefName: $fromRefName
      toRefName: $toRefName
    ) {
      ...RowDiffListWithCols
    }
  }
`;
