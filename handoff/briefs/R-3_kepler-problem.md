# Brief R-3 — Gravitation and the Kepler problem

**Handoff ID:** `R-3`
**Plan task:** expand existing note
**Target file:** `content/notes/kepler-problem.md`

> **This replaces an existing, shorter note** (included at the end of this brief). Keep what is good in it, but rewrite and greatly extend it.

Write the note described below, following the project instructions exactly.

## 1. Header and frontmatter (copy exactly; fill in the two summaries)

```
<!-- handoff: R-3 → content/notes/kepler-problem.md -->
---
topic: gravitation
order: 30
sim: orbit
summary_en: (fill in)
summary_mn: (fill in)
---
```

## 2. Titles

- English: **Gravitation and the Kepler problem**
- Mongolian (suggested; improve if you know a better standard term): **Таталцал ба Кеплерийн бодлого**

## 3. Goal

After reading, a student can: Solve orbital problems with conservation laws, and know the gravitational field of extended bodies.

## 4. Sections (in this order, as `##` headings, in both languages)

1. **Newton's law of gravitation** — Field and potential of a point mass; shell theorem derived (by integration or Gauss's law for gravity); field inside a uniform Earth; tunnel through the Earth as SHM.
2. **Circular orbits and escape** — Orbital speed, period, energies; escape velocity derived; geostationary orbit numbers.
3. **The Kepler problem by conservation laws** — Keep and expand the existing material: effective potential, turning points, $E = -GMm/2a$, vis-viva — every step derived.
4. **The shape of the orbit** — Derive the orbit equation $r = p/(1 + e\cos\varphi)$ (via the Laplace–Runge–Lenz vector or the Binet equation); eccentricity from $E$ and $L$.
5. **Kepler's laws** — Second law from angular momentum; third law derived; radial fall time trick (keep).
6. **Transfers and two-body problems** — Hohmann transfer $\Delta v$ derived; reduced mass and the two-body problem; binary stars.

Finish each language with a `:::summary` block and a `## Further reading` section listing the books from this project you used (author, title, chapter).

## 5. Derivations that must appear (each in a `:::derivation` block)

- Shell theorem
- Escape velocity
- $E = -GMm/2a$ and vis-viva
- Orbit equation
- Hohmann transfer

## 6. Worked examples (each in a `:::example` block, full solution with numbers)

- Hohmann transfer from Earth to Mars: Δv and time
- Binary star masses from period and separation

## 7. Check-yourself questions (each `:::check` followed by `:::answer`)

- Why does a satellite speed up when atmospheric drag acts on it?
- Is the speed at perihelion or aphelion larger? By how much?
- What happens to a satellite's orbit if its speed is suddenly doubled?

## 8. Common mistakes (`:::pitfall`)

- Using the mass of the satellite instead of the reduced mass in a binary system

## 9. Links you may use (and no others)

- Problem: `#/problems/p06-escape-kick`
- Problem: `#/problems/p07-comet`
- Note: `#/notes/momentum-and-collisions` (Momentum and collisions)
- Simulation: `#/lab/orbit`

## 10. Length

2,500–4,500 words per language. If you must cut, keep the derivations and drop breadth, and list what you dropped in the closing `<!-- omitted: … -->` comment.

## 11. The current note (to expand)

````markdown
---
topic: gravitation
order: 30
sim: orbit
summary_en: Two conservation laws are enough to find any orbit without solving a differential equation. Effective potential, vis-viva, and why the period only cares about a.
summary_mn: Дифференциал тэгшитгэл бодолгүйгээр аливаа тойрог замыг олоход хоёр хадгалалтын хууль хангалттай. Эффектив потенциал, вис-вива, яагаад үе зөвхөн a-аас хамаардаг вэ.
---

<!-- en -->
# The Kepler problem without differential equations

## Two conserved quantities

A body of mass $m$ moving around a much heavier mass $M$ feels a central force, so its
angular momentum $L = m r^2\dot\varphi$ is constant, as is its energy

$$
E = \tfrac12 m\dot r^2 + \frac{L^2}{2mr^2} - \frac{GMm}{r}.
$$

The last two terms together form the **effective potential** $U_{\text{eff}}(r)$. The radial
motion is a one-dimensional problem in $U_{\text{eff}}$: the body moves where $E \ge U_{\text{eff}}$,
and turns around (at periapsis and apoapsis) where $E = U_{\text{eff}}$, i.e. where $\dot r = 0$.

## Turning points and the semi-major axis

Setting $\dot r = 0$ gives a quadratic in $r$:

$$
E r^2 + GMm\, r - \frac{L^2}{2m} = 0 .
$$

By Vieta, the two roots satisfy $r_p + r_a = -GMm/E$. But $r_p + r_a = 2a$, so

$$
E = -\frac{GMm}{2a}.
$$

**The energy depends only on the semi-major axis**, not on the shape. From this, the
*vis-viva* equation follows immediately:

$$
v^2 = GM\left(\frac{2}{r} - \frac{1}{a}\right).
$$

## Which conic?

