export const getFontSize = (context: CanvasRenderingContext2D): number => {
  const min = Math.min(context.canvas.height, context.canvas.width);
  const fontSize = Math.round(min / 20);
  if (fontSize < 20) {
    return 20;
  }
  if (fontSize > 160) {
    return 120;
  }
  return fontSize;
};

export const getLineWidth = (context: CanvasRenderingContext2D): number => {
  const min = Math.min(context.canvas.height, context.canvas.width);
  const lineWidth = Math.round(Math.cbrt(min));
  if (lineWidth < 4) {
    return 4;
  }
  if (lineWidth > 20) {
    return 20;
  }
  return lineWidth;
};
