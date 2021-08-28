import { useEffect, useState } from "react";
import { addHistory as addHistoryToIndexedDb, initIndexedDb } from "../util/history";

interface UseHistoryState {
  canUseHistory: boolean;
  addHistory: (canvas: HTMLCanvasElement) => void;
}

export const useHistory = (): UseHistoryState => {
  const [canUseIndexedDb, setCanUseIndexedDb] = useState(false);

  const addHistory = (canvas: HTMLCanvasElement): void => {
    if (!canUseIndexedDb) return;

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
    console.debug(thumbnailDataUrl);
    const dataUrl = canvas.toDataURL("image/jpeg");
    const datetime = new Date().toISOString();
    addHistoryToIndexedDb(datetime, dataUrl, thumbnailDataUrl);
  };

  useEffect(() => {
    initIndexedDb().then(setCanUseIndexedDb);
  }, [setCanUseIndexedDb]);

  return { canUseHistory: canUseIndexedDb, addHistory };
};
