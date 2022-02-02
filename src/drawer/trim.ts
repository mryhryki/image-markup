import { Position } from "../util/user_action_event";
import { getImage } from "../util/render_image_to_canvas";

export const trim = async (context: CanvasRenderingContext2D, from: Position, to: Position): Promise<void> => {
  const canvas = context.canvas;
  const image = await getImage(canvas.toDataURL())

  const left = Math.max(Math.min(from.x, to.x), 0);
  const right = Math.min(Math.max(from.x, to.x), canvas.width);
  const top = Math.max(Math.min(from.y, to.y), 0);
  const bottom = Math.min(Math.max(from.y, to.y), canvas.height);

  const width = right - left;
  const height = bottom - top;

  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, -left, -top, width, height);
};
