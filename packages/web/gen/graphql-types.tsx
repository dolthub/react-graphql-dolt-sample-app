import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Timestamp: { input: any; output: any; }
};

export type Branch = {
  __typename?: 'Branch';
  hash: Scalars['String']['output'];
  latestCommitDate: Scalars['Timestamp']['output'];
  latestCommitMessage: Scalars['String']['output'];
  latestCommitter: Scalars['String']['output'];
  latestCommitterEmail: Scalars['String']['output'];
  name: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  branches: Array<Branch>;
};

export type BranchFragment = { __typename?: 'Branch', name: string, hash: string, latestCommitter: string, latestCommitMessage: string, latestCommitDate: any };

export type ListBranchesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListBranchesQuery = { __typename?: 'Query', branches: Array<{ __typename?: 'Branch', name: string, hash: string, latestCommitter: string, latestCommitMessage: string, latestCommitDate: any }> };

export const BranchFragmentDoc = gql`
    fragment Branch on Branch {
  name
  hash
  latestCommitter
  latestCommitMessage
  latestCommitDate
}
    `;
export const ListBranchesDocument = gql`
    query ListBranches {
  branches {
    ...Branch
  }
}
    ${BranchFragmentDoc}`;

/**
 * __useListBranchesQuery__
 *
 * To run a query within a React component, call `useListBranchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListBranchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListBranchesQuery({
 *   variables: {
 *   },
 * });
 */
export function useListBranchesQuery(baseOptions?: Apollo.QueryHookOptions<ListBranchesQuery, ListBranchesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListBranchesQuery, ListBranchesQueryVariables>(ListBranchesDocument, options);
      }
export function useListBranchesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListBranchesQuery, ListBranchesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListBranchesQuery, ListBranchesQueryVariables>(ListBranchesDocument, options);
        }
export type ListBranchesQueryHookResult = ReturnType<typeof useListBranchesQuery>;
export type ListBranchesLazyQueryHookResult = ReturnType<typeof useListBranchesLazyQuery>;
export type ListBranchesQueryResult = Apollo.QueryResult<ListBranchesQuery, ListBranchesQueryVariables>;