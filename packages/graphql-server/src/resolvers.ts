import { BranchResolver } from "./branches/branch.resolver";
import { PullResolver } from "./pulls/pull.resolver";

const resolvers = [BranchResolver, PullResolver];

export default resolvers;
