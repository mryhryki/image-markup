import { useEffect, useState } from "react";
import { getImage } from "../util/image";

interface UseCanvasState {
  setCanvasRef: (ref: HTMLCanvasElement) => void;
  context: CanvasRenderingContext2D | null;
  render: (imageDataUrl: string) => Promise<void>;
}

export const useCanvas = (): UseCanvasState => {
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const render = async (imageDataUrl: string): Promise<void> => {
    if (context == null) return;
    const image = await getImage(imageDataUrl);
    const { naturalWidth: width, naturalHeight: height } = image;
    context.canvas.width = width;
    context.canvas.height = height;
    context.clearRect(0, 0, width, height);
    context.drawImage(image, 0, 0);
  };

  useEffect(() => {
    if (canvasRef == null) return;
    setContext(canvasRef.getContext("2d", { alpha: false }) ?? null);
  }, [canvasRef]);

  return { setCanvasRef, context, render };
};
