import { useGetPullQuery } from "@gen/graphql-types";
import { branch } from "@lib/routes";
import Link from "next/link";
import ReactLoader from "react-loader";
import CommitList from "./CommitList";

type Props = {
  pullId: number;
};

export default function PullDetails(props: Props) {
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

  const { pull } = res.data;
  return (
    <div>
      <h2>{res.data.pull.title}</h2>
      <div>{pull.state}</div>
      <div>
        <span>{pull.creatorName}</span> wants to merge commits into{" "}
        <Link {...branch(pull.toBranchName)}>{pull.toBranchName}</Link> from{" "}
        <Link {...branch(pull.fromBranchName)}>{pull.fromBranchName}</Link>
      </div>
      <p>{pull.description}</p>
      <div>
        <Link
          href="/pulls/[pullId]/compare"
          as={`/pulls/${props.pullId}/compare`}
        >
          View diff
        </Link>
      </div>
      <CommitList commits={pull.commits ?? undefined} />
    </div>
  );
}
