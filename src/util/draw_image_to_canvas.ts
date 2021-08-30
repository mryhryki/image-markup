export const drawImageToCanvas = (
  dataUrl: string,
  context: CanvasRenderingContext2D,
): Promise<void> => new Promise((resolve) => {
  const image = new Image();
  image.addEventListener("load", () => {
    context.canvas.width = image.width;
    context.canvas.height = image.height;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.drawImage(image, 0, 0);
    resolve();
  });
  image.src = dataUrl;
});
