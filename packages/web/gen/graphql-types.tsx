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

export type Mutation = {
  __typename?: 'Mutation';
  createBranch: Scalars['Boolean']['output'];
  deleteBranch: Scalars['Boolean']['output'];
};


export type MutationCreateBranchArgs = {
  fromRefName: Scalars['String']['input'];
  newBranchName: Scalars['String']['input'];
};


export type MutationDeleteBranchArgs = {
  name: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  branch?: Maybe<Branch>;
  branches: Array<Branch>;
};


export type QueryBranchArgs = {
  name: Scalars['String']['input'];
};

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

export type CreateBranchMutationVariables = Exact<{
  newBranchName: Scalars['String']['input'];
  fromRefName: Scalars['String']['input'];
}>;


export type CreateBranchMutation = { __typename?: 'Mutation', createBranch: boolean };

export const BranchFragmentDoc = gql`
    fragment Branch on Branch {
  name
  hash
  latestCommitter
  latestCommitMessage
  latestCommitDate
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