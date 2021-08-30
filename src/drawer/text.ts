import { Position } from "../util/mouse_event";
import { getFontSize } from "../util/size";

export const drawText = (context: CanvasRenderingContext2D, position: Position, text: string, color: string): void => {
  if (text.trim().length === 0) return;
  context.fillStyle = color;
  context.font = `bold ${getFontSize(context)}px self`;
  context.textAlign = "center";
  context.fillText(text, position.x, position.y);
};
