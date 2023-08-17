import * as fs from "fs";
import { Pull } from "../pulls/pull.model";

const fileName = "store.json";

export class FileStoreService {
  storeExists(): boolean {
    return fs.existsSync(fileName);
  }

  readFile(): any {
    if (!this.storeExists()) {
      return {};
    }
    const file = fs.readFileSync(fileName);
    const json = JSON.parse(file.toString());
    return json;
  }

  readPulls(): Pull[] {
    const store = this.readFile();
    return Object.values(store.pulls || {});
  }

  readPull(id: number): Pull | undefined {
    const store = this.readFile();
    if (!store.pulls) {
      return undefined;
    }
    return store.pulls[id];
  }

  writeFile(json: object) {
    const encoded = JSON.stringify(json);
    fs.writeFileSync(fileName, encoded);
  }

  writePullToFile(pull: Omit<Pull, "pullId">): Pull {
    const store = this.readFile();

    const id = getNextPullId(store.pulls);
    const newPull: Pull = { ...pull, pullId: id };
    const newStore = {
      ...store,
      pulls: {
        ...store.pulls,
        [id]: { ...pull, pullId: id },
      },
    };

    this.writeFile(newStore);
    return newPull;
  }
}

function getNextPullId(pulls: any): number {
  if (!pulls) return 1;
  const keys = Object.keys(pulls);
  if (keys.length === 0) return 1;
  const ids = keys.map((key) => parseInt(key, 10));
  const max = Math.max(...ids);
  return max + 1;
}
