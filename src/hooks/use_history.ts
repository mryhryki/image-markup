import { useEffect, useState } from "react";
import { addHistory as addHistoryToIndexedDb, History, initIndexedDb, listHistory } from "../util/history";

interface UseHistoryState {
  addHistory: (context: CanvasRenderingContext2D) => void;
  canUseHistory: boolean;
  histories: History[];
}

export const useHistory = (): UseHistoryState => {
  const [canUseIndexedDb, setCanUseIndexedDb] = useState(false);
  const [histories, setHistories] = useState<History[]>([]);

  const addHistory = (context: CanvasRenderingContext2D): void => {
    if (!canUseIndexedDb) return;
    const canvas = context.canvas

    const tempCanvas = document.createElement("canvas");
    const tempContext = tempCanvas.getContext("2d", { alpha: false });
    if (tempContext == null) return;

    const baseLen = canvas.width > canvas.height ? canvas.width : canvas.height;
    const rate = 192 / baseLen;
    const width = canvas.width * rate;
    const height = canvas.height * rate;
    tempCanvas.width = width;
    tempCanvas.height = height;
    tempContext.drawImage(canvas, 0, 0, width, height);

    const thumbnailDataUrl = tempCanvas.toDataURL("image/jpeg");
    const dataUrl = canvas.toDataURL("image/jpeg");
    const datetime = new Date().toISOString();
    addHistoryToIndexedDb(datetime, dataUrl, thumbnailDataUrl).then(() => listHistory().then(setHistories));
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
