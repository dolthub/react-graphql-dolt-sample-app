import { BranchResolver } from "./branches/branch.resolver";
import { CommitResolver } from "./commits/commit.resolver";
import { PullResolver } from "./pulls/pull.resolver";

const resolvers = [BranchResolver, CommitResolver, PullResolver];

export default resolvers;
