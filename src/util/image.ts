// Cache
let beforeImageDataUrl = "";
let beforeImage = new Image();

export const getImage = async (
  imageDataUrl: string,
): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    if (beforeImageDataUrl === imageDataUrl) {
      resolve(beforeImage);
      return;
    }
    beforeImageDataUrl = imageDataUrl;
    beforeImage = new Image();
    beforeImage.addEventListener("load", () => resolve(beforeImage));
    beforeImage.addEventListener("error", reject);
    beforeImage.src = imageDataUrl;
  });
