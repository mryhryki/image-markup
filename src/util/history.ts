import Dexie, { type EntityTable } from "dexie";

export interface History {
  datetime: string;
  dataUrl: string;
  thumbnailDataUrl: string;
}

type DatabaseType = Dexie & {
  histories: EntityTable<History>;
};

let database: DatabaseType | null = null;
const db = new Dexie("image_markup") as DatabaseType;
db.version(7).stores({
  histories: "&datetime",
});

export const initIndexedDb = async (): Promise<boolean> =>
  db.histories
    .orderBy("datetime")
    .reverse()
    .limit(1)
    .first()
    .then(() => {
      database = db;
      return true;
    })
    .catch(() => false);

export const getHistoriesTable = (): EntityTable<History> | null =>
  database?.histories ?? null;
const MAX_HISTORY = 30;

export const addHistory = async (
  datetime: string,
  dataUrl: string,
  thumbnailDataUrl: string,
): Promise<boolean> => {
  const histories = getHistoriesTable();
  if (histories == null) {
    return false;
  }
  await histories.put({ datetime, dataUrl, thumbnailDataUrl });
  const count = await histories.count();
  if (count > MAX_HISTORY) {
    histories.orderBy("datetime").reverse().offset(MAX_HISTORY).delete();
  }
  return true;
};

export const listHistory = async (): Promise<Array<History>> => {
  const histories = getHistoriesTable();
  if (histories == null) {
    return [];
  }
  return histories.orderBy("datetime").reverse().toArray();
};
