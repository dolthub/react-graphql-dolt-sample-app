import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ColConstraint {
  @Field()
  notNull: boolean;
}

@ObjectType()
export class Column {
  @Field()
  name: string;

  @Field()
  isPrimaryKey: boolean;

  @Field()
  type: string;
}

export function fromDoltRowRes(col: Record<string, any>): Column {
  return {
    name: col.Field,
    isPrimaryKey: col.Key === "PRI",
    type: col.Type,
  };
}
