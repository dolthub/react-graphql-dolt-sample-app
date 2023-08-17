import { gql } from "@apollo/client";

export const DIFF_SUMMARY = gql`
  fragment DiffSummary on DiffSummary {
    fromTableName
    toTableName
    tableName
    tableType
    hasDataChanges
    hasSchemaChanges
  }
  query DiffSummaries($fromRefName: String!, $toRefName: String!) {
    diffSummaries(fromRefName: $fromRefName, toRefName: $toRefName) {
      ...DiffSummary
    }
  }
`;
