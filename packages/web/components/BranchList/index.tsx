import { useListBranchesQuery } from "@gen/graphql-types";
import Link from "next/link";
import ReactLoader from "react-loader";

export default function BranchList() {
  const res = useListBranchesQuery();
  if (res.loading) {
    return <ReactLoader loaded={false} />;
  }
  if (res.error) {
    return (
      <div className="error-msg">
        Error loading branches: {res.error.message}
      </div>
    );
  }
  if (!res.data?.branches.length) {
    return <div>No branches found</div>;
  }
  return (
    <ul>
      {res.data.branches.map((b) => (
        <li key={b.name}>
          <Link
            href="/branches/[name]"
            as={`/branches/${encodeURIComponent(b.name)}`}
          >
            {b.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
