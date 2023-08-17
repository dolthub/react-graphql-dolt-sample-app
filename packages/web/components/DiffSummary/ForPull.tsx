import { useGetPullQuery } from "@gen/graphql-types";
import { pullDiffTable } from "@lib/routes";
import ReactLoader from "react-loader";
import DiffSummary from "./component";

type Props = {
  pullId: number;
  activeTable?: string;
};

export default function ForPull(props: Props) {
  const res = useGetPullQuery({ variables: { pullId: props.pullId } });
  if (res.loading) {
    return <ReactLoader loaded={false} />;
  }
  if (res.error) {
    return (
      <div className="error-msg">Error loading pull: {res.error.message}</div>
    );
  }
  if (!res.data?.pull) {
    return <div>Pull #{props.pullId} not found</div>;
  }

  return (
    <DiffSummary
      {...props}
      params={{
        fromRefName: res.data.pull.fromBranchName,
        toRefName: res.data.pull.toBranchName,
      }}
      getTableLink={(tn) => pullDiffTable(props.pullId, tn)}
    />
  );
}
