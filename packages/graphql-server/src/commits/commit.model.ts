import { Field, GraphQLTimestamp, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Commit {
  @Field()
  commitHash: string;

  @Field()
  committer: string;

  @Field()
  committerEmail: string;

  @Field((_type) => GraphQLTimestamp)
  date: Date;

  @Field()
  message: string;
}

export function fromDoltLogsRow(l: Record<string, any>): Commit {
  return {
    commitHash: l.commit_hash,
    committer: l.committer,
    committerEmail: l.email,
    date: l.date,
    message: l.message,
  };
}
