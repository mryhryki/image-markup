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

export const setUserActionEventListener = (context: CanvasRenderingContext2D, listener: (event: CustomMouseEvent) => Promise<void>): void => {
  const canvas = context.canvas;
  let moving: boolean = false;
  let startPosition: Position = { x: 0, y: 0 };

  canvas.onmousedown = async (event) => {
    moving = true;
    startPosition = getPosition(event);
    await listener({ type: "start", start: startPosition, current: startPosition });
  };
  canvas.onmousemove = async (event) => {
    if (!moving) return;
    await listener({ type: "moving", start: startPosition, current: getPosition(event) });
  };
  canvas.onmouseup = async (event) => {
    if (!moving) return;
    moving = false;
    await listener({ type: "moved", start: startPosition, current: getPosition(event) });
  };
  canvas.onmouseleave = async () => {
    if (!moving) return;
    moving = false;
    await listener({ type: "canceled", start: DummyPosition, current: DummyPosition });
  };
  canvas.oncontextmenu = async () => {
    moving = false;
    await listener({ type: "canceled", start: DummyPosition, current: DummyPosition });
  };
};
