import { CommitFragment } from "@gen/graphql-types";

type Props = {
  commits?: CommitFragment[];
};

export default function CommitList(props: Props) {
  return (
    <div>
      <h3>Commits</h3>
      {props.commits?.length ? (
        <ul>
          {props.commits.map((commit) => (
            <li key={commit.commitHash}>
              {commit.message} ({commit.commitHash.slice(0, 7)})
            </li>
          ))}
        </ul>
      ) : (
        <div>No commits</div>
      )}
    </div>
  );
}
