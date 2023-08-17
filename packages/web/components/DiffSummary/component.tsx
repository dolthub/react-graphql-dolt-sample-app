import { DiffSummaryFragment, useDiffSummariesQuery } from "@gen/graphql-types";
import { Route } from "@lib/routes";
import ReactLoader from "react-loader";
import Row from "./Row";

type Props = {
  params: { fromRefName: string; toRefName: string };
  getTableLink: (tableName: string) => Route;
  activeTable?: string;
};

export default function DiffSummary(props: Props) {
  const res = useDiffSummariesQuery({ variables: props.params });
  if (res.loading) {
    return <ReactLoader loaded={false} />;
  }
  if (res.error) {
    return (
      <div className="error-msg">Error loading pull: {res.error.message}</div>
    );
  }
  if (!res.data?.diffSummaries) {
    return <div>Diff summaries not found</div>;
  }
  const activeTableName =
    props.activeTable ?? res.data.diffSummaries[0].tableName;

  return (
    <div>
      <h2>Diff Summary</h2>
      <table className="table">
        <thead>
          <tr>
            <th />
            <th>Table</th>
            <th>Data changes</th>
            <th>Schema changes</th>
          </tr>
        </thead>
        <tbody>
          {res.data.diffSummaries.map((ds) => (
            <Row
              key={ds.tableName}
              {...props}
              ds={ds}
              isActive={tableIsActive(ds, activeTableName)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function tableIsActive(ds: DiffSummaryFragment, activeTableName: string) {
  return (
    ds.fromTableName === activeTableName || ds.toTableName === activeTableName
  );
}
