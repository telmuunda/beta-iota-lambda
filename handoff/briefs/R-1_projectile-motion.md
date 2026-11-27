# Brief R-1 — Projectiles, the safety parabola and drag

**Handoff ID:** `R-1`
**Plan task:** expand existing note
**Target file:** `content/notes/projectile-motion.md`

> **This replaces an existing, shorter note** (included at the end of this brief). Keep what is good in it, but rewrite and greatly extend it.

Write the note described below, following the project instructions exactly.

## 1. Header and frontmatter (copy exactly; fill in the two summaries)

```
<!-- handoff: R-1 → content/notes/projectile-motion.md -->
---
topic: mechanics
order: 1
sim: projectile
summary_en: (fill in)
summary_mn: (fill in)
---
```

## 2. Titles

- English: **Projectiles, the safety parabola and drag**
- Mongolian (suggested; improve if you know a better standard term): **Шидэлт, аюулгүйн парабол ба эсэргүүцэл**

## 3. Goal

After reading, a student can: Master 2-D kinematics with constant acceleration, the reachable region, and the qualitative and quantitative effect of air resistance.

## 4. Sections (in this order, as `##` headings, in both languages)

1. **Kinematics with constant acceleration** — Derive the equations of motion by integrating $\vec a = \vec g$ in vector form ($\vec r = \vec r_0 + \vec v_0t + \tfrac12\vec g t^2$); range, max height and flight time derived for level ground.
2. **The trajectory as a quadratic in $\tan\theta$** — Keep the existing idea; derive the safety parabola fully; range from a height and on an incline (derive maximum range up/down a slope).
3. **Vector methods** — The velocity-triangle argument (keep, expand); the "free fall frame" trick (two projectiles see each other moving in straight lines — use it for the monkey-and-hunter problem).
4. **Linear drag** — Solve fully: $x(t)$, $y(t)$, terminal velocity, small-drag expansion of the range.
5. **Quadratic drag** — Equations of motion; vertical motion solved exactly (up and down, $\tanh$ solution derived); horizontal motion; why the optimal angle falls below 45°. Use the simulation to explore.

Finish each language with a `:::summary` block and a `## Further reading` section listing the books from this project you used (author, title, chapter).

## 5. Derivations that must appear (each in a `:::derivation` block)

- Range, height and time on level ground
- Safety parabola
- Maximum range on an incline
- Linear-drag solution
- Vertical fall with quadratic drag

## 6. Worked examples (each in a `:::example` block, full solution with numbers)

- Monkey and hunter
- Maximum range throwing up a 30° slope

## 7. Check-yourself questions (each `:::check` followed by `:::answer`)

- At maximum range, what is the angle between initial and final velocity?
- Two projectiles with complementary angles: what is the same, what differs?
- Does air resistance make the descent faster or slower than the ascent?

## 8. Common mistakes (`:::pitfall`)

- Using the level-ground range formula when launch and landing heights differ

## 9. Links you may use (and no others)

