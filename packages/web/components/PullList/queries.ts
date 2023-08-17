import { gql } from "@apollo/client";

export const PULL_LIST = gql`
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
  }
  query PullList {
    pulls {
      ...Pull
    }
  }
`;
