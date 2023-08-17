import { gql } from "@apollo/client";

export const CREATE_PULL = gql`
  mutation CreatePull(
    $fromBranchName: String!
    $toBranchName: String!
    $title: String!
    $description: String!
    $creatorName: String!
  ) {
    createPull(
      fromBranchName: $fromBranchName
      toBranchName: $toBranchName
      title: $title
      description: $description
      creatorName: $creatorName
    ) {
      ...PullListItem
    }
  }
`;
