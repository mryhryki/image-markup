export interface Position {
  x: number;
  y: number;
}

interface CustomMouseEvent {
  type: "start" | "moving" | "moved";
  start: Position;
  current: Position;
}

const getPosition = (event: MouseEvent): Position => {
  const canvas: HTMLCanvasElement = event.target as HTMLCanvasElement;
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((event.clientX - rect.left) / (canvas.clientWidth / canvas.width));
  const y = Math.floor((event.clientY - rect.top) / (canvas.clientHeight / canvas.height));
  return { x, y };
};

export const setMouseEventListener = (canvas: HTMLCanvasElement, listener: (event: CustomMouseEvent) => void): void => {
  let moving: boolean = false;
  let startPosition: Position = { x: 0, y: 0 };

  canvas.onmousedown = (event) => {
    moving = true;
    startPosition = getPosition(event);
    listener({ type: "start", start: startPosition, current: startPosition });
  };
  canvas.onmousemove = (event) => {
    if (!moving) return;
    listener({ type: "moving", start: startPosition, current: getPosition(event) });
  };
  canvas.onmouseup = (event) => {
    moving = false;
    listener({ type: "moved", start: startPosition, current: getPosition(event) });
  };
};
