import { registerEnumType } from "@nestjs/graphql";

export enum PullState {
  Open,
  Closed,
  Merged,
  Unspecified,
}

registerEnumType(PullState, { name: "PullState" });
