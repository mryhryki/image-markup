export const fileToDataUrl = (file: File): Promise<string> => new Promise((resolve, reject) => {
  const fileReader = new FileReader();
  fileReader.addEventListener("load", (event) => {
    const dataUrl = event.target?.result;
    if (typeof dataUrl === "string") {
      resolve(dataUrl)
    } else {
      reject("Generate data URL failed.")
    }
  });
  fileReader.addEventListener("error", reject)
  fileReader.readAsDataURL(file);
})
