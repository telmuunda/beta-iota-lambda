import { useEffect, useRef, useState } from 'react';
import { useLang, type Lang } from '../lib/i18n';
import { Check, Slider } from '../components/Control';
import { arrow, fit, fmt, hatch, ink, useFrame } from './canvas';

const G = 9.81;

const L: Record<Lang, Record<string, string>> = {
  en: {
    amp: 'Amplitude θ₀',
    len: 'Length ℓ',
    ghost: 'Show small-angle pendulum',
    vel: 'Show velocity',
    T0: 'Small-angle period T₀',
    T: 'True period T',
    ratio: 'T / T₀',
    series: 'Series 1 + θ₀²/16',
    graphA: 'θ(t)',
    graphB: 'T/T₀ against θ₀',
    keyTrue: 'true pendulum',
    keyLin: 'small-angle approximation',
    caption:
      'A simple pendulum released from rest at θ₀. The filled bob obeys θ̈ = −(g/ℓ) sin θ exactly; the hollow one obeys θ̈ = −(g/ℓ) θ. Below 10° they stay together for many swings. At large amplitudes the true pendulum falls behind — its period grows without bound as θ₀ → 180°.',
  },
  mn: {
    amp: 'Далайц θ₀',
    len: 'Урт ℓ',
    ghost: 'Бага өнцгийн дүүжинг харуулах',
    vel: 'Хурдыг харуулах',
    T0: 'Бага өнцгийн үе T₀',
    T: 'Жинхэнэ үе T',
    ratio: 'T / T₀',
    series: 'Цуваа 1 + θ₀²/16',
    graphA: 'θ(t)',
    graphB: 'T/T₀ ба θ₀',
    keyTrue: 'жинхэнэ дүүжин',
    keyLin: 'бага өнцгийн ойролцоолол',
    caption:
      'θ₀ өнцгөөс тайван байдлаас тавьсан энгийн дүүжин. Дүүрэн бөмбөлөг θ̈ = −(g/ℓ) sin θ тэгшитгэлийг яг дагадаг; хөндий нь θ̈ = −(g/ℓ) θ-г дагадаг. 10°-аас бага үед олон хэлбэлзлийн турш хамт явна. Их далайцтай үед жинхэнэ дүүжин хоцордог — θ₀ → 180° үед үе нь хязгааргүй өсдөг.',
  },
};

/** Arithmetic–geometric mean: T = T₀ / AGM(1, cos(θ₀/2)). */
function agm(a: number, b: number) {
  for (let i = 0; i < 30 && Math.abs(a - b) > 1e-15; i++) [a, b] = [(a + b) / 2, Math.sqrt(a * b)];
  return a;
}
export const periodRatio = (theta0: number) => 1 / agm(1, Math.cos(theta0 / 2));

