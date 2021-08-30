import { useEffect, useState } from "react";
import { addHistory as addHistoryToIndexedDb, History, initIndexedDb, listHistory } from "../util/history";
import { getImage } from "../util/render_image_to_canvas";

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
    const baseLen = image.width > image.height ? image.width : image.height;
    const rate = 192 / baseLen;
    const width = image.width * rate;
    const height = image.height * rate;

    canvas.width = width;
    canvas.height = height;
    context.drawImage(image, 0, 0, width, height);
    const thumbnailDataUrl = canvas.toDataURL("image/png");

    const datetime = new Date().toISOString();
    addHistoryToIndexedDb(datetime, imageDataUrl, thumbnailDataUrl).then(() => listHistory().then(setHistories));
  };

  useEffect(() => {
    (async () => {
      const canUseIndexedDb = await initIndexedDb();
      setCanUseIndexedDb(canUseIndexedDb);
      if (canUseIndexedDb) {
        setHistories(await listHistory());
      }
    })();
  }, [setCanUseIndexedDb]);

  return { canUseHistory: canUseIndexedDb, histories, addHistory };
};
