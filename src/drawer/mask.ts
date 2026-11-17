import { canvasRGB } from "stackblur-canvas";
import type { Position } from "../util/user_action_event";

const getMaskColor = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
): string => {
  const MIX = 0.25; // 文字色を混ぜる割合（0〜1）
  const MIN_DISTANCE = 60; // 背景色と別の色とみなす最小距離（RGB ユークリッド距離）
  const SHIFT = 0.12; // 文字色がない場合の明度のずらし幅
  const QUANTIZE = 0xf8; // JPEG ノイズ等を吸収するための量子化マスク
  const FALLBACK = "hsl(0, 0%, 88%)";

  const { width: cw, height: ch } = ctx.canvas;
  const x0 = Math.max(0, Math.floor(x));
  const y0 = Math.max(0, Math.floor(y));
  const x1 = Math.min(cw, Math.ceil(x + width));
  const y1 = Math.min(ch, Math.ceil(y + height));
  const w = x1 - x0;
  const h = y1 - y0;
  if (w <= 0 || h <= 0) return FALLBACK;

  const { data } = ctx.getImageData(x0, y0, w, h);
  const counts = new Map<number, number>();
  for (let k = 0; k < data.length; k += 4) {
    if (data[k + 3] === 0) continue;
    const key =
      ((data[k] & QUANTIZE) << 16) |
      ((data[k + 1] & QUANTIZE) << 8) |
      (data[k + 2] & QUANTIZE);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  if (counts.size === 0) return FALLBACK;

  const toRgb = (key: number): [number, number, number] => [
    (key >> 16) & 0xff,
    (key >> 8) & 0xff,
    key & 0xff,
  ];
  const sorted = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);

  const bg = toRgb(sorted[0][0]);
  const fgEntry = sorted.find(([key]) => {
    const [r, g, b] = toRgb(key);
    return Math.hypot(r - bg[0], g - bg[1], b - bg[2]) >= MIN_DISTANCE;
  });

  if (fgEntry) {
    const fg = toRgb(fgEntry[0]);
    const mixed = bg.map((c, i) => Math.round(c * (1 - MIX) + fg[i] * MIX));
    return `rgb(${mixed[0]}, ${mixed[1]}, ${mixed[2]})`;
  }

  const [r, g, b] = bg.map((c) => c / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let hue = 0;
  let sat = 0;
  if (max !== min) {
    const d = max - min;
    sat = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) hue = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) hue = (b - r) / d + 2;
    else hue = (r - g) / d + 4;
    hue *= 60;
  }
  const nl = Math.min(1, Math.max(0, l > 0.5 ? l - SHIFT : l + SHIFT));
  return `hsl(${hue.toFixed(1)}, ${(sat * 100).toFixed(1)}%, ${(nl * 100).toFixed(1)}%)`;
};

export const drawMask = (
  context: CanvasRenderingContext2D,
  from: Position,
  to: Position,
): void => {
  const x = Math.min(from.x, to.x);
  const y = Math.min(from.y, to.y);
  const width = Math.abs(from.x - to.x);
  const height = Math.abs(from.y - to.y);

  context.fillStyle = getMaskColor(context, x, y, width, height);
  const widthMargin = Math.min(width / 2, 32);
  const heightMargin = Math.min(height / 2, 32);
  context.fillRect(
    x + Math.floor(widthMargin / 2),
    y + Math.floor(heightMargin / 2),
    width - widthMargin,
    height - heightMargin,
  );

  canvasRGB(context.canvas, x, y, width, height, 16);
};
