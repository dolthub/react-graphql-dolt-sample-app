import { gql } from "@apollo/client";

export const GET_PULL = gql`
  query GetPull($pullId: Int!) {
    pull(pullId: $pullId) {
      ...Pull
    }
  }
`;
