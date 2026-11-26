---
topic: oscillations
order: 2
sim: pendulum
summary_en: Every pendulum problem starts with sin θ ≈ θ. Here is what that approximation costs, how to correct it, and the energy method that works for any oscillator.
summary_mn: Дүүжингийн бодлого бүр sin θ ≈ θ-ээс эхэлдэг. Энэ ойролцоолол юуг алддаг, түүнийг хэрхэн засах, мөн аливаа хэлбэлзэгчид ажилладаг энергийн арга.
---

<!-- en -->
# The pendulum beyond small angles

## The exact equation

A point mass on a light rod of length $\ell$ obeys

$$
\ddot\theta = -\frac{g}{\ell}\sin\theta .
$$

For small $\theta$, $\sin\theta\approx\theta$ and the motion is simple harmonic with
$T_0 = 2\pi\sqrt{\ell/g}$, independent of amplitude. That independence — **isochronism** — is
only approximate. Real pendulums slow down at large amplitude.

## The energy method

Energy conservation from rest at $\theta_0$ gives the speed at every angle:

$$
\tfrac12 \ell^2\dot\theta^2 = g\ell(\cos\theta - \cos\theta_0).
$$

A quarter period is the time to fall from $\theta_0$ to $0$, so

$$
T = 4\int_0^{\theta_0}\frac{d\theta}{\dot\theta} = 4\sqrt{\frac{\ell}{2g}}\int_0^{\theta_0}\frac{d\theta}{\sqrt{\cos\theta-\cos\theta_0}} .
$$

This integral has no elementary form. Substituting $\sin(\theta/2) = k\sin\varphi$ with
$k = \sin(\theta_0/2)$ turns it into the complete elliptic integral $K(k)$:

$$
T = \frac{2T_0}{\pi}K(k) = T_0\left(1 + \frac{\theta_0^2}{16} + \frac{11\,\theta_0^4}{3072} + \dots\right).
$$

At $\theta_0 = 10°$ the correction is $0.2\%$; at $60°$ it is $7\%$; at $90°$ it is $18\%$.

## Computing it without tables

A beautiful fact due to Gauss: $\dfrac{\pi}{2K(k)} = \operatorname{AGM}\!\left(1, \sqrt{1-k^2}\right)$,
the arithmetic–geometric mean. Since $\sqrt{1-k^2} = \cos(\theta_0/2)$,

$$
\frac{T}{T_0} = \frac{1}{\operatorname{AGM}\!\left(1, \cos\frac{\theta_0}{2}\right)} .
$$

The AGM converges extremely fast: replace $(a, b)$ by $\left(\tfrac{a+b}{2}, \sqrt{ab}\right)$.
For $\theta_0 = 90°$: $(1, 0.7071) \to (0.8536, 0.8409) \to (0.8472, 0.8472)$, so
$T/T_0 \approx 1.1803$ after two steps on a calculator.

## The general recipe for small oscillations

For any system with one coordinate $q$, write the energy as
$E = \tfrac12 M(q)\dot q^2 + U(q)$. Near a minimum $q_0$ of $U$,

$$
\omega^2 = \frac{U''(q_0)}{M(q_0)} .
$$

For the simple pendulum, $q = \theta$, $M = m\ell^2$, $U = -mg\ell\cos\theta$, so
$\omega^2 = g/\ell$. For a rigid body about a pivot at distance $d$ from its centre of mass,
$M = I_{\text{cm}} + md^2$ and $U'' = mgd$ — the physical pendulum, in one line.

<!-- mn -->
# Бага өнцгөөс цааших дүүжин

## Яг тэгшитгэл

$\ell$ урттай хөнгөн саваа дээрх цэгэн масс

$$
\ddot\theta = -\frac{g}{\ell}\sin\theta
$$

тэгшитгэлийг дагана. Бага $\theta$-ийн хувьд $\sin\theta\approx\theta$ бөгөөд хөдөлгөөн нь
далайцаас хамаарахгүй $T_0 = 2\pi\sqrt{\ell/g}$ үетэй гармоник хэлбэлзэл болно. Энэ хамааралгүй
байдал — **изохронизм** — зөвхөн ойролцоо. Бодит дүүжин их далайцтай үед удааширдаг.

## Энергийн арга

$\theta_0$-ээс тайван байдлаас эхэлсэн энергийн хадгалалт өнцөг бүр дээрх хурдыг өгнө:

$$
\tfrac12 \ell^2\dot\theta^2 = g\ell(\cos\theta - \cos\theta_0).
$$

Үеийн дөрөвний нэг нь $\theta_0$-ээс $0$ хүртэл унах хугацаа тул

$$
T = 4\int_0^{\theta_0}\frac{d\theta}{\dot\theta} = 4\sqrt{\frac{\ell}{2g}}\int_0^{\theta_0}\frac{d\theta}{\sqrt{\cos\theta-\cos\theta_0}} .
$$

Энэ интеграл элементар хэлбэргүй. $k = \sin(\theta_0/2)$ гэж аваад $\sin(\theta/2) = k\sin\varphi$
орлуулга хийвэл бүтэн эллипс интеграл $K(k)$ болно:

$$
T = \frac{2T_0}{\pi}K(k) = T_0\left(1 + \frac{\theta_0^2}{16} + \frac{11\,\theta_0^4}{3072} + \dots\right).
$$

$\theta_0 = 10°$ үед засвар $0.2\%$; $60°$ үед $7\%$; $90°$ үед $18\%$.

## Хүснэгтгүйгээр тооцоолох

Гауссын гайхалтай баримт: $\dfrac{\pi}{2K(k)} = \operatorname{AGM}\!\left(1, \sqrt{1-k^2}\right)$ —
арифметик-геометрийн дундаж. $\sqrt{1-k^2} = \cos(\theta_0/2)$ учир

$$
\frac{T}{T_0} = \frac{1}{\operatorname{AGM}\!\left(1, \cos\frac{\theta_0}{2}\right)} .
$$

AGM маш хурдан нийлдэг: $(a, b)$-г $\left(\tfrac{a+b}{2}, \sqrt{ab}\right)$-ээр солино.
$\theta_0 = 90°$ үед: $(1, 0.7071) \to (0.8536, 0.8409) \to (0.8472, 0.8472)$, тэгэхээр
тооны машин дээр хоёрхон алхмын дараа $T/T_0 \approx 1.1803$.

## Бага хэлбэлзлийн ерөнхий жор

Нэг $q$ координаттай аливаа системийн энергийг $E = \tfrac12 M(q)\dot q^2 + U(q)$ гэж бич.
$U$-ийн минимум $q_0$-ийн орчимд

$$
\omega^2 = \frac{U''(q_0)}{M(q_0)} .
$$

Энгийн дүүжингийн хувьд $q = \theta$, $M = m\ell^2$, $U = -mg\ell\cos\theta$ тул
$\omega^2 = g/\ell$. Масс төвөөсөө $d$ зайд тулгууртай хатуу биеийн хувьд
$M = I_{\text{cm}} + md^2$, $U'' = mgd$ — физик дүүжин ганцхан мөрөөр.
