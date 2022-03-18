import Dexie from "dexie";

export interface History {
  datetime: string;
  dataUrl: string;
  thumbnailDataUrl: string;
}

let database: Dexie | null = null;
const db = new Dexie("image_markup");
db.version(7).stores({
  histories: "&datetime",
});

export const initIndexedDb = async (): Promise<boolean> =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (db as any).histories
    .orderBy("datetime")
    .reverse()
    .limit(1)
    .first()
    .then(() => {
      database = db;
      return true;
    })
    .catch(() => false);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getHistoriesTable = (): Dexie.Table<History, string> | null => (database as any)?.histories ?? null;
const MAX_HISTORY = 30;

export const addHistory = async (datetime: string, dataUrl: string, thumbnailDataUrl: string): Promise<boolean> => {
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

// export const getLatestHistory = async (): Promise<History | null> => {
//   const histories = getHistoriesTable();
//   if (histories == null) {
//     return null;
//   }
//   return (await histories.orderBy("datetime").reverse().limit(1).first()) ?? null;
// };

export const listHistory = async (/* numPerPage: number, page = 1 */): Promise<Array<History>> => {
  const histories = getHistoriesTable();
  if (histories == null) {
    return [];
  }
  // const offset = (page - 1) * numPerPage;
  return histories
    .orderBy("datetime")
    .reverse() /*.offset(offset).limit(numPerPage)*/
    .toArray();
};

// export const getBeforeHistory = async (baseDatetime: string): Promise<History | null> => {
//   const histories = getHistoriesTable();
//   if (histories == null) {
//     return null;
//   }
//   const datetimeList: string[] = (await histories.toCollection().primaryKeys()).sort();
//   const index = datetimeList.findIndex((datetime) => {
//     return datetime === baseDatetime;
//   });
//   const beforeIndex = index - 1;
//   if (datetimeList[beforeIndex] == null) {
//     return null;
//   }
//   return (await histories.get(datetimeList[beforeIndex])) ?? null;
// };
//
// export const getAfterHistory = async (baseDatetime: string): Promise<History | null> => {
//   const histories = getHistoriesTable();
//   if (histories == null) {
//     return null;
//   }
//   const datetimeList: string[] = (await histories.toCollection().primaryKeys()).sort();
//   const index = datetimeList.findIndex((datetime) => {
//     return datetime === baseDatetime;
//   });
//   const afterIndex = index + 1;
//   if (datetimeList[afterIndex] == null) {
//     return null;
//   }
//   return (await histories.get(datetimeList[afterIndex])) ?? null;
// };
//
// export const countHistories = async (): Promise<number> => {
//   const histories = getHistoriesTable();
//   if (histories == null) {
//     return 0;
//   }
//   return histories.count();
// };
