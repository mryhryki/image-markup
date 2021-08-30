import { Position } from "../util/mouse_event";
import { getLineWidth } from "../util/size";

export const drawRectangleBorder = (context: CanvasRenderingContext2D, from: Position, to: Position, color: string): void => {
  context.strokeStyle = color;
  context.fillStyle = color;
  context.lineWidth = getLineWidth(context);
  context.lineCap = "round";
  context.lineJoin = "round";

  const positions: Position[] = [];
  positions.push(from);
  positions.push({ x: from.x, y: from.y });
  positions.push({ x: from.x, y: to.y });
  positions.push({ x: to.x, y: to.y });
  positions.push({ x: to.x, y: from.y });
  positions.push(from);
  // console.debug(positions.map((p) => JSON.stringify(p)).join("\n"))

  context.beginPath();
  positions.forEach(({ x, y }, i) => {
    if (i === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
  });
  context.stroke();
};
