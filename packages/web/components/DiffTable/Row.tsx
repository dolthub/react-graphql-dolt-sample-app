import {
  ColumnFragment,
  ColumnValueFragment,
  RowDiffFragment,
} from "@gen/graphql-types";

type Props = {
  rowDiff: RowDiffFragment;
  cols: ColumnFragment[];
};

export default function Row(props: Props) {
  const { added, deleted } = props.rowDiff;
  const deletedRow = !!deleted && (
    <tr className={!added ? "deleted-row" : ""}>
      <td className="deleted-cell">-</td>
      {deleted.columnValues.map((c, i) => {
        const changed = cellChanged(c.displayValue, i, added?.columnValues);
        return (
          <td
            key={`deleted-${c.displayValue}`}
            className={changed ? "deleted-cell" : ""}
          >
            {c.displayValue}
          </td>
        );
      })}
    </tr>
  );

  const addedRow = !!added && (
    <tr className={!deleted ? "added-row" : ""}>
      <td className="added-cell">+</td>
      {added.columnValues.map((c, i) => {
        const changed = cellChanged(c.displayValue, i, deleted?.columnValues);
        return (
          <td
            key={`added-${c.displayValue}`}
            className={changed ? "added-cell" : ""}
          >
            {c.displayValue}
          </td>
        );
      })}
    </tr>
  );

  return (
    <>
      {deletedRow}
      {addedRow}
    </>
  );
}

function cellChanged(
  val: string,
  cellIdx: number,
  otherVals?: ColumnValueFragment[]
): boolean {
  if (!otherVals) return true;
  const otherVal = otherVals[cellIdx];
  return val !== otherVal.displayValue;
}
