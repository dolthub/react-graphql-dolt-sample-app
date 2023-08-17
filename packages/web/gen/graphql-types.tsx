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

export type Commit = {
  __typename?: 'Commit';
  commitHash: Scalars['String']['output'];
  committer: Scalars['String']['output'];
  committerEmail: Scalars['String']['output'];
  date: Scalars['Timestamp']['output'];
  message: Scalars['String']['output'];
};

export type DiffSummary = {
  __typename?: 'DiffSummary';
  fromTableName: Scalars['String']['output'];
  hasDataChanges: Scalars['Boolean']['output'];
  hasSchemaChanges: Scalars['Boolean']['output'];
  tableName: Scalars['String']['output'];
  tableType: TableDiffType;
  toTableName: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBranch: Scalars['Boolean']['output'];
  createPull: Pull;
  deleteBranch: Scalars['Boolean']['output'];
};


export type MutationCreateBranchArgs = {
  fromRefName: Scalars['String']['input'];
  newBranchName: Scalars['String']['input'];
};


export type MutationCreatePullArgs = {
  creatorName: Scalars['String']['input'];
  description: Scalars['String']['input'];
  fromBranchName: Scalars['String']['input'];
  title: Scalars['String']['input'];
  toBranchName: Scalars['String']['input'];
};


export type MutationDeleteBranchArgs = {
  name: Scalars['String']['input'];
};

export type Pull = {
  __typename?: 'Pull';
  commits?: Maybe<Array<Commit>>;
  createdAt: Scalars['Timestamp']['output'];
  creatorName: Scalars['String']['output'];
  description: Scalars['String']['output'];
  fromBranchName: Scalars['String']['output'];
  mergeBaseCommit: Scalars['String']['output'];
  premergeFromCommit: Scalars['String']['output'];
  premergeToCommit: Scalars['String']['output'];
  pullId: Scalars['Int']['output'];
  state: PullState;
  title: Scalars['String']['output'];
  toBranchName: Scalars['String']['output'];
};

export enum PullState {
  Closed = 'Closed',
  Merged = 'Merged',
  Open = 'Open',
  Unspecified = 'Unspecified'
}

export type Query = {
  __typename?: 'Query';
  branch?: Maybe<Branch>;
  branches: Array<Branch>;
  diffSummaries: Array<DiffSummary>;
  pull?: Maybe<Pull>;
  pulls: Array<Pull>;
  twoDotLogs: Array<Commit>;
};


export type QueryBranchArgs = {
  name: Scalars['String']['input'];
};


export type QueryDiffSummariesArgs = {
  fromRefName: Scalars['String']['input'];
  toRefName: Scalars['String']['input'];
};


export type QueryPullArgs = {
  pullId: Scalars['Int']['input'];
};


export type QueryTwoDotLogsArgs = {
  fromBranchName: Scalars['String']['input'];
  toBranchName: Scalars['String']['input'];
};

export enum TableDiffType {
  Added = 'Added',
  Dropped = 'Dropped',
  Modified = 'Modified',
  Renamed = 'Renamed'
}

export type BranchFragment = { __typename?: 'Branch', name: string, hash: string, latestCommitter: string, latestCommitMessage: string, latestCommitDate: any };

export type GetBranchQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type GetBranchQuery = { __typename?: 'Query', branch?: { __typename?: 'Branch', name: string, hash: string, latestCommitter: string, latestCommitMessage: string, latestCommitDate: any } | null };

export type DeleteBranchMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type DeleteBranchMutation = { __typename?: 'Mutation', deleteBranch: boolean };

export type ListBranchesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListBranchesQuery = { __typename?: 'Query', branches: Array<{ __typename?: 'Branch', name: string }> };

export type DiffSummaryFragment = { __typename?: 'DiffSummary', fromTableName: string, toTableName: string, tableName: string, tableType: TableDiffType, hasDataChanges: boolean, hasSchemaChanges: boolean };

export type DiffSummariesQueryVariables = Exact<{
  fromRefName: Scalars['String']['input'];
  toRefName: Scalars['String']['input'];
}>;


export type DiffSummariesQuery = { __typename?: 'Query', diffSummaries: Array<{ __typename?: 'DiffSummary', fromTableName: string, toTableName: string, tableName: string, tableType: TableDiffType, hasDataChanges: boolean, hasSchemaChanges: boolean }> };

export type CreateBranchMutationVariables = Exact<{
  newBranchName: Scalars['String']['input'];
  fromRefName: Scalars['String']['input'];
}>;


export type CreateBranchMutation = { __typename?: 'Mutation', createBranch: boolean };

export type CreatePullMutationVariables = Exact<{
  fromBranchName: Scalars['String']['input'];
  toBranchName: Scalars['String']['input'];
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  creatorName: Scalars['String']['input'];
}>;


export type CreatePullMutation = { __typename?: 'Mutation', createPull: { __typename?: 'Pull', pullId: number, title: string, creatorName: string, createdAt: any, state: PullState } };

export type CommitFragment = { __typename?: 'Commit', commitHash: string, committer: string, date: any, message: string };

