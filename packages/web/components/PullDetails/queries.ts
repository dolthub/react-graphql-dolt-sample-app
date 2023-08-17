import { gql } from "@apollo/client";

export const GET_PULL = gql`
  fragment Commit on Commit {
    commitHash
    committer
    date
    message
  }
  fragment Pull on Pull {
    pullId
    title
    description
    creatorName
    fromBranchName
    toBranchName
    createdAt
    state
    premergeFromCommit
    premergeToCommit
    mergeBaseCommit
    commits {
      ...Commit
    }
  }
  query GetPull($pullId: Int!) {
    pull(pullId: $pullId) {
      ...Pull
    }
  }
`;
