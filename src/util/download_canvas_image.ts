export const downloadCanvasImage = (canvas: HTMLCanvasElement): void => {
  const dataUrl = canvas.toDataURL("image/jpeg");
  const anchor = document.createElement("a");
  anchor.href = dataUrl;
  anchor.download = "image.jpg";
  anchor.click();
};
