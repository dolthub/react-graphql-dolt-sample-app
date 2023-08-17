import { usePullListQuery } from "@gen/graphql-types";
import Link from "next/link";
import ReactLoader from "react-loader";

export default function PullList() {
  const res = usePullListQuery();
  if (res.loading) {
    return <ReactLoader loaded={false} />;
  }
  if (res.error) {
    return (
      <div className="error-msg">Error loading pulls: {res.error.message}</div>
    );
  }
  if (!res.data?.pulls.length) {
    return <div>No pulls found</div>;
  }

  return (
    <ul>
      {res.data.pulls.map((p) => (
        <li key={p.pullId}>
          <Link href="/pulls/[pullId]" as={`/pulls/${p.pullId}`}>
            {p.title} (#{p.pullId})
          </Link>{" "}
          - <span>{p.state}</span>
        </li>
      ))}
    </ul>
  );
}
