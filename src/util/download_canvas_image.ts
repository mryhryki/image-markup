import { DateTime } from "@mryhryki/datetime";

export const downloadCanvasImage = (context: CanvasRenderingContext2D): void => {
  const dataUrl = context.canvas.toDataURL("image/png");
  const anchor = document.createElement("a");
  anchor.href = dataUrl;
  const { year, month, day, hour, minute, second } = DateTime.now().get();
  anchor.download = `${year}-${month}-${day}-${hour}-${minute}-${second}`;
  anchor.click();
};
