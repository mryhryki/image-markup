export interface Position {
  x: number;
  y: number;
}

export const drawAllow = (context: CanvasRenderingContext2D, from: Position, to: Position): void => {
  const angle = Math.atan2(from.y - to.y, from.x - to.x);
  const len = Math.sqrt((from.x - to.x) * (from.x - to.x) + (from.y - to.y) * (from.y - to.y));
  const headLen = len * 0.2;

  const positions: Position[] = [];
  positions.push(from);
  positions.push({ x: from.x - headLen * Math.cos(angle - Math.PI / 6), y: from.y - headLen * Math.sin(angle - Math.PI / 6) });
  positions.push({ x: from.x - headLen * Math.cos(angle - Math.PI / 14), y: from.y - headLen * Math.sin(angle - Math.PI / 14) });
  positions.push(to);
  positions.push({ x: from.x - headLen * Math.cos(angle + Math.PI / 14), y: from.y - headLen * Math.sin(angle + Math.PI / 14) });
  positions.push({ x: from.x - headLen * Math.cos(angle + Math.PI / 6), y: from.y - headLen * Math.sin(angle + Math.PI / 6) });
  positions.push(from);
  // console.debug(positions.map((p) => JSON.stringify(p)).join("\n"))

  context.strokeStyle = "#0066ff";
  context.fillStyle = "#0066ff";

  context.beginPath();
  positions.forEach(({x, y}, i) => {
    if (i === 0) {
      context.moveTo(x, y)
    } else {
      context.lineTo(x, y)
    }
  })
  context.stroke();
  context.fill();
};
