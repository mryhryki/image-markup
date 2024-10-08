import { useEffect, useState } from "react";
import {
  type History,
  addHistory as addHistoryToIndexedDb,
  initIndexedDb,
  listHistory,
} from "../util/history";
import { getImage } from "../util/image";

interface UseHistoryState {
  addHistory: (imageDataUrl: string) => Promise<void>;
  canUseHistory: boolean;
  histories: History[];
}

export const useHistory = (): UseHistoryState => {
  const [canUseIndexedDb, setCanUseIndexedDb] = useState(false);
  const [histories, setHistories] = useState<History[]>([]);

  const addHistory = async (imageDataUrl: string): Promise<void> => {
    if (!canUseIndexedDb) return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { alpha: false });
    if (context == null) return;

    const image = await getImage(imageDataUrl);
    const { naturalWidth, naturalHeight } = image;
    const baseLen = naturalWidth > naturalHeight ? naturalWidth : naturalHeight;
    const rate = 192 / baseLen;
    const width = naturalWidth * rate;
    const height = naturalHeight * rate;

    canvas.width = width;
    canvas.height = height;
    context.drawImage(image, 0, 0, width, height);
    const thumbnailDataUrl = canvas.toDataURL("image/png");

    const datetime = new Date().toISOString();
    addHistoryToIndexedDb(datetime, imageDataUrl, thumbnailDataUrl).then(() =>
      listHistory().then(setHistories),
    );
  };

  useEffect(() => {
    (async () => {
      const canUseIndexedDb = await initIndexedDb();
      setCanUseIndexedDb(canUseIndexedDb);
      if (canUseIndexedDb) {
        setHistories(await listHistory());
      }
    })();
  }, []);

  return { canUseHistory: canUseIndexedDb, histories, addHistory };
};
