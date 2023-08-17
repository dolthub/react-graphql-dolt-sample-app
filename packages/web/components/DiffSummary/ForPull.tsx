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

  // Using the mergeBase as the fromCommitId gets the three dot diff
  const fromCommitId = res.data.pull.mergeBaseCommit;
  const toCommitId = res.data.pull.premergeFromCommit;

  return (
    <DiffSummary
      {...props}
      params={{
        fromRefName: fromCommitId,
        toRefName: toCommitId,
      }}
      getTableLink={(tn) => pullDiffTable(props.pullId, tn)}
    />
  );
}
