import { gql } from "@apollo/client";

export const PULL_LIST = gql`
  fragment PullListItem on Pull {
    pullId
    title
    creatorName
    createdAt
    state
  }
  query PullList {
    pulls {
      ...PullListItem
    }
  }
`;