export type PullFragment = { __typename?: 'Pull', pullId: number, title: string, description: string, creatorName: string, fromBranchName: string, toBranchName: string, createdAt: any, state: PullState, premergeFromCommit: string, premergeToCommit: string, mergeBaseCommit: string, commits?: Array<{ __typename?: 'Commit', commitHash: string, committer: string, date: any, message: string }> | null };

export type GetPullQueryVariables = Exact<{
  pullId: Scalars['Int']['input'];
}>;


export type GetPullQuery = { __typename?: 'Query', pull?: { __typename?: 'Pull', pullId: number, title: string, description: string, creatorName: string, fromBranchName: string, toBranchName: string, createdAt: any, state: PullState, premergeFromCommit: string, premergeToCommit: string, mergeBaseCommit: string, commits?: Array<{ __typename?: 'Commit', commitHash: string, committer: string, date: any, message: string }> | null } | null };

export type PullListItemFragment = { __typename?: 'Pull', pullId: number, title: string, creatorName: string, createdAt: any, state: PullState };

export type PullListQueryVariables = Exact<{ [key: string]: never; }>;


export type PullListQuery = { __typename?: 'Query', pulls: Array<{ __typename?: 'Pull', pullId: number, title: string, creatorName: string, createdAt: any, state: PullState }> };

export const BranchFragmentDoc = gql`
    fragment Branch on Branch {
  name
  hash
  latestCommitter
  latestCommitMessage
  latestCommitDate
}
    `;
export const DiffSummaryFragmentDoc = gql`
    fragment DiffSummary on DiffSummary {
  fromTableName
  toTableName
  tableName
  tableType
  hasDataChanges
  hasSchemaChanges
}
    `;
export const CommitFragmentDoc = gql`
    fragment Commit on Commit {
  commitHash
  committer
  date
  message
}
    `;
export const PullFragmentDoc = gql`
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
  commits {
    ...Commit
  }
}
    ${CommitFragmentDoc}`;
export const PullListItemFragmentDoc = gql`
    fragment PullListItem on Pull {
  pullId
  title
  creatorName
  createdAt
  state
}
    `;
export const GetBranchDocument = gql`
    query GetBranch($name: String!) {
  branch(name: $name) {
    ...Branch
  }
}
    ${BranchFragmentDoc}`;

/**
 * __useGetBranchQuery__
 *
 * To run a query within a React component, call `useGetBranchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBranchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBranchQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetBranchQuery(baseOptions: Apollo.QueryHookOptions<GetBranchQuery, GetBranchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBranchQuery, GetBranchQueryVariables>(GetBranchDocument, options);
      }
export function useGetBranchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBranchQuery, GetBranchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBranchQuery, GetBranchQueryVariables>(GetBranchDocument, options);
        }
export type GetBranchQueryHookResult = ReturnType<typeof useGetBranchQuery>;
export type GetBranchLazyQueryHookResult = ReturnType<typeof useGetBranchLazyQuery>;
export type GetBranchQueryResult = Apollo.QueryResult<GetBranchQuery, GetBranchQueryVariables>;
export const DeleteBranchDocument = gql`
    mutation DeleteBranch($name: String!) {
  deleteBranch(name: $name)
}
    `;
export type DeleteBranchMutationFn = Apollo.MutationFunction<DeleteBranchMutation, DeleteBranchMutationVariables>;

/**
 * __useDeleteBranchMutation__
 *
 * To run a mutation, you first call `useDeleteBranchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBranchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBranchMutation, { data, loading, error }] = useDeleteBranchMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useDeleteBranchMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBranchMutation, DeleteBranchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBranchMutation, DeleteBranchMutationVariables>(DeleteBranchDocument, options);
      }
export type DeleteBranchMutationHookResult = ReturnType<typeof useDeleteBranchMutation>;
export type DeleteBranchMutationResult = Apollo.MutationResult<DeleteBranchMutation>;
export type DeleteBranchMutationOptions = Apollo.BaseMutationOptions<DeleteBranchMutation, DeleteBranchMutationVariables>;
export const ListBranchesDocument = gql`
    query ListBranches {
  branches {
    name
  }
}
    `;

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
export const DiffSummariesDocument = gql`
    query DiffSummaries($fromRefName: String!, $toRefName: String!) {
  diffSummaries(fromRefName: $fromRefName, toRefName: $toRefName) {
    ...DiffSummary
  }
}
    ${DiffSummaryFragmentDoc}`;

/**
 * __useDiffSummariesQuery__
 *
 * To run a query within a React component, call `useDiffSummariesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDiffSummariesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDiffSummariesQuery({
 *   variables: {
 *      fromRefName: // value for 'fromRefName'
 *      toRefName: // value for 'toRefName'
 *   },
 * });
 */
export function useDiffSummariesQuery(baseOptions: Apollo.QueryHookOptions<DiffSummariesQuery, DiffSummariesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DiffSummariesQuery, DiffSummariesQueryVariables>(DiffSummariesDocument, options);
      }
