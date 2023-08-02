import {
  BranchFragment,
  ListBranchesDocument,
  useDeleteBranchMutation,
  useGetBranchQuery,
} from "@gen/graphql-types";
import { useRouter } from "next/router";
import ReactLoader from "react-loader";
import ReactTimeago from "react-timeago";

type Props = {
  name: string;
};

export default function Branch({ name }: Props) {
  const res = useGetBranchQuery({ variables: { name } });
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
  if (!res.data?.branch) {
    return <div>Branch not found</div>;
  }
  return <Inner branch={res.data.branch} />;
}

type InnerProps = {
  branch: BranchFragment;
};

function Inner({ branch }: InnerProps) {
  const router = useRouter();
  const [deleteBranch, deleteRes] = useDeleteBranchMutation();

  const onDelete = async () => {
    try {
      await deleteBranch({
        variables: { name: branch.name },
        refetchQueries: [{ query: ListBranchesDocument }],
      });
      router.push("/branches");
    } catch (_) {
      // displayed by deleteRes.error
    }
  };

  return (
    <div className="branch">
      <span className="branch-name">{branch.name}</span>
      <span className="commit-info">
        <span>Hash: {branch.hash}</span>
        <span>Latest Committer: {branch.latestCommitter}</span>
        <span>Latest Commit Message: {branch.latestCommitMessage}</span>
        <span>
          Latest Commit Date: <ReactTimeago date={branch.latestCommitDate} />
        </span>
      </span>
      <button onClick={onDelete} type="button">
        Delete Branch
      </button>
      <ReactLoader loaded={!deleteRes.loading} />
      {deleteRes.error && (
        <div className="error-msg">
          Error deleting branch: {deleteRes.error.message}
        </div>
      )}
    </div>
  );
}
