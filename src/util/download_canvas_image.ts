export const downloadCanvasImage = (context: CanvasRenderingContext2D): void => {
  const dataUrl = context.canvas.toDataURL("image/png");
  const anchor = document.createElement("a");
  anchor.href = dataUrl;
  anchor.download = `${new Date().toISOString().replace(/[^0-9]/g, "")}.png`;
  anchor.click();
};
