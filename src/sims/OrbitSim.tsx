import { useEffect, useMemo, useRef, useState } from 'react';
import { useLang, type Lang } from '../lib/i18n';
import { Check, Slider } from '../components/Control';
import { arrow, fit, fmt, ink, useFrame } from './canvas';

/* Units: GM = 1, launch radius r₀ = 1, so circular speed = 1 and T_circ = 2π. */
const PLANET_R = 0.12;
const SECTORS = 12;

const L: Record<Lang, Record<string, string>> = {
  en: {
    speed: 'Launch speed v / v_circ',
    dir: 'Launch direction (from radial)',
    areas: 'Shade equal-time areas (Kepler II)',
    vel: 'Show velocity',
    e: 'Eccentricity e',
    a: 'Semi-major axis a / r₀',
    T: 'Period T / T_circ',
    rp: 'Closest r / r₀',
    ra: 'Farthest r / r₀',
    E: 'Energy E (GM m / r₀)',
    unbound: 'unbound — escapes',
    crash: 'hits the planet',
    caption:
      'A small body launched from distance r₀ around a planet of mass M. The dashed curve is the conic section predicted from E and L; the moving body is integrated step by step and stays on it. With the shading on, each sector is swept in the same time T/12 — the long thin sectors far away have the same area as the short wide ones near the planet.',
  },
  mn: {
    speed: 'Анхны хурд v / v_тойрог',
    dir: 'Шидэх чиглэл (радиусаас)',
    areas: 'Тэнцүү хугацааны талбайг будах (Кеплер II)',
    vel: 'Хурдыг харуулах',
    e: 'Эксцентриситет e',
    a: 'Их хагас тэнхлэг a / r₀',
    T: 'Үе T / T_тойрог',
    rp: 'Хамгийн ойр r / r₀',
    ra: 'Хамгийн хол r / r₀',
    E: 'Энерги E (GM m / r₀)',
    unbound: 'холбоогүй — оргоно',
    crash: 'гариг дээр унана',
    caption:
      'M масстай гаригийн эргэн тойронд r₀ зайнаас хөөргөсөн жижиг бие. Тасархай муруй нь E ба L-ээс урьдчилан тооцсон конус огтлол; хөдөлж буй биеийг алхам алхмаар интегралчилсан бөгөөд яг тэр муруйгаар явна. Будалтыг асаавал сектор бүрийг ижил T/12 хугацаанд зурдаг — холын урт нарийн секторууд ойрын богино өргөн секторуудтай ижил талбайтай.',
  },
};

interface Orbit {
  e: number;
  a: number;
  p: number;
  omega: number; // argument of periapsis
  E: number;
  T: number; // NaN if unbound
  rp: number;
  ra: number;
}

function elements(vRatio: number, dirDeg: number): Orbit {
  const d = (dirDeg * Math.PI) / 180;
  const [x, y] = [1, 0];
  const [vx, vy] = [vRatio * Math.cos(d), vRatio * Math.sin(d)];
  const h = x * vy - y * vx;
  const E = 0.5 * vRatio * vRatio - 1;
  // eccentricity vector: (v × h) − r̂
  const ex = vy * h - x;
  const ey = -vx * h - y;
  const e = Math.hypot(ex, ey);
  const p = h * h;
  const a = -1 / (2 * E);
  const bound = E < 0;
  return {
    e,
    a,
    p,
    omega: Math.atan2(ey, ex),
    E,
    T: bound ? 2 * Math.PI * Math.pow(a, 1.5) : NaN,
    rp: p / (1 + e),
    ra: bound ? p / (1 - e) : Infinity,
  };
}

