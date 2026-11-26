---
topic: oscillations
difficulty: 2
answer: 1.525
unit: s
tolerance: 0.01
notes: large-amplitude-pendulum
---

<!-- en -->
# Where to drill the hole

A uniform rod of length $\ell = 1.00\ \text{m}$ is to be hung from a horizontal nail through a small
hole drilled somewhere along its length, and allowed to swing with small amplitude in a vertical
plane. Take $g = 9.8\ \text{m/s}^2$.

Where should the hole be drilled to make the period **as short as possible**, and what is that
shortest period?

<!-- hint -->
Let $x$ be the distance from the hole to the centre. Use $\omega^2 = U''/M$ with
$M = I_{\text{cm}} + m x^2$. Minimise $T(x)$ — or notice that $x + k^2/x$ is minimal when $x = k$.

<!-- solution -->
With the pivot at distance $x$ from the centre of mass, $I = \tfrac1{12}m\ell^2 + m x^2$ and the
restoring torque gives $U'' = mgx$, so

$$
T = 2\pi\sqrt{\frac{\ell^2/12 + x^2}{g\,x}} = 2\pi\sqrt{\frac{1}{g}\left(x + \frac{k^2}{x}\right)},
\qquad k = \frac{\ell}{\sqrt{12}} .
$$

By AM–GM, $x + k^2/x \ge 2k$ with equality at $x = k = \ell/\sqrt{12} \approx 0.289\ \text{m}$ from the
centre. Then

$$
T_{\min} = 2\pi\sqrt{\frac{2k}{g}} = 2\pi\sqrt{\frac{0.577}{9.8}} \approx 1.53\ \text{s}.
$$

Drilling at the very end ($x = \ell/2$) gives $T = 1.64\ \text{s}$; near the centre the period goes to
infinity.

<!-- mn -->
# Нүхийг хаана өрөмдөх вэ

$\ell = 1.00\ \text{м}$ урттай нэгэн төрлийн савааны уртын дагуу хаа нэгтээ жижиг нүх өрөмдөөд
хэвтээ хадаасанд өлгөж, босоо хавтгайд бага далайцтай савлуулна. $g = 9.8\ \text{м/с}^2$.

Үеийг **аль болох богино** болгохын тулд нүхийг хаана өрөмдөх ёстой вэ, тэр хамгийн богино үе хэд вэ?

<!-- hint -->
Нүхнээс төв хүртэлх зайг $x$ гэе. $M = I_{\text{cm}} + m x^2$ байх $\omega^2 = U''/M$-г ашигла.
$T(x)$-ийг минимумчил — эсвэл $x + k^2/x$ нь $x = k$ үед хамгийн бага гэдгийг ажигла.

<!-- solution -->
Тулгуур масс төвөөс $x$ зайд байхад $I = \tfrac1{12}m\ell^2 + m x^2$, сэргээх момент нь
$U'' = mgx$-г өгөх тул

$$
T = 2\pi\sqrt{\frac{\ell^2/12 + x^2}{g\,x}} = 2\pi\sqrt{\frac{1}{g}\left(x + \frac{k^2}{x}\right)},
\qquad k = \frac{\ell}{\sqrt{12}} .
$$

Арифметик-геометрийн дунджийн тэнцэтгэл бишээр $x + k^2/x \ge 2k$, тэнцэл нь төвөөс
$x = k = \ell/\sqrt{12} \approx 0.289\ \text{м}$ үед. Тэгвэл

$$
T_{\min} = 2\pi\sqrt{\frac{2k}{g}} = 2\pi\sqrt{\frac{0.577}{9.8}} \approx 1.53\ \text{с}.
$$

Яг үзүүрт ($x = \ell/2$) өрөмдвөл $T = 1.64\ \text{с}$; төвд ойртох тусам үе хязгааргүй өснө.
