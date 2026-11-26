---
topic: gravitation
order: 3
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
