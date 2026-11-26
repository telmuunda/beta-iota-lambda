---
topic: gravitation
difficulty: 1
answer: 3178
unit: m/s
tolerance: 0.01
sim: orbit
notes: kepler-problem
---

<!-- en -->
# One kick to escape

A spacecraft is in a circular orbit $400\ \text{km}$ above the Earth's surface. Its engine fires
briefly, increasing the speed along the direction of motion.

What is the smallest speed increase $\Delta v$ that lets the craft escape Earth's gravity
completely? Use $GM_\oplus = 3.986\times10^{14}\ \text{m}^3/\text{s}^2$ and
$R_\oplus = 6371\ \text{km}$.

<!-- hint -->
Compare the circular speed and the escape speed at the same radius. What is their ratio?

<!-- solution -->
At radius $r = 6.771\times10^6\ \text{m}$ the circular speed is

$$
v_c = \sqrt{\frac{GM}{r}} = 7.673\ \text{km/s}.
$$

Escape needs $E \ge 0$, i.e. $v_e = \sqrt{2GM/r} = \sqrt2\, v_c$. A tangential kick does not change $r$,
so

$$
\Delta v = (\sqrt2 - 1)\, v_c \approx 0.414 \times 7673 \approx 3.18\times10^3\ \text{m/s}.
$$

A kick in any other direction is wasteful: only the magnitude of $\vec v$ enters the energy, and a
tangential kick adds to it most efficiently.

<!-- mn -->
# Нэг түлхэлтээр оргох

Сансрын хөлөг Дэлхийн гадаргаас $400\ \text{км}$ өндөрт тойрог замд байна. Хөдөлгүүр богино
хугацаанд ажиллаж, хөдөлгөөний чиглэлийн дагуу хурдыг нэмэгдүүлнэ.

Хөлөг Дэлхийн таталцлаас бүрэн оргохын тулд хурдыг хамгийн багадаа хэдээр $\Delta v$ нэмэх ёстой вэ?
$GM_\oplus = 3.986\times10^{14}\ \text{м}^3/\text{с}^2$, $R_\oplus = 6371\ \text{км}$ гэж ав.

<!-- hint -->
Ижил радиус дээрх тойргийн хурд ба оргох хурдыг харьцуул. Тэдгээрийн харьцаа хэд вэ?

<!-- solution -->
$r = 6.771\times10^6\ \text{м}$ радиус дээр тойргийн хурд

$$
v_c = \sqrt{\frac{GM}{r}} = 7.673\ \text{км/с}.
$$

Оргохын тулд $E \ge 0$, өөрөөр хэлбэл $v_e = \sqrt{2GM/r} = \sqrt2\, v_c$ байх хэрэгтэй. Шүргэгч
түлхэлт $r$-г өөрчлөхгүй тул

$$
\Delta v = (\sqrt2 - 1)\, v_c \approx 0.414 \times 7673 \approx 3.18\times10^3\ \text{м/с}.
$$

Өөр чиглэлийн түлхэлт үр ашиггүй: энергид зөвхөн $\vec v$-ийн модуль орох бөгөөд шүргэгч түлхэлт
түүнийг хамгийн үр дүнтэй нэмэгдүүлдэг.
