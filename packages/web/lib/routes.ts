export type Route = { href: string; as: string };

export const pulls: Route = { href: "/pulls", as: "/pulls" };

export const newPull: Route = {
  href: `${pulls.href}/new`,
  as: `${pulls.as}/new`,
};

export const pull = (pullId: number): Route => {
  return { href: `${pulls.href}/[pullId]`, as: `${pulls.as}/${pullId}` };
};

export const pullDiff = (pullId: number): Route => {
  const p = pull(pullId);
  return { href: `${p.href}/compare`, as: `${p.as}/compare` };
};

export const pullDiffTable = (pullId: number, tableName: string): Route => {
  const pd = pullDiff(pullId);
  return {
    href: `${pd.href}?tableName=${tableName}`,
    as: `${pd.as}?tableName=${tableName}`,
  };
};

export const branches: Route = { href: "/branches", as: "/branches" };

export const branch = (branchName: string): Route => {
  return {
    href: `${branches.href}/[name]`,
    as: `${branches.as}/${branchName}`,
  };
};

export const newBranch: Route = {
  href: `${branches.href}/new`,
  as: `${branches.as}/new`,
};
