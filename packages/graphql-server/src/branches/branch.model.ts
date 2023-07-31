import { Field, GraphQLTimestamp, ID, ObjectType } from "@nestjs/graphql";
import { DoltBranches } from "../doltBranches/doltBranch.entity";

@ObjectType()
export class Branch {
  @Field((_type) => ID)
  name: string;

  @Field()
  hash: string;

  @Field()
  latestCommitter: string;

  @Field()
  latestCommitterEmail: string;

  @Field()
  latestCommitMessage: string;

  @Field((_type) => GraphQLTimestamp)
  latestCommitDate: Date;
}

export function fromDoltBranchesRow(b: DoltBranches): Branch {
  return {
    name: b.name,
    hash: b.hash,
    latestCommitDate: b.latest_commit_date,
    latestCommitMessage: b.latest_commit_message,
    latestCommitter: b.latest_committer,
    latestCommitterEmail: b.latest_committer_email,
  };
}
