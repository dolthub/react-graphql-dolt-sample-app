import { BranchResolver } from "./branches/branch.resolver";
import { CommitResolver } from "./commits/commit.resolver";
import { DiffSummaryResolver } from "./diffSummaries/diffSummary.resolver";
import { PullResolver } from "./pulls/pull.resolver";

const resolvers = [
  BranchResolver,
  CommitResolver,
  DiffSummaryResolver,
  PullResolver,
];

export default resolvers;
