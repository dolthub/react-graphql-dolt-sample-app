import { gql } from "@apollo/client";

export const GET_BRANCH = gql`
  fragment Branch on Branch {
    name
    hash
    latestCommitter
    latestCommitMessage
    latestCommitDate
  }
  query GetBranch($name: String!) {
    branch(name: $name) {
      ...Branch
    }
  }
`;

export const DELETE_BRANCH = gql`
  mutation DeleteBranch($name: String!) {
    deleteBranch(name: $name)
  }
`;
