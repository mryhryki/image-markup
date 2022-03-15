import { RefObject, useEffect, useRef, useState } from "react";
import { buildImageToCanvasRenderer } from "../util/render_image_to_canvas";

const DummyCanvas: HTMLCanvasElement = document.createElement("canvas");
const _DummyContext = DummyCanvas.getContext("2d", { alpha: false });
if (_DummyContext == null) throw new Error("Cannot get context");
const DummyContext: CanvasRenderingContext2D = _DummyContext;

type ReRenderFunc = () => void

interface UseCanvasState {
  canvasRef: RefObject<HTMLCanvasElement>;
  context: CanvasRenderingContext2D;
  reRender: ReRenderFunc;
  render: (imageDataUrl: string) => Promise<void>;
  rendered: boolean;
  update: () => Promise<void>;
}

export const useCanvas = (): UseCanvasState => {
  const canvasRef = useRef(DummyCanvas);
  const [rendered, setRendered] = useState(false);
  const [context, setContext] = useState(DummyContext);
  const [reRender, setReRender] = useState<ReRenderFunc>(() => undefined);

  const update = async (): Promise<void> => {
    const reRender = await buildImageToCanvasRenderer(context.canvas.toDataURL("image/png"), context);
    reRender();
    setReRender(() => reRender);
  };

  const render = async (imageDataUrl: string): Promise<void> => {
    if (!rendered) {
      setRendered(true);
    }
    const reRender = await buildImageToCanvasRenderer(imageDataUrl, context);
    reRender();
    setReRender(() => reRender);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (canvasRef.current !== DummyCanvas) {
        clearInterval(intervalId);
        setContext(canvasRef.current.getContext("2d", { alpha: false }) ?? DummyContext);
      }
    }, 0);
  }, [canvasRef.current]);

  return { canvasRef, context, rendered, render, reRender, update };
};
