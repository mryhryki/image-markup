export const PermitFileType = ["image/png", "image/jpeg"];

export const selectImage = (onChange: (file: File) => void): void => {
  const input: HTMLInputElement = document.createElement("input");
  input.type = "file";
  input.accept = PermitFileType.join(",");
  input.multiple = false;
  input.onchange = () => {
    if (input.files != null && input.files.length > 0) {
      const file = input.files.item(0);
      if (file != null) {
        onChange(file);
      }
    }
  };
  input.click();
};
