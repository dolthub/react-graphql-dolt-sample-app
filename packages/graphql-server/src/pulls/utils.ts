export function getNextPullId(pulls: any): number {
  const keys = Object.keys(pulls);
  if (keys.length === 0) return 1;
  const ids = keys.map((key) => parseInt(key, 10));
  const max = Math.max(...ids);
  return max + 1;
}
