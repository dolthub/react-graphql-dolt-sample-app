import ReactLoader from "react-loader";
import { useListBranchesQuery } from "../../gen/graphql-types";
import Branch from "./Branch";

export default function BranchList() {
  const res = useListBranchesQuery();
  if (res.loading) {
    return <ReactLoader loaded={false} />;
  }
  if (res.error) {
    return <div>Error loading branches: {res.error.message}</div>;
  }
  if (!res.data?.branches.length) {
    return <div>No branches found</div>;
  }
  return (
    <ul>
      {res.data.branches.map((b) => (
        <Branch key={b.name} branch={b} />
      ))}
    </ul>
  );
}
