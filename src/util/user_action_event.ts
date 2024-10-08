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

const getCanvasPosition = (
  event: MouseEvent,
  canvas: HTMLCanvasElement,
): Position => {
  const rect = canvas.getBoundingClientRect();
  const rawX = Math.floor(
    (event.clientX - rect.left) / (canvas.clientWidth / canvas.width),
  );
  const x = Math.min(Math.max(rawX, 0), canvas.width);
  const rawY = Math.floor(
    (event.clientY - rect.top) / (canvas.clientHeight / canvas.height),
  );
  const y = Math.min(Math.max(rawY, 0), canvas.height);
  return { x, y };
};

export const setUserActionEventListener = (
  ref: HTMLDivElement,
  context: CanvasRenderingContext2D,
  listener: (event: CustomMouseEvent) => Promise<void>,
): void => {
  const canvas = context.canvas;
  let moving = false;
  let startPosition: Position = { x: 0, y: 0 };

  ref.onmousedown = async (event) => {
    moving = true;
    startPosition = getCanvasPosition(event, canvas);
    await listener({
      type: "start",
      start: startPosition,
      current: startPosition,
    });
  };
  ref.onmousemove = async (event) => {
    if (!moving) return;
    await listener({
      type: "moving",
      start: startPosition,
      current: getCanvasPosition(event, canvas),
    });
  };
  ref.onmouseup = async (event) => {
    if (!moving) return;
    moving = false;
    const current = getCanvasPosition(event, canvas);
    if (
      Math.abs(current.x - startPosition.x) *
        Math.abs(current.y - startPosition.y) !==
      0
    ) {
      await listener({ type: "moved", start: startPosition, current });
    }
  };
  // canvas.onmouseleave = async () => {
  //   if (!moving) return;
  //   moving = false;
  //   await listener({ type: "canceled", start: DummyPosition, current: DummyPosition });
  // };
  ref.oncontextmenu = async () => {
    moving = false;
    await listener({
      type: "canceled",
      start: DummyPosition,
      current: DummyPosition,
    });
  };
};
