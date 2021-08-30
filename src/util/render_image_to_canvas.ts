type Drawer = () => CanvasRenderingContext2D

export const buildImageToCanvasRenderer = async (
  imageDataUrl: string,
  context: CanvasRenderingContext2D,
): Promise<Drawer> => {
  const image = await getImage(imageDataUrl);
  context.canvas.width = image.width;
  context.canvas.height = image.height;
  const drawer: Drawer = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.drawImage(image, 0, 0);
    return context;
  };
  return drawer;
};

export const getImage = async (imageDataUrl: string): Promise<HTMLImageElement> => new Promise((resolve, reject) => {
  const image = new Image();
  image.addEventListener("load", () => resolve(image));
  image.addEventListener("error", reject);
  image.src = imageDataUrl;
});
