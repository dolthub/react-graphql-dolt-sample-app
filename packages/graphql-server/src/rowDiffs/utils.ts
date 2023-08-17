import { Column } from "../columns/column.model";

export function unionCols(a: Column[], b: Column[]): Column[] {
  const mergedArray = [...a, ...b];
  const set = new Set();
  const unionArray = mergedArray.filter((item) => {
    if (!set.has(item.name)) {
      set.add(item.name);
      return true;
    }
    return false;
  }, set);
  return unionArray;
}
