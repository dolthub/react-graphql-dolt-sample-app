import { gql } from "@apollo/client";

export const LIST_BRANCHES = gql`
  fragment Branch on Branch {
    name
    hash
    latestCommitter
    latestCommitMessage
    latestCommitDate
  }
  query ListBranches {
    branches {
      ...Branch
    }
  }
`;
