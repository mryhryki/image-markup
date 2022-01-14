export interface Position {
  x: number;
  y: number;
}

const DummyPosition: Position = { x: 0, y: 0 };

interface CustomMouseEvent {
  type: "start" | "moving" | "moved" | "canceled";
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

export const setUserActionEventListener = (context: CanvasRenderingContext2D, listener: (event: CustomMouseEvent) => void): void => {
  const canvas = context.canvas;
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
    if (!moving) return;
    moving = false;
    listener({ type: "moved", start: startPosition, current: getPosition(event) });
  };
  canvas.onmouseleave = () => {
    if (!moving) return;
    moving = false;
    listener({ type: "canceled", start: DummyPosition, current: DummyPosition });
  };
  canvas.oncontextmenu = () => {
    moving = false;
    listener({ type: "canceled", start: DummyPosition, current: DummyPosition });
  };
};