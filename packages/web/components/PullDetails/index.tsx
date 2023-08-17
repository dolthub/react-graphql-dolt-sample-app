import { useGetPullQuery } from "@gen/graphql-types";
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
  const branchHref = "/branches/[name]";
  return (
    <div>
      <h2>{res.data.pull.title}</h2>
      <div>{pull.state}</div>
      <div>
        <span>{pull.creatorName}</span> wants to merge commits into{" "}
        <Link href={branchHref} as={`/branches/${pull.toBranchName}`}>
          {pull.toBranchName}
        </Link>{" "}
        from{" "}
        <Link href={branchHref} as={`/branches/${pull.fromBranchName}`}>
          {pull.fromBranchName}
        </Link>
      </div>
      <p>{pull.description}</p>
      <CommitList commits={pull.commits ?? undefined} />
    </div>
  );
}
