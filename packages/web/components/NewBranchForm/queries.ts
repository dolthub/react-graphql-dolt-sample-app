import { gql } from "@apollo/client";

export const CREATE_BRANCH = gql`
  mutation CreateBranch($newBranchName: String!, $fromRefName: String!) {
    createBranch(newBranchName: $newBranchName, fromRefName: $fromRefName)
  }
`;
