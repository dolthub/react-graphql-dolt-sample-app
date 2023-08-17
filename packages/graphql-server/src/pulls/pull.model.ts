import { Field, GraphQLTimestamp, Int, ObjectType } from "@nestjs/graphql";
import { Commit } from "../commits/commit.model";
import { PullState } from "./pull.enums";

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

  @Field((_type) => [Commit], { nullable: true })
  commits?: Commit[];
}
