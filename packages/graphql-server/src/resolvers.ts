import { BranchResolver } from "./branches/branch.resolver";
import { ColumnResolver } from "./columns/column.resolver";
import { CommitResolver } from "./commits/commit.resolver";
import { DiffSummaryResolver } from "./diffSummaries/diffSummary.resolver";
import { PullResolver } from "./pulls/pull.resolver";
import { RowDiffResolver } from "./rowDiffs/rowDiff.resolver";
import { RowResolver } from "./rows/row.resolver";

const resolvers = [
  BranchResolver,
  ColumnResolver,
  CommitResolver,
  DiffSummaryResolver,
  PullResolver,
  RowDiffResolver,
  RowResolver,
];

export default resolvers;
