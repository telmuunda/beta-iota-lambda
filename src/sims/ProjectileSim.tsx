import { useMemo, useRef, useState } from 'react';
import { useLang, type Lang } from '../lib/i18n';
import { Check, Slider } from '../components/Control';
import { arrow, fit, fmt, hatch, ink, niceStep, useFrame } from './canvas';

const G = 9.81;

const L: Record<Lang, Record<string, string>> = {
  en: {
    v0: 'Launch speed v₀',
    angle: 'Angle θ',
    h: 'Launch height h',
    k: 'Drag k = c/m',
    env: 'Show envelope (all angles, no air)',
    vac: 'Show trajectory without air',
    readout: 'Readout',
    noAir: 'no air',
    air: 'with drag',
    range: 'Range',
    hmax: 'Max height',
    time: 'Flight time',
    best: 'Best angle',
    keyAir: 'with drag',
    keyVac: 'no air',
    keyEnv: 'envelope',
    caption:
      'A projectile launched from height h. The drag force is taken as quadratic, F = c v², so the acceleration is −k|v|v with k = c/m. The dotted curve is the envelope of all no-air trajectories at this speed: no point outside it can be reached.',
  },
  mn: {
    v0: 'Анхны хурд v₀',
    angle: 'Өнцөг θ',
    h: 'Шидэх өндөр h',
    k: 'Эсэргүүцэл k = c/m',
    env: 'Бүрхүүл муруйг харуулах (агааргүй)',
    vac: 'Агааргүй траекторийг харуулах',
    readout: 'Үр дүн',
    noAir: 'агааргүй',
    air: 'эсэргүүцэлтэй',
    range: 'Тусгал',
    hmax: 'Хамгийн их өндөр',
    time: 'Нислэгийн хугацаа',
    best: 'Хамгийн сайн өнцөг',
    keyAir: 'эсэргүүцэлтэй',
    keyVac: 'агааргүй',
    keyEnv: 'бүрхүүл',
    caption:
      'h өндрөөс шидсэн бие. Агаарын эсэргүүцлийг квадрат, F = c v² гэж авсан тул хурдатгал нь −k|v|v, k = c/m. Цэгэн муруй нь энэ хурдтай бүх агааргүй траекторийн бүрхүүл юм: түүнээс гадна орших цэгт хүрэх боломжгүй.',
  },
};

interface Path {
  pts: [number, number, number][]; // t, x, y
  range: number;
  hmax: number;
  T: number;
}

function simulate(v0: number, deg: number, h: number, k: number, samples = 900): Path {
  const th = (deg * Math.PI) / 180;
  let x = 0,
    y = h,
    vx = v0 * Math.cos(th),
    vy = v0 * Math.sin(th),
    t = 0;
  const Test = (v0 * Math.sin(th) + Math.sqrt((v0 * Math.sin(th)) ** 2 + 2 * G * h)) / G || 1;
  const dt = Math.max(Test / samples, 1e-4);
  const acc = (vx: number, vy: number) => {
    const s = Math.hypot(vx, vy);
    return [-k * s * vx, -G - k * s * vy];
  };
  const pts: [number, number, number][] = [[0, x, y]];
  let hmax = y;
  for (let i = 0; i < 20000; i++) {
    // RK4 on (x, y, vx, vy)
    const [a1x, a1y] = acc(vx, vy);
    const [a2x, a2y] = acc(vx + (a1x * dt) / 2, vy + (a1y * dt) / 2);
    const [a3x, a3y] = acc(vx + (a2x * dt) / 2, vy + (a2y * dt) / 2);
    const [a4x, a4y] = acc(vx + a3x * dt, vy + a3y * dt);
    const nx = x + (dt / 6) * (vx + 2 * (vx + (a1x * dt) / 2) + 2 * (vx + (a2x * dt) / 2) + (vx + a3x * dt));
    const ny = y + (dt / 6) * (vy + 2 * (vy + (a1y * dt) / 2) + 2 * (vy + (a2y * dt) / 2) + (vy + a3y * dt));
    vx += (dt / 6) * (a1x + 2 * a2x + 2 * a3x + a4x);
    vy += (dt / 6) * (a1y + 2 * a2y + 2 * a3y + a4y);
    if (ny < 0) {
      const f = y / (y - ny);
      const tx = x + f * (nx - x);
      pts.push([t + f * dt, tx, 0]);
      return { pts, range: tx, hmax, T: t + f * dt };
    }
    x = nx;
    y = ny;
    t += dt;
    hmax = Math.max(hmax, y);
    pts.push([t, x, y]);
  }
  return { pts, range: x, hmax, T: t };
}