export default function PendulumSim() {
  const { lang } = useLang();
  const s = L[lang];
  const [ampDeg, setAmpDeg] = useState(60);
  const [len, setLen] = useState(1);
  const [ghost, setGhost] = useState(true);
  const [showVel, setShowVel] = useState(false);
  const [running, setRunning] = useState(true);
  const left = useRef<HTMLCanvasElement>(null);
  const right = useRef<HTMLCanvasElement>(null);
  const st = useRef({ t: 0, th: 1, om: 0, hist: [] as [number, number, number][] });

  const th0 = (ampDeg * Math.PI) / 180;
  const w0 = Math.sqrt(G / len);
  const T0 = (2 * Math.PI) / w0;
  const ratio = periodRatio(th0);

  const reset = () => (st.current = { t: 0, th: th0, om: 0, hist: [[0, th0, th0]] });
  useEffect(() => {
    reset();
  }, [th0, len]);

  useFrame((dt) => {
    const S = st.current;
    if (running) {
      const n = 20,
        h = dt / n;
      const f = (th: number) => -(w0 * w0) * Math.sin(th);
      for (let i = 0; i < n; i++) {
        // RK4 for θ'' = f(θ)
        const k1t = S.om,
          k1o = f(S.th);
        const k2t = S.om + (h / 2) * k1o,
          k2o = f(S.th + (h / 2) * k1t);
        const k3t = S.om + (h / 2) * k2o,
          k3o = f(S.th + (h / 2) * k2t);
        const k4t = S.om + h * k3o,
          k4o = f(S.th + h * k3t);
        S.th += (h / 6) * (k1t + 2 * k2t + 2 * k3t + k4t);
        S.om += (h / 6) * (k1o + 2 * k2o + 2 * k3o + k4o);
      }
      S.t += dt;
      S.hist.push([S.t, S.th, th0 * Math.cos(w0 * S.t)]);
      const win = 3 * T0 * Math.max(1, ratio);
      while (S.hist.length && S.hist[0][0] < S.t - win) S.hist.shift();
    }
    const C = ink();
    const thLin = th0 * Math.cos(w0 * S.t);

    // ---- left: the pendulum ----
    if (left.current) {
      const { ctx, w, h } = fit(left.current, 0.9);
      const px = w / 2,
        py = h * 0.42;
      const R = Math.min(w * 0.42, h * 0.52) * Math.min(1, 0.45 + len / 3);
      // ceiling
      ctx.strokeStyle = C.ink;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(px - 30, py);
      ctx.lineTo(px + 30, py);
      ctx.stroke();
      hatch(ctx, px - 30, px + 30, py, -8, C.muted);
      // amplitude arc and vertical
      ctx.setLineDash([2, 4]);
      ctx.strokeStyle = C.muted;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px, py + R + 14);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(px, py, R, Math.PI / 2 - th0, Math.PI / 2 + th0);
      ctx.stroke();
      ctx.setLineDash([]);
      const bob = (th: number, filled: boolean, color: string) => {
        const bx = px + R * Math.sin(th),
          by = py + R * Math.cos(th);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(bx, by);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(bx, by, 9, 0, Math.PI * 2);
        ctx.fillStyle = filled ? color : C.paper;
        ctx.fill();
        ctx.lineWidth = 1.6;
        ctx.stroke();
        return [bx, by];
      };
      if (ghost) bob(thLin, false, C.blue);
      const [bx, by] = bob(S.th, true, C.ink);
      if (showVel) {
        const v = S.om * R * 0.25; // arrow ∝ speed: shows where in the swing it is fastest
        arrow(ctx, bx, by, bx + v * Math.cos(S.th), by - v * Math.sin(S.th), C.red);
      }
      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fillStyle = C.ink;
      ctx.fill();
    }

    // ---- right: θ(t) and T/T₀(θ₀) ----
    if (right.current) {
      const { ctx, w, h } = fit(right.current, 0.9);
      const pad = 34;
      const h1 = h * 0.52;
      ctx.font = C.sans;
      ctx.fillStyle = C.ink2;
      ctx.fillText(s.graphA, pad, 18);
      // axes A
      const midY = 22 + (h1 - 22) / 2,
        ampPx = (h1 - 40) / 2;
      ctx.strokeStyle = C.rule;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad, midY);
      ctx.lineTo(w - 10, midY);
      ctx.moveTo(pad, 26);
      ctx.lineTo(pad, h1 - 6);
      ctx.stroke();
      ctx.font = C.mono;
      ctx.fillStyle = C.muted;
      ctx.textAlign = 'right';
      ctx.fillText(`${ampDeg}°`, pad - 4, midY - ampPx + 4);
      ctx.fillText(`−${ampDeg}°`, pad - 4, midY + ampPx + 4);
      ctx.textAlign = 'left';
      const hist = S.hist;
      if (hist.length > 1) {
        const win = 3 * T0 * Math.max(1, ratio);
        const t1 = Math.max(S.t, win);
        const X = (t: number) => pad + ((t - (t1 - win)) / win) * (w - 10 - pad);
        const line = (idx: 1 | 2, color: string, dash: number[]) => {
          ctx.strokeStyle = color;
          ctx.setLineDash(dash);
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          hist.forEach((p, i) => {
            const y = midY - (p[idx] / th0) * ampPx;
            i ? ctx.lineTo(X(p[0]), y) : ctx.moveTo(X(p[0]), y);
          });
          ctx.stroke();
          ctx.setLineDash([]);
        };
        if (ghost) line(2, C.blue, [5, 4]);
        line(1, C.ink, []);
      }

      // graph B: T/T0 vs θ0
      const top = h1 + 14,
        bot = h - 22,
        right0 = w - 24;
      ctx.font = C.sans;
      ctx.fillStyle = C.ink2;
      ctx.fillText(s.graphB, pad, top + 4);
      const maxR = 2.5;
      const X2 = (d: number) => pad + (d / 180) * (right0 - pad);
      const Y2 = (r: number) => bot - ((r - 1) / (maxR - 1)) * (bot - top - 14);
      ctx.strokeStyle = C.rule;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad, top + 10);
      ctx.lineTo(pad, bot);
      ctx.lineTo(right0, bot);
      ctx.stroke();
      ctx.font = C.mono;
      ctx.fillStyle = C.muted;
      [0, 90, 180].forEach((d) => {
        ctx.textAlign = 'center';
        ctx.fillText(`${d}°`, X2(d), bot + 14);
      });
      ctx.textAlign = 'right';
      [1, 2].forEach((r) => ctx.fillText(String(r), pad - 4, Y2(r) + 4));
      ctx.textAlign = 'left';
      // series approx
      ctx.strokeStyle = C.muted;
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      for (let d = 0; d <= 180; d += 2) {
        const r = 1 + ((d * Math.PI) / 180) ** 2 / 16;
        d ? ctx.lineTo(X2(d), Y2(Math.min(r, maxR))) : ctx.moveTo(X2(d), Y2(r));
      }
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeStyle = C.ink;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      for (let d = 0; d <= 179; d += 1) {
        const r = Math.min(periodRatio((d * Math.PI) / 180), maxR);
        d ? ctx.lineTo(X2(d), Y2(r)) : ctx.moveTo(X2(d), Y2(r));
      }
      ctx.stroke();
      // marker
      const mr = Math.min(ratio, maxR);
      ctx.strokeStyle = C.red;
      ctx.setLineDash([2, 3]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(X2(ampDeg), bot);
      ctx.lineTo(X2(ampDeg), Y2(mr));
      ctx.lineTo(pad, Y2(mr));
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(X2(ampDeg), Y2(mr), 4, 0, Math.PI * 2);
      ctx.fillStyle = C.red;
      ctx.fill();
    }
  });

  return (
    <figure className="figure">
      <div className="figure-grid">
        <div>
          <div className="canvas-frame canvas-pair">
            <div>
              <canvas ref={left} aria-label="pendulum" />
            </div>
            <div>
              <canvas ref={right} aria-label="graphs" />
            </div>
          </div>
          <div className="key">
            <span>{s.keyTrue}</span>
            {ghost && <span className="dashed blue">{s.keyLin}</span>}
          </div>
        </div>
        <div className="controls">
          <Slider label={s.amp} value={ampDeg} min={1} max={179} step={1} onChange={setAmpDeg} format={(v) => `${v}°`} />
          <Slider label={s.len} value={len} min={0.2} max={3} step={0.05} onChange={setLen} format={(v) => `${v.toFixed(2)} m`} />
          <Check label={s.ghost} checked={ghost} onChange={setGhost} />
          <Check label={s.vel} checked={showVel} onChange={setShowVel} />
          <div className="btn-row" style={{ marginTop: '0.8rem' }}>
            <button className="btn" onClick={() => setRunning((r) => !r)}>
              {running ? (lang === 'mn' ? 'Зогсоох' : 'Pause') : lang === 'mn' ? 'Эхлүүлэх' : 'Play'}
            </button>
            <button className="btn ghost" onClick={reset}>
              {lang === 'mn' ? 'Шинэчлэх' : 'Reset'}
            </button>
          </div>
          <table className="readout">
            <tbody>
              <tr>
                <th>{s.T0}</th>
                <td>{fmt(T0, 4)} s</td>
              </tr>
              <tr>
                <th>{s.T}</th>
                <td>{fmt(T0 * ratio, 4)} s</td>
              </tr>
              <tr>
                <th>{s.ratio}</th>
                <td>{ratio.toFixed(4)}</td>
              </tr>
              <tr>
                <th>{s.series}</th>
                <td>{(1 + th0 * th0 / 16).toFixed(4)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <figcaption>{s.caption}</figcaption>
    </figure>
  );
}