- Problem: `#/problems/p01-cliff`
- Problem: `#/problems/p02-river`
- Note: `#/notes/newtons-laws-and-constraints` (Newton's laws and constraints)
- Simulation: `#/lab/projectile`

## 10. Length

2,500–4,500 words per language. If you must cut, keep the derivations and drop breadth, and list what you dropped in the closing `<!-- omitted: … -->` comment.

## 11. The current note (to expand)

````markdown
---
topic: mechanics
order: 1
sim: projectile
summary_en: Projectile motion is two independent motions glued together by time. Three tools that solve most olympiad questions about it — and what changes when air pushes back.
summary_mn: Шидэлт бол хугацаагаар холбогдсон хоёр бие даасан хөдөлгөөн. Олимпиадын ихэнх бодлогыг шийддэг гурван хэрэгсэл — агаар эсэргүүцэх үед юу өөрчлөгддөг вэ.
---

<!-- en -->
# Projectiles, the safety parabola, and drag

## Two motions, one clock

Without air, the only force is gravity, so the horizontal velocity never changes and the
vertical motion has constant acceleration $-g$. Launched from the origin with speed $v$
at angle $\theta$:

$$
x = v\cos\theta\, t, \qquad y = v\sin\theta\, t - \tfrac12 g t^2 .
$$

Eliminating $t$ gives the path. It is worth writing it with $u = \tan\theta$, because
$1/\cos^2\theta = 1 + u^2$:

$$
y = u\,x - \frac{g x^2}{2v^2}\,(1 + u^2).
$$

> Notice: for a fixed target $(x, y)$ this is a **quadratic in $u = \tan\theta$**. That
> single observation answers most "can it hit…" questions.

## Which points can be reached?

Rearrange as $\dfrac{g x^2}{2v^2}u^2 - x u + \left(y + \dfrac{g x^2}{2v^2}\right) = 0$. A real
angle exists only if the discriminant is non-negative, which simplifies to

$$
y \le \frac{v^2}{2g} - \frac{g x^2}{2 v^2}.
$$

This curve is the **safety parabola** (envelope of all trajectories). Points on it are hit by
exactly one angle; points inside by two; points outside by none. From a height $h$ just shift
it up by $h$. Setting $y = -h$ gives the greatest range from a cliff:

$$
R_{\max} = \frac{v}{g}\sqrt{v^2 + 2gh},
$$

reached at $\tan\theta^* = v / \sqrt{v^2 + 2gh}$ — always **less than 45°** when $h > 0$.

## A useful trick: the velocity triangle

The final velocity is $\vec v_f = \vec v_0 + \vec g\, t$. Draw these three vectors as a
triangle. Its area is $\tfrac12 |\vec v_0 \times \vec v_f| = \tfrac12 g t\, v_0 \cos\theta$, and
$v_0\cos\theta\, t$ is the range $R$, so

$$
R = \frac{|\vec v_0 \times \vec v_f|}{g} = \frac{v_0 v_f \sin\alpha}{g},
$$

where $\alpha$ is the angle between initial and final velocity. Since $v_f$ is fixed by energy,
maximum range means $\alpha = 90°$: **at maximum range the launch and landing velocities are
perpendicular.** This gives the cliff result above in two lines.

## Adding air resistance

For a ball at everyday speeds, drag is closer to quadratic, $\vec F = -c\,|\vec v|\,\vec v$.
Then the horizontal and vertical motions are **no longer independent** — the speed couples
them — and there is no closed-form path. Things you can still say without solving:

- The range is shorter and the optimal angle drops below 45° (open the simulation and watch it
  fall as you increase $k$).
- The path is not symmetric: the descent is steeper than the ascent.
- Terminal speed is $v_t = \sqrt{mg/c}$; the dimensionless number $k v_0^2 / g = v_0^2/v_t^2$
  tells you whether drag matters at all.

For **linear** drag, $\vec F = -b\vec v$, the equations do separate and

$$
x(t) = v_{0x}\,\tau\left(1 - e^{-t/\tau}\right), \qquad \tau = m/b ,
$$

so the horizontal distance can never exceed $v_{0x}\tau$ — a vertical asymptote in the path.

<!-- mn -->
# Шидэлт, аюулгүйн парабол ба эсэргүүцэл

## Хоёр хөдөлгөөн, нэг цаг

Агааргүй үед зөвхөн таталцлын хүч үйлчилнэ, тиймээс хэвтээ хурд өөрчлөгдөхгүй, босоо
хөдөлгөөн $-g$ тогтмол хурдатгалтай. Координатын эхээс $v$ хурдтай, $\theta$ өнцгөөр шидвэл:

$$
x = v\cos\theta\, t, \qquad y = v\sin\theta\, t - \tfrac12 g t^2 .
$$

$t$-г зайлуулбал траектори гарна. $1/\cos^2\theta = 1 + u^2$ учир $u = \tan\theta$-гаар
бичих нь ашигтай:

$$
y = u\,x - \frac{g x^2}{2v^2}\,(1 + u^2).
$$

> Анхаар: тогтсон $(x, y)$ цэгийн хувьд энэ нь **$u = \tan\theta$-ийн квадрат тэгшитгэл**.
> Энэ ганц ажиглалт "онох уу…" гэсэн ихэнх асуултад хариулдаг.

## Аль цэгүүдэд хүрч болох вэ?

$\dfrac{g x^2}{2v^2}u^2 - x u + \left(y + \dfrac{g x^2}{2v^2}\right) = 0$ гэж бичье. Бодит
өнцөг зөвхөн дискриминант сөрөг биш үед оршино, энэ нь

$$
y \le \frac{v^2}{2g} - \frac{g x^2}{2 v^2}
$$

болж хялбарчлагдана. Энэ муруйг **аюулгүйн парабол** (бүх траекторийн бүрхүүл) гэнэ. Түүн
дээрх цэгт яг нэг өнцгөөр, дотор талын цэгт хоёр өнцгөөр онож болно; гадна талын цэгт хүрэх
боломжгүй. $h$ өндрөөс шидэх үед параболыг $h$-аар дээш шилжүүлэхэд хангалттай. $y = -h$ гэж
тавибал хадан цохионоос хамгийн хол тусгал гарна:

$$
R_{\max} = \frac{v}{g}\sqrt{v^2 + 2gh},
$$

энэ нь $\tan\theta^* = v / \sqrt{v^2 + 2gh}$ үед биелнэ — $h > 0$ бол үргэлж **45°-аас бага**.

## Ашигтай арга: хурдны гурвалжин

Эцсийн хурд $\vec v_f = \vec v_0 + \vec g\, t$. Эдгээр гурван векторыг гурвалжин болгон зур.
Түүний талбай $\tfrac12 |\vec v_0 \times \vec v_f| = \tfrac12 g t\, v_0 \cos\theta$, харин
$v_0\cos\theta\, t$ нь тусгал $R$ тул

$$
R = \frac{|\vec v_0 \times \vec v_f|}{g} = \frac{v_0 v_f \sin\alpha}{g},
$$

энд $\alpha$ нь анхны ба эцсийн хурдны хоорондох өнцөг. $v_f$ энергиээр тогтоогддог учир
хамгийн их тусгал $\alpha = 90°$ үед гарна: **хамгийн их тусгалын үед шидэх ба унах хурдууд
перпендикуляр байна.** Энэ нь дээрх хадан цохионы үр дүнг хоёрхон мөрөөр өгнө.

## Агаарын эсэргүүцлийг нэмэх нь

Ердийн хурдтай бөмбөгний хувьд эсэргүүцэл квадрат хуульд илүү ойр: $\vec F = -c\,|\vec v|\,\vec v$.
Тэгвэл хэвтээ ба босоо хөдөлгөөн **бие даасан байхаа болино** — хурд тэднийг холбоно — бөгөөд
траекторийн хаалттай томьёо байхгүй. Бодохгүйгээр хэлж болох зүйлс:

- Тусгал богиносч, хамгийн сайн өнцөг 45°-аас доош буурна (симуляцийг нээгээд $k$-г
  ихэсгэхэд хэрхэн буурахыг ажигла).
- Траектори тэгш хэмгүй: буух хэсэг нь өгсөх хэсгээсээ эгц.
- Хязгаарын хурд $v_t = \sqrt{mg/c}$; хэмжээсгүй тоо $k v_0^2 / g = v_0^2/v_t^2$ нь
  эсэргүүцэл ач холбогдолтой эсэхийг хэлж өгнө.

**Шугаман** эсэргүүцэл $\vec F = -b\vec v$-ийн хувьд тэгшитгэлүүд салж,

$$
x(t) = v_{0x}\,\tau\left(1 - e^{-t/\tau}\right), \qquad \tau = m/b ,
$$

тиймээс хэвтээ зай $v_{0x}\tau$-аас хэтрэхгүй — траектори босоо асимптоттой.
````
