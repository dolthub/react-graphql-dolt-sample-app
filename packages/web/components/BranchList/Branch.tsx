import ReactTimeago from "react-timeago";
import { BranchFragment } from "../../gen/graphql-types";

type Props = {
  branch: BranchFragment;
};

export default function Branch({ branch }: Props) {
  return (
    <li key={branch.name} className="branch">
      <span className="branch-name">{branch.name}</span>
      <span className="commit-info">
        <span>Hash: {branch.hash}</span>
        <span>Latest Committer: {branch.latestCommitter}</span>
        <span>
          Latest Commit Message: {branch.latestCommitMessage.slice(0, 200)}
          {branch.latestCommitMessage.length > 200 && "..."}
        </span>
        <span>
          Latest Commit Date: <ReactTimeago date={branch.latestCommitDate} />
        </span>
      </span>
    </li>
  );
}