| Energy | Orbit | Speed at distance $r$ |
|---|---|---|
| $E < 0$ | ellipse (circle if $e = 0$) | $v < \sqrt{2GM/r}$ |
| $E = 0$ | parabola | $v = \sqrt{2GM/r}$ |
| $E > 0$ | hyperbola | $v > \sqrt{2GM/r}$ |

The eccentricity is $e = \sqrt{1 + \dfrac{2EL^2}{G^2M^2m^3}}$. In the simulation, launching
sideways at $v/v_{\text{circ}}$ gives $e = |v^2/v_{\text{circ}}^2 - 1|$ — check it.

## Kepler's second and third laws

The area swept per unit time is $\dfrac{dA}{dt} = \dfrac{L}{2m}$ — constant, which is the
second law and nothing more than angular momentum conservation. Integrating over one period,
the whole ellipse $\pi a b$ is swept in time $T$:

$$
T = \frac{2m\,\pi a b}{L}.
$$

Using $b^2 = a\, p$ with $p = L^2/(GMm^2)$ gives

$$
T^2 = \frac{4\pi^2}{GM}a^3 .
$$

> A radial fall from rest at distance $R$ is a degenerate ellipse with $e \to 1$ and
> $a = R/2$. The fall time is therefore **half the period of that ellipse**:
> $t = \tfrac12 T = \pi\sqrt{a^3/GM} = \pi\sqrt{R^3/(8GM)}$. No integration needed.

<!-- mn -->
# Дифференциал тэгшитгэлгүй Кеплерийн бодлого

## Хоёр хадгалагдах хэмжигдэхүүн

Хамаагүй хүнд $M$ массын эргэн тойронд хөдөлж буй $m$ масстай биед төвийн хүч үйлчилнэ,
тиймээс импульсийн момент $L = m r^2\dot\varphi$ тогтмол, мөн энерги нь

$$
E = \tfrac12 m\dot r^2 + \frac{L^2}{2mr^2} - \frac{GMm}{r}
$$

тогтмол. Сүүлийн хоёр гишүүн хамтдаа **эффектив потенциал** $U_{\text{eff}}(r)$-г үүсгэнэ.
Радиал хөдөлгөөн нь $U_{\text{eff}}$ дахь нэг хэмжээст бодлого: бие $E \ge U_{\text{eff}}$
мужид хөдөлж, $E = U_{\text{eff}}$, өөрөөр хэлбэл $\dot r = 0$ цэгүүдэд (перицентр ба апоцентрт)
эргэж буцна.

## Эргэх цэгүүд ба их хагас тэнхлэг

$\dot r = 0$ гэж тавибал $r$-ийн квадрат тэгшитгэл гарна:

$$
E r^2 + GMm\, r - \frac{L^2}{2m} = 0 .
$$

Виетийн теоремоор хоёр язгуур $r_p + r_a = -GMm/E$ нөхцлийг хангана. Гэтэл
$r_p + r_a = 2a$ тул

$$
E = -\frac{GMm}{2a}.
$$

**Энерги зөвхөн их хагас тэнхлэгээс хамаарна**, хэлбэрээс хамаарахгүй. Эндээс шууд
*вис-вива* тэгшитгэл гарна:

$$
v^2 = GM\left(\frac{2}{r} - \frac{1}{a}\right).
$$

## Аль конус огтлол вэ?

| Энерги | Тойрог зам | $r$ зайд байх хурд |
|---|---|---|
| $E < 0$ | эллипс ($e = 0$ бол тойрог) | $v < \sqrt{2GM/r}$ |
| $E = 0$ | парабол | $v = \sqrt{2GM/r}$ |
| $E > 0$ | гипербол | $v > \sqrt{2GM/r}$ |

Эксцентриситет $e = \sqrt{1 + \dfrac{2EL^2}{G^2M^2m^3}}$. Симуляцид хажуу тийш
$v/v_{\text{circ}}$ хурдтай хөөргөвөл $e = |v^2/v_{\text{circ}}^2 - 1|$ болно — шалгаад үз.

## Кеплерийн хоёр ба гуравдугаар хууль

Нэгж хугацаанд зурах талбай $\dfrac{dA}{dt} = \dfrac{L}{2m}$ — тогтмол. Энэ бол хоёрдугаар
хууль бөгөөд импульсийн моментийн хадгалалтаас өөр юу ч биш. Нэг үеэр интегралчилбал бүтэн
эллипс $\pi a b$-г $T$ хугацаанд зурна:

$$
T = \frac{2m\,\pi a b}{L}.
$$

$p = L^2/(GMm^2)$ байх $b^2 = a\, p$-г ашиглавал

$$
T^2 = \frac{4\pi^2}{GM}a^3 .
$$

> $R$ зайнаас тайван байдлаас радиал уналт нь $e \to 1$, $a = R/2$ байх доройтсон эллипс.
> Тиймээс унах хугацаа нь **тэр эллипсийн үеийн хагас**: $t = \pi\sqrt{R^3/(8GM)}$.
> Интеграл бодох шаардлагагүй.
````
