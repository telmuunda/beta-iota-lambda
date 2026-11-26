---
topic: mechanics
difficulty: 2
answer: 3.067
unit: m/s
tolerance: 0.01
---

<!-- en -->
# A chain slipping off a table

A uniform chain of length $L = 1.0\ \text{m}$ lies on a smooth horizontal table, with a length
$a = 0.20\ \text{m}$ hanging over the edge. It is released from rest. Friction (including at the
edge) is negligible; $g = 9.8\ \text{m/s}^2$.

How fast is the chain moving at the moment its last link leaves the table?

<!-- hint -->
Don't use forces — the hanging mass changes. Find how much the **centre of mass** of the chain
drops between the start and the end.

<!-- solution -->
Every link moves with the same speed, so the kinetic energy is $\tfrac12 m v^2$. Measure heights
from the table top, with linear density $\lambda = m/L$.

At the start, only the hanging part has (negative) potential energy:
$U_1 = -\lambda a\, g\, \dfrac a2 = -\dfrac{m g a^2}{2L}$.

At the end the whole chain hangs: $U_2 = -m g \dfrac L2$.

$$
\tfrac12 m v^2 = U_1 - U_2 = \frac{mg}{2L}\left(L^2 - a^2\right)
\quad\Rightarrow\quad
v = \sqrt{\frac{g\,(L^2 - a^2)}{L}} = \sqrt{9.8 \times 0.96} \approx 3.07\ \text{m/s}.
$$

<!-- mn -->
# Ширээнээс гулсах гинж

$L = 1.0\ \text{м}$ урттай нэгэн төрлийн гинж гөлгөр хэвтээ ширээн дээр байх ба $a = 0.20\ \text{м}$
хэсэг нь ирмэгээс унжиж байна. Түүнийг тайван байдлаас тавьжээ. Үрэлтийг (ирмэг дээрхийг оруулаад)
үл тооно; $g = 9.8\ \text{м/с}^2$.

Гинжний сүүлийн цагираг ширээнээс салах мөчид гинж ямар хурдтай хөдөлж байх вэ?

<!-- hint -->
Хүчээр бүү бод — унжсан масс өөрчлөгддөг. Эхэн ба эцсийн хооронд гинжний **масс төв** хэр
доошилсныг ол.

<!-- solution -->
Бүх цагираг ижил хурдтай хөдөлдөг тул кинетик энерги нь $\tfrac12 m v^2$. Өндрийг ширээний
гадаргуугаас хэмжиж, шугаман нягтыг $\lambda = m/L$ гэе.

Эхэндээ зөвхөн унжсан хэсэг (сөрөг) потенциал энергитэй:
$U_1 = -\lambda a\, g\, \dfrac a2 = -\dfrac{m g a^2}{2L}$.

Төгсгөлд бүх гинж унжина: $U_2 = -m g \dfrac L2$.

$$
\tfrac12 m v^2 = U_1 - U_2 = \frac{mg}{2L}\left(L^2 - a^2\right)
\quad\Rightarrow\quad
v = \sqrt{\frac{g\,(L^2 - a^2)}{L}} = \sqrt{9.8 \times 0.96} \approx 3.07\ \text{м/с}.
$$
