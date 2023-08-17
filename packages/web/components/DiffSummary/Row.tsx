import { DiffSummaryFragment, TableDiffType } from "@gen/graphql-types";
import { Route } from "@lib/routes";
import { GoDiffAdded } from "@react-icons/all-files/go/GoDiffAdded";
import { GoDiffModified } from "@react-icons/all-files/go/GoDiffModified";
import { GoDiffRemoved } from "@react-icons/all-files/go/GoDiffRemoved";
import { GoDiffRenamed } from "@react-icons/all-files/go/GoDiffRenamed";
import Link from "next/link";

type Props = {
  ds: DiffSummaryFragment;
  getTableLink: (tableName: string) => Route;
  isActive: boolean;
};

export default function Row(props: Props) {
  return (
    <tr>
      <td>
        <StatIcon tableType={props.ds.tableType} />
      </td>
      <td>
        <TableName {...props} />
      </td>
      <td>{String(props.ds.hasDataChanges)}</td>
      <td>{String(props.ds.hasSchemaChanges)}</td>
    </tr>
  );
}

function TableName(props: Props) {
  const displayedTableName =
    props.ds.tableType === TableDiffType.Renamed
      ? `${props.ds.fromTableName} → ${props.ds.toTableName}`
      : props.ds.tableName;

  return props.isActive ? (
    <span>{displayedTableName}</span>
  ) : (
    <Link {...props.getTableLink(props.ds.tableName)}>
      {displayedTableName}
    </Link>
  );
}

function StatIcon({ tableType }: { tableType: TableDiffType }) {
  switch (tableType) {
    case TableDiffType.Added:
      return <GoDiffAdded className="green-text" />;
    case TableDiffType.Dropped:
      return <GoDiffRemoved className="red-text" />;
    case TableDiffType.Renamed:
      return <GoDiffRenamed className="grey-text" />;
    default:
      return <GoDiffModified className="yellow-text" />;
  }
}
