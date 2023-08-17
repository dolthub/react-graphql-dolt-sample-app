import { useRowDiffsQuery } from "@gen/graphql-types";
import ReactLoader from "react-loader";
import Row from "./Row";

type Props = {
  params: { fromRefName: string; toRefName: string; tableName: string };
};

function Inner(props: Props) {
  const res = useRowDiffsQuery({ variables: props.params });
  if (res.loading) {
    return <ReactLoader loaded={false} />;
  }
  if (res.error) {
    return (
      <div className="error-msg">
        Error loading row diffs: {res.error.message}
      </div>
    );
  }

  if (!res.data?.rowDiffs.list.length) {
    return <div>No data changes found</div>;
  }
  const { rowDiffs } = res.data;
  return (
    <table className="table">
      <thead>
        <tr>
          <th />
          {rowDiffs.columns.map((c) => (
            <th key={c.name}>{c.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rowDiffs.list.map((rd) => (
          // eslint-disable-next-line react/jsx-key
          <Row rowDiff={rd} cols={rowDiffs.columns} />
        ))}
      </tbody>
    </table>
  );
}

export default function DiffTable(props: Props) {
  return (
    <div>
      <h2>{props.params.tableName}</h2>
      <Inner {...props} />
    </div>
  );
}