export default function OrbitSim() {
  const { lang } = useLang();
  const s = L[lang];
  const [v, setV] = useState(1.2);
  const [dir, setDir] = useState(90);
  const [areas, setAreas] = useState(true);
  const [showVel, setShowVel] = useState(true);
  const canvas = useRef<HTMLCanvasElement>(null);
  const orb = useMemo(() => elements(v, dir), [v, dir]);

  const st = useRef({ x: 1, y: 0, vx: 0, vy: 1, t: 0, dead: false, trail: [] as [number, number, number][] });
  const reset = () => {
    const d = (dir * Math.PI) / 180;
    st.current = { x: 1, y: 0, vx: v * Math.cos(d), vy: v * Math.sin(d), t: 0, dead: false, trail: [[1, 0, 0]] };
  };
  useEffect(() => {
    reset();
  }, [v, dir]);

  // the conic, sampled once per parameter change
  const curve = useMemo(() => {
    const pts: [number, number][] = [];
    for (let i = 0; i <= 720; i++) {
      const f = (i / 720) * 2 * Math.PI - Math.PI;
      const den = 1 + orb.e * Math.cos(f);
      if (den <= 0.02) {
        pts.push([NaN, NaN]);
        continue;
      }
      const r = orb.p / den;
      if (r > 30) {
        pts.push([NaN, NaN]);
        continue;
      }
      pts.push([r * Math.cos(f + orb.omega), r * Math.sin(f + orb.omega)]);
    }
    return pts;
  }, [orb]);

  // view box
  const view = useMemo(() => {
    const lim = orb.E < 0 ? Infinity : 5;
    let x0 = -PLANET_R,
      x1 = 1,
      y0 = -PLANET_R,
      y1 = PLANET_R;
    for (const [x, y] of curve) {
      if (!isFinite(x) || Math.hypot(x, y) > lim) continue;
      x0 = Math.min(x0, x);
      x1 = Math.max(x1, x);
      y0 = Math.min(y0, y);
      y1 = Math.max(y1, y);
    }
    return { x0, x1, y0, y1 };
  }, [curve, orb.E]);

  useFrame((dt) => {
    const c = canvas.current;
    if (!c) return;
    const S = st.current;
    const bound = orb.E < 0;
    const rate = bound ? Math.max(2 * Math.PI / 4, orb.T / 7) : 2 * Math.PI / 4;
    // advance: leapfrog with step ∝ r^1.5 (small near the planet)
    if (S.dead) {
      S.t += dt;
      if (S.t > 1.5) reset(); // pause on the surface, then try again
    } else {
      let left = dt * rate;
      while (left > 0) {
        const r = Math.hypot(S.x, S.y);
        const h = Math.min(left, 0.004 * Math.pow(r, 1.5));
        const a1 = -1 / (r * r * r);
        S.vx += 0.5 * h * a1 * S.x;
        S.vy += 0.5 * h * a1 * S.y;
        S.x += h * S.vx;
        S.y += h * S.vy;
        const r2 = Math.hypot(S.x, S.y);
        const a2 = -1 / (r2 * r2 * r2);
        S.vx += 0.5 * h * a2 * S.x;
        S.vy += 0.5 * h * a2 * S.y;
        S.t += h;
        left -= h;
        if (r2 < PLANET_R) {
          S.dead = true;
          S.t = 0;
          break;
        }
      }
      if (bound && S.t > orb.T) {
        // start a new lap: keep the integrated state, restart the area bookkeeping
        S.t -= orb.T;
        S.trail = [[S.x, S.y, S.t]];
      }
      if (!bound && Math.hypot(S.x, S.y) > 8) reset();
      S.trail.push([S.x, S.y, S.t]);
    }

    const { ctx, w, h } = fit(c, 0.62);
    const C = ink();
    const pad = 26;
    const sc = Math.min((w - 2 * pad) / (view.x1 - view.x0), (h - 2 * pad) / (view.y1 - view.y0));
    const cx = w / 2 - ((view.x0 + view.x1) / 2) * sc;
    const cy = h / 2 + ((view.y0 + view.y1) / 2) * sc;
    const X = (x: number) => cx + x * sc;
    const Y = (y: number) => cy - y * sc;

    // Kepler II sectors
    if (areas && bound && !S.dead) {
      const dT = orb.T / SECTORS;
      let k = -1;
      ctx.save();
      ctx.globalAlpha = 0.7;
      ctx.lineWidth = 0.8;
      for (let i = 0; i < S.trail.length; i++) {
        const [x, y, t] = S.trail[i];
        const kk = Math.floor(t / dT);
        if (kk !== k) {
          if (k >= 0) {
            ctx.lineTo(X(x), Y(y));
            ctx.closePath();
            ctx.fillStyle = k % 2 ? C.paper2 : C.hl;
            ctx.fill();
            ctx.strokeStyle = C.rule;
            ctx.stroke();
          }
          k = kk;
          ctx.beginPath();
          ctx.moveTo(X(0), Y(0));
          ctx.lineTo(X(x), Y(y));
        } else ctx.lineTo(X(x), Y(y));
      }
      ctx.closePath();
      ctx.fillStyle = k % 2 ? C.paper2 : C.hl;
      ctx.fill();
      ctx.restore();
    }

    // conic
    ctx.strokeStyle = C.ink2;
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    let pen = false;
    for (const [x, y] of curve) {
      if (!isFinite(x)) {
        pen = false;
        continue;
      }
      pen ? ctx.lineTo(X(x), Y(y)) : ctx.moveTo(X(x), Y(y));
      pen = true;
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // major axis and periapsis mark
    ctx.strokeStyle = C.muted;
    ctx.lineWidth = 0.8;
    ctx.setLineDash([1, 4]);
    const ux = Math.cos(orb.omega),
      uy = Math.sin(orb.omega);
    const far = bound ? orb.ra : 3;
    ctx.beginPath();
    ctx.moveTo(X(orb.rp * ux), Y(orb.rp * uy));
    ctx.lineTo(X(-far * ux), Y(-far * uy));
    ctx.stroke();
    ctx.setLineDash([]);
    if (bound && orb.e > 0.02) {
      // empty focus
      const fx = -2 * orb.a * orb.e * ux,
        fy = -2 * orb.a * orb.e * uy;
      ctx.strokeStyle = C.muted;
      ctx.beginPath();
      ctx.moveTo(X(fx) - 4, Y(fy));
      ctx.lineTo(X(fx) + 4, Y(fy));
      ctx.moveTo(X(fx), Y(fy) - 4);
      ctx.lineTo(X(fx), Y(fy) + 4);
      ctx.stroke();
    }

    // planet
    ctx.beginPath();
    ctx.arc(X(0), Y(0), Math.max(4, PLANET_R * sc), 0, Math.PI * 2);
    ctx.fillStyle = C.paper;
    ctx.fill();
    ctx.strokeStyle = C.ink;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.save();
    ctx.clip();
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    const pr = Math.max(4, PLANET_R * sc);
    for (let k = -pr * 2; k < pr * 2; k += 4) {
      ctx.moveTo(X(0) + k - pr, Y(0) + pr);
      ctx.lineTo(X(0) + k + pr, Y(0) - pr);
    }
    ctx.stroke();
    ctx.restore();

    // launch point
    ctx.fillStyle = C.ink;
    ctx.font = C.mono;
    ctx.fillText('r₀', X(1) + 6, Y(0) + 14);

    // body
    const bx = X(S.x),
      by = Y(S.y);
    ctx.strokeStyle = C.muted;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(X(0), Y(0));
    ctx.lineTo(bx, by);
    ctx.stroke();
    if (showVel && !S.dead) arrow(ctx, bx, by, bx + S.vx * 60, by - S.vy * 60, C.blue);
    ctx.beginPath();
    ctx.arc(bx, by, 5, 0, Math.PI * 2);
    ctx.fillStyle = S.dead ? C.paper : C.red;
    ctx.strokeStyle = C.red;
    ctx.lineWidth = 1.5;
    ctx.fill();
    ctx.stroke();
  });

  const bound = orb.E < 0;
  const crash = orb.rp < PLANET_R && (bound || dir > 90);
  return (
    <figure className="figure">
      <div className="figure-grid">
        <div className="canvas-frame">
          <canvas ref={canvas} aria-label="orbit" />
        </div>
        <div className="controls">
          <Slider label={s.speed} value={v} min={0.2} max={1.7} step={0.01} onChange={setV} format={(x) => x.toFixed(2)} />
          <Slider label={s.dir} value={dir} min={20} max={160} step={1} onChange={setDir} format={(x) => `${x}°`} />
          <Check label={s.areas} checked={areas} onChange={setAreas} />
          <Check label={s.vel} checked={showVel} onChange={setShowVel} />
          <div className="btn-row" style={{ marginTop: '0.8rem' }}>
            <button className="btn ghost" onClick={reset}>
              {lang === 'mn' ? 'Шинэчлэх' : 'Reset'}
            </button>
          </div>
          <table className="readout">
            <tbody>
              <tr>
                <th>{s.e}</th>
                <td>{orb.e.toFixed(3)}</td>
              </tr>
              <tr>
                <th>{s.E}</th>
                <td>{orb.E.toFixed(3)}</td>
              </tr>
              <tr>
                <th>{s.a}</th>
                <td>{bound ? fmt(orb.a) : '—'}</td>
              </tr>
              <tr>
                <th>{s.T}</th>
                <td>{bound ? fmt(orb.T / (2 * Math.PI)) : '—'}</td>
              </tr>
              <tr>
                <th>{s.rp}</th>
                <td>{fmt(orb.rp)}</td>
              </tr>
              <tr>
                <th>{s.ra}</th>
                <td>{bound ? fmt(orb.ra) : '∞'}</td>
              </tr>
            </tbody>
          </table>
          {(!bound || crash) && (
            <p className="verdict no" style={{ fontSize: '0.85rem' }}>
              {crash ? s.crash : s.unbound}
            </p>
          )}
        </div>
      </div>
      <figcaption>{s.caption}</figcaption>
    </figure>
  );
}