function bestAngle(v0: number, h: number, k: number) {
  let best = 0,
    bestR = -1;
  for (let a = 1; a < 89.5; a += 0.5) {
    const r = simulate(v0, a, h, k, 250).range;
    if (r > bestR) {
      bestR = r;
      best = a;
    }
  }
  // refine
  for (let a = best - 0.5; a <= best + 0.5; a += 0.05) {
    const r = simulate(v0, a, h, k, 500).range;
    if (r > bestR) {
      bestR = r;
      best = a;
    }
  }
  return best;
}

export default function ProjectileSim() {
  const { lang } = useLang();
  const s = L[lang];
  const [v0, setV0] = useState(20);
  const [deg, setDeg] = useState(50);
  const [h, setH] = useState(0);
  const [k, setK] = useState(0.02);
  const [showEnv, setShowEnv] = useState(true);
  const [showVac, setShowVac] = useState(true);
  const canvas = useRef<HTMLCanvasElement>(null);
  const anim = useRef<number | null>(null);

  const air = useMemo(() => simulate(v0, deg, h, k), [v0, deg, h, k]);
  const vac = useMemo(() => simulate(v0, deg, h, 0), [v0, deg, h]);
  const best = useMemo(() => ({ air: bestAngle(v0, h, k), vac: (Math.atan(v0 / Math.sqrt(v0 * v0 + 2 * G * h)) * 180) / Math.PI }), [v0, h, k]);

  useFrame((dt) => {
    const c = canvas.current;
    if (!c) return;
    const { ctx, w, h: H } = fit(c, 0.56);
    const C = ink();

    // world box fixed by speed & height so the picture does not jump while you change the angle
    const Rmax = (v0 / G) * Math.sqrt(v0 * v0 + 2 * G * h);
    const Ymax = h + (v0 * v0) / (2 * G);
    const padL = 44,
      padB = 34,
      padT = 16,
      padR = 16;
    const sc = Math.min((w - padL - padR) / (Rmax * 1.06), (H - padB - padT) / (Ymax * 1.1));
    const X = (x: number) => padL + x * sc;
    const Y = (y: number) => H - padB - y * sc;

    // axes and ticks
    ctx.font = C.mono;
    ctx.fillStyle = C.muted;
    ctx.strokeStyle = C.rule;
    ctx.lineWidth = 1;
    const step = niceStep(Math.max(Rmax, Ymax) * 1.1, 7);
    ctx.textAlign = 'center';
    for (let x = step; X(x) < w - padR; x += step) {
      ctx.beginPath();
      ctx.moveTo(X(x), Y(0));
      ctx.lineTo(X(x), Y(0) + 4);
      ctx.stroke();
      ctx.fillText(fmt(x), X(x), Y(0) + 16);
    }
    ctx.textAlign = 'right';
    for (let y = step; Y(y) > padT; y += step) {
      ctx.beginPath();
      ctx.moveTo(padL - 4, Y(y));
      ctx.lineTo(padL, Y(y));
      ctx.stroke();
      ctx.fillText(fmt(y), padL - 7, Y(y) + 4);
    }
    ctx.textAlign = 'left';
    ctx.fillText('m', w - padR - 8, Y(0) + 28);

    // ground
    ctx.strokeStyle = C.ink;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(padL - 10, Y(0));
    ctx.lineTo(w, Y(0));
    ctx.stroke();
    hatch(ctx, padL - 10, w, Y(0), 8, C.muted);

    // tower
    if (h > 0) {
      ctx.strokeStyle = C.ink;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.rect(X(0) - 10, Y(h), 10, Y(0) - Y(h));
      ctx.stroke();
      ctx.save();
      ctx.beginPath();
      ctx.rect(X(0) - 10, Y(h), 10, Y(0) - Y(h));
      ctx.clip();
      ctx.strokeStyle = C.muted;
      ctx.beginPath();
      for (let y = Y(h) - 10; y < Y(0) + 10; y += 6) {
        ctx.moveTo(X(0) - 10, y + 10);
        ctx.lineTo(X(0), y);
      }
      ctx.stroke();
      ctx.restore();
    }

    // envelope of safety: y = h + v²/2g − g x²/2v²
    if (showEnv) {
      ctx.strokeStyle = C.muted;
      ctx.setLineDash([1.5, 4]);
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      for (let i = 0; i <= 120; i++) {
        const x = (Rmax * i) / 120;
        const y = Ymax - (G * x * x) / (2 * v0 * v0);
        i ? ctx.lineTo(X(x), Y(y)) : ctx.moveTo(X(x), Y(y));
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    const drawPath = (p: Path, color: string, dash: number[], upto = Infinity) => {
      ctx.strokeStyle = color;
      ctx.setLineDash(dash);
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      p.pts.forEach(([t, x, y], i) => {
        if (t > upto) return;
        i ? ctx.lineTo(X(x), Y(y)) : ctx.moveTo(X(x), Y(y));
      });
      ctx.stroke();
      ctx.setLineDash([]);
    };
    const at = (p: Path, t: number) => {
      const pts = p.pts;
      let i = 0;
      while (i < pts.length - 1 && pts[i + 1][0] < t) i++;
      return pts[Math.min(i + 1, pts.length - 1)];
    };

    let t: number | null = anim.current;
    if (t !== null) {
      t += dt;
      anim.current = t > Math.max(air.T, vac.T) + 0.8 ? null : t;
    }
    const upto = t ?? Infinity;
    if (showVac) drawPath(vac, C.ink2, [6, 5], upto);
    drawPath(air, C.red, [], upto);

    // launch arrow and angle
    const th = (deg * Math.PI) / 180;
    const len = 46;
    ctx.strokeStyle = C.ink;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(X(0), Y(h), 26, -th, 0);
    ctx.stroke();
    ctx.fillStyle = C.ink;
    ctx.font = `italic 13px ${getComputedStyle(document.body).fontFamily}`;
    ctx.fillText('θ', X(0) + 30 * Math.cos(th / 2) + 2, Y(h) - 30 * Math.sin(th / 2) + 5);
    arrow(ctx, X(0), Y(h), X(0) + len * Math.cos(th), Y(h) - len * Math.sin(th), C.blue);

    // balls
    if (t !== null) {
      const dot = (p: Path, fill: boolean, color: string) => {
        const [, x, y] = at(p, t!);
        ctx.beginPath();
        ctx.arc(X(x), Y(y), 5, 0, Math.PI * 2);
        ctx.fillStyle = fill ? color : C.paper;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.fill();
        ctx.stroke();
      };
      if (showVac) dot(vac, false, C.ink2);
      dot(air, true, C.red);
    } else {
      // range markers
      const tick = (x: number, color: string) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(X(x), Y(0) - 6);
        ctx.lineTo(X(x), Y(0) + 6);
        ctx.stroke();
      };
      if (showVac) tick(vac.range, C.ink2);
      tick(air.range, C.red);
    }
  });

  const deg1 = (x: number) => x.toFixed(1) + '°';
  return (
    <figure className="figure">
      <div className="figure-grid">
        <div>
          <div className="canvas-frame">
            <canvas ref={canvas} aria-label="projectile trajectory" />
          </div>
          <div className="key">
            <span className="red">{s.keyAir}</span>
            {showVac && <span className="dashed">{s.keyVac}</span>}
            {showEnv && <span className="dotted">{s.keyEnv}</span>}
          </div>
        </div>
        <div className="controls">
          <Slider label={s.v0} value={v0} min={5} max={40} step={0.5} onChange={setV0} format={(v) => `${v} m/s`} />
          <Slider label={s.angle} value={deg} min={1} max={89} step={0.5} onChange={setDeg} format={(v) => `${v}°`} />
          <Slider label={s.h} value={h} min={0} max={30} step={0.5} onChange={setH} format={(v) => `${v} m`} />
          <Slider label={s.k} value={k} min={0} max={0.1} step={0.002} onChange={setK} format={(v) => `${v.toFixed(3)} m⁻¹`} />
          <Check label={s.vac} checked={showVac} onChange={setShowVac} />
          <Check label={s.env} checked={showEnv} onChange={setShowEnv} />
          <div className="btn-row" style={{ marginTop: '0.8rem' }}>
            <button className="btn" onClick={() => (anim.current = 0)}>
              {lang === 'mn' ? 'Шидэх' : 'Launch'}
            </button>
          </div>
          <table className="readout">
            <thead>
              <tr>
                <th></th>
                <th>{s.noAir}</th>
                <th>{s.air}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>{s.range}</th>
                <td>{fmt(vac.range)} m</td>
                <td>{fmt(air.range)} m</td>
              </tr>
              <tr>
                <th>{s.hmax}</th>
                <td>{fmt(vac.hmax)} m</td>
                <td>{fmt(air.hmax)} m</td>
              </tr>
              <tr>
                <th>{s.time}</th>
                <td>{fmt(vac.T)} s</td>
                <td>{fmt(air.T)} s</td>
              </tr>
              <tr>
                <th>{s.best}</th>
                <td>{deg1(best.vac)}</td>
                <td>{deg1(best.air)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <figcaption>{s.caption}</figcaption>
    </figure>
  );
}
