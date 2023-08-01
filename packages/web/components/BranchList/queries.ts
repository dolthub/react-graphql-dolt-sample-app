import { gql } from "@apollo/client";

export const LIST_BRANCHES = gql`
  query ListBranches {
    branches {
      name
    }
  }
`;