export function useDiffSummariesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DiffSummariesQuery, DiffSummariesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DiffSummariesQuery, DiffSummariesQueryVariables>(DiffSummariesDocument, options);
        }
export type DiffSummariesQueryHookResult = ReturnType<typeof useDiffSummariesQuery>;
export type DiffSummariesLazyQueryHookResult = ReturnType<typeof useDiffSummariesLazyQuery>;
export type DiffSummariesQueryResult = Apollo.QueryResult<DiffSummariesQuery, DiffSummariesQueryVariables>;
export const CreateBranchDocument = gql`
    mutation CreateBranch($newBranchName: String!, $fromRefName: String!) {
  createBranch(newBranchName: $newBranchName, fromRefName: $fromRefName)
}
    `;
export type CreateBranchMutationFn = Apollo.MutationFunction<CreateBranchMutation, CreateBranchMutationVariables>;

/**
 * __useCreateBranchMutation__
 *
 * To run a mutation, you first call `useCreateBranchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBranchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBranchMutation, { data, loading, error }] = useCreateBranchMutation({
 *   variables: {
 *      newBranchName: // value for 'newBranchName'
 *      fromRefName: // value for 'fromRefName'
 *   },
 * });
 */
export function useCreateBranchMutation(baseOptions?: Apollo.MutationHookOptions<CreateBranchMutation, CreateBranchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBranchMutation, CreateBranchMutationVariables>(CreateBranchDocument, options);
      }
export type CreateBranchMutationHookResult = ReturnType<typeof useCreateBranchMutation>;
export type CreateBranchMutationResult = Apollo.MutationResult<CreateBranchMutation>;
export type CreateBranchMutationOptions = Apollo.BaseMutationOptions<CreateBranchMutation, CreateBranchMutationVariables>;
export const CreatePullDocument = gql`
    mutation CreatePull($fromBranchName: String!, $toBranchName: String!, $title: String!, $description: String!, $creatorName: String!) {
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
    ${PullListItemFragmentDoc}`;
export type CreatePullMutationFn = Apollo.MutationFunction<CreatePullMutation, CreatePullMutationVariables>;

/**
 * __useCreatePullMutation__
 *
 * To run a mutation, you first call `useCreatePullMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePullMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPullMutation, { data, loading, error }] = useCreatePullMutation({
 *   variables: {
 *      fromBranchName: // value for 'fromBranchName'
 *      toBranchName: // value for 'toBranchName'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      creatorName: // value for 'creatorName'
 *   },
 * });
 */
export function useCreatePullMutation(baseOptions?: Apollo.MutationHookOptions<CreatePullMutation, CreatePullMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePullMutation, CreatePullMutationVariables>(CreatePullDocument, options);
      }
export type CreatePullMutationHookResult = ReturnType<typeof useCreatePullMutation>;
export type CreatePullMutationResult = Apollo.MutationResult<CreatePullMutation>;
export type CreatePullMutationOptions = Apollo.BaseMutationOptions<CreatePullMutation, CreatePullMutationVariables>;
export const GetPullDocument = gql`
    query GetPull($pullId: Int!) {
  pull(pullId: $pullId) {
    ...Pull
  }
}
    ${PullFragmentDoc}`;

/**
 * __useGetPullQuery__
 *
 * To run a query within a React component, call `useGetPullQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPullQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPullQuery({
 *   variables: {
 *      pullId: // value for 'pullId'
 *   },
 * });
 */
export function useGetPullQuery(baseOptions: Apollo.QueryHookOptions<GetPullQuery, GetPullQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPullQuery, GetPullQueryVariables>(GetPullDocument, options);
      }
export function useGetPullLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPullQuery, GetPullQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPullQuery, GetPullQueryVariables>(GetPullDocument, options);
        }
export type GetPullQueryHookResult = ReturnType<typeof useGetPullQuery>;
export type GetPullLazyQueryHookResult = ReturnType<typeof useGetPullLazyQuery>;
export type GetPullQueryResult = Apollo.QueryResult<GetPullQuery, GetPullQueryVariables>;
export const PullListDocument = gql`
    query PullList {
  pulls {
    ...PullListItem
  }
}
    ${PullListItemFragmentDoc}`;

/**
 * __usePullListQuery__
 *
 * To run a query within a React component, call `usePullListQuery` and pass it any options that fit your needs.
 * When your component renders, `usePullListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePullListQuery({
 *   variables: {
 *   },
 * });
 */
export function usePullListQuery(baseOptions?: Apollo.QueryHookOptions<PullListQuery, PullListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PullListQuery, PullListQueryVariables>(PullListDocument, options);
      }
export function usePullListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PullListQuery, PullListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PullListQuery, PullListQueryVariables>(PullListDocument, options);
        }
export type PullListQueryHookResult = ReturnType<typeof usePullListQuery>;
export type PullListLazyQueryHookResult = ReturnType<typeof usePullListLazyQuery>;
export type PullListQueryResult = Apollo.QueryResult<PullListQuery, PullListQueryVariables>;