import { Position } from "../util/mouse_event";

export const drawText = (context: CanvasRenderingContext2D, position: Position, color: string, size: number): void => {
  context.fillStyle = color
  context.font = `${size}px serif`;
  context.textAlign = "center"
  context.fillText("Hello world", position.x, position.y);
}
