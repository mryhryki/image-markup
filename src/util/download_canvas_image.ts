import { getDateTime } from "./datetime";

export const downloadCanvasImage = (context: CanvasRenderingContext2D): void => {
  const dataUrl = context.canvas.toDataURL("image/png");
  const anchor = document.createElement("a");
  anchor.href = dataUrl;
  const { year, month, day, hour, minute, second } = getDateTime(new Date());
  anchor.download = `${year}-${month}-${day}-${hour}-${minute}-${second}`;
  anchor.click();
};
