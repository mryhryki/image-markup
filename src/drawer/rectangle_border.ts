import { getLineWidth } from "../util/size";
import { Position } from "../util/user_action_event";

interface Options {
  color: string;
  lineWidth?: number;
  lineDashSegments?: number[];
}

export const drawRectangleBorder = (
  context: CanvasRenderingContext2D,
  from: Position,
  to: Position,
  options: Options
): void => {
  const color = options.color;

  context.strokeStyle = color;
  context.fillStyle = color;
  context.lineWidth = options.lineWidth ?? getLineWidth(context);
  context.lineCap = "round";
  context.lineJoin = "round";
  if (options.lineDashSegments) {
    context.setLineDash(options.lineDashSegments);
  }

  const positions: Position[] = [];
  positions.push(from);
  positions.push({ x: from.x, y: from.y });
  positions.push({ x: from.x, y: to.y });
  positions.push({ x: to.x, y: to.y });
  positions.push({ x: to.x, y: from.y });
  positions.push(from);

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
