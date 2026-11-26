import { useEffect, useRef } from 'react';

export interface Ink {
  paper: string;
  paper2: string;
  ink: string;
  ink2: string;
  muted: string;
  rule: string;
  red: string;
  blue: string;
  hl: string;
  sans: string;
  mono: string;
}

let cached: Ink | null = null;
if (typeof window !== 'undefined') {
  window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener?.('change', () => (cached = null));
}

/** Colours come from the CSS variables, so figures follow light/dark mode. */
export function ink(): Ink {
  if (cached) return cached;
  const s = getComputedStyle(document.documentElement);
  const v = (n: string) => s.getPropertyValue(n).trim();
  cached = {
    paper: v('--paper'),
    paper2: v('--paper-2'),
    ink: v('--ink'),
    ink2: v('--ink-2'),
    muted: v('--muted'),
    rule: v('--rule'),
    red: v('--red'),
    blue: v('--blue'),
    hl: v('--hl'),
    sans: `12px ${v('--sans')}`,
    mono: `11px ${v('--mono')}`,
  };
  return cached;
}

/** Match the backing store to the element size (crisp on retina). */
export function fit(canvas: HTMLCanvasElement, aspect: number) {
  const w = Math.max(200, canvas.clientWidth);
  const h = Math.round(w * aspect);
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.height = h + 'px';
  }
  const ctx = canvas.getContext('2d')!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  return { ctx, w, h };
}

/** Run `frame(dt)` every animation frame while mounted. */
export function useFrame(frame: (dt: number) => void) {
  const ref = useRef(frame);
  ref.current = frame;
  useEffect(() => {
    let id = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ref.current(dt);
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);
}

export function arrow(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string, head = 7) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - head * Math.cos(a - 0.38), y2 - head * Math.sin(a - 0.38));
  ctx.lineTo(x2 - head * Math.cos(a + 0.38), y2 - head * Math.sin(a + 0.38));
  ctx.closePath();
  ctx.fill();
}

/** Engineering-drawing hatching below (or above) a horizontal line. */
export function hatch(ctx: CanvasRenderingContext2D, x1: number, x2: number, y: number, depth: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.rect(x1, Math.min(y, y + depth), x2 - x1, Math.abs(depth));
  ctx.clip();
  ctx.beginPath();
  for (let x = x1 - Math.abs(depth); x < x2 + Math.abs(depth); x += 7) {
    ctx.moveTo(x, y);
    ctx.lineTo(x - depth, y + depth);
  }
  ctx.stroke();
  ctx.restore();
}

/** A "nice" tick spacing: 1, 2 or 5 × 10^n. */
export function niceStep(range: number, target = 6) {
  const raw = range / target;
  const p = Math.pow(10, Math.floor(Math.log10(raw)));
  const m = raw / p;
  return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p;
}

export function fmt(x: number, digits = 3) {
  if (!isFinite(x)) return '—';
  if (x !== 0 && (Math.abs(x) >= 1e5 || Math.abs(x) < 1e-3)) return x.toExponential(2);
  return Number(x.toPrecision(digits)).toString();
}
