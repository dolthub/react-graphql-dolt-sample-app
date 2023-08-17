import { Field, GraphQLTimestamp, Int, ObjectType } from "@nestjs/graphql";
import { PullState } from "./pull.enums";

@ObjectType()
export class MergeState {
  @Field()
  premergeFromCommit: string;

  @Field()
  premergeToCommit: string;

  @Field()
  mergeBaseCommit: string;
}

@ObjectType()
export class Pull {
  @Field((_type) => Int)
  pullId: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  creatorName: string;

  @Field()
  fromBranchName: string;

  @Field()
  toBranchName: string;

  @Field((_type) => GraphQLTimestamp)
  createdAt: Date;

  @Field((_type) => PullState)
  state: PullState;

  @Field()
  premergeFromCommit: string;

  @Field()
  premergeToCommit: string;

  @Field()
  mergeBaseCommit: string;
}
