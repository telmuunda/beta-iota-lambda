---
topic: electromagnetism
difficulty: 3
answer: 2.0e5
unit: m/s
tolerance: 0.01
---

<!-- en -->
# A proton in crossed fields

A uniform electric field $E = 1.0\times10^3\ \text{V/m}$ points along $+y$, and a uniform magnetic field
$B = 1.0\times10^{-2}\ \text{T}$ points along $+z$. A proton is released **from rest** at the origin.
Gravity is negligible.

What is the **greatest speed** the proton reaches? (Bonus: how far along $y$ does it get?)

<!-- hint -->
Jump into a frame moving with velocity $\vec u$ along $x$ chosen so that the electric force is
cancelled: $q\vec E + q\vec u\times\vec B = 0$. What does the proton do in that frame?

<!-- solution -->
In a frame moving with $\vec u = \vec E\times\vec B / B^2$, of magnitude $u = E/B = 1.0\times10^5\ \text{m/s}$
(along $+x$), the electric field vanishes (non-relativistically). In that frame the proton starts with
velocity $-\vec u$ and simply moves in a circle at constant speed $u$.

Back in the lab frame, its velocity is $\vec u$ plus a vector of length $u$ rotating in a circle — the
path is a **cycloid**, like a point on a rolling wheel. The speed is greatest when the two add up:

$$
v_{\max} = 2u = \frac{2E}{B} = 2.0\times10^5\ \text{m/s}.
$$

The radius of the circle is $r = mu/(qB)$, so the greatest displacement along $\vec E$ is

$$
y_{\max} = 2r = \frac{2mE}{qB^2} = \frac{2 \times 1.67\times10^{-27}\times10^3}{1.6\times10^{-19}\times10^{-4}} \approx 0.21\ \text{m}.
$$

Check with energy: $\tfrac12 m v_{\max}^2 = qE\,y_{\max}$ gives the same result.

<!-- mn -->
# Огтлолцсон орон дахь протон

Нэгэн төрлийн цахилгаан орон $E = 1.0\times10^3\ \text{В/м}$ нь $+y$ тэнхлэгийн дагуу, нэгэн төрлийн
соронзон орон $B = 1.0\times10^{-2}\ \text{Тл}$ нь $+z$ тэнхлэгийн дагуу чиглэжээ. Протоныг
координатын эхэд **тайван байдлаас** тавьжээ. Таталцлыг үл тооно.

Протоны хүрэх **хамгийн их хурд** хэд вэ? (Нэмэлт: $y$ тэнхлэгийн дагуу хэр хол очих вэ?)

<!-- hint -->
Цахилгаан хүч устах буюу $q\vec E + q\vec u\times\vec B = 0$ байхаар $x$ тэнхлэгийн дагуу $\vec u$
хурдтай хөдөлж буй систем рүү шилж. Тэр системд протон юу хийх вэ?

<!-- solution -->
$\vec u = \vec E\times\vec B / B^2$ хурдтай, модуль нь $u = E/B = 1.0\times10^5\ \text{м/с}$ ($+x$
чиглэлд) хөдөлж буй системд цахилгаан орон алга болно (харьцангуй бус ойролцоололд). Тэр системд
протон $-\vec u$ хурдтай эхэлж, $u$ тогтмол хурдтай тойргоор л хөдөлнө.

Лабораторийн системд буцаж ирвэл түүний хурд нь $\vec u$ дээр тойргоор эргэх $u$ урттай векторыг
нэмсэнтэй тэнцүү — зам нь **циклоид**, өнхрөх дугуйн цэг шиг. Хоёр нь нийлэх үед хурд хамгийн их:

$$
v_{\max} = 2u = \frac{2E}{B} = 2.0\times10^5\ \text{м/с}.
$$

Тойргийн радиус $r = mu/(qB)$ тул $\vec E$-ийн дагуух хамгийн их шилжилт

$$
y_{\max} = 2r = \frac{2mE}{qB^2} = \frac{2 \times 1.67\times10^{-27}\times10^3}{1.6\times10^{-19}\times10^{-4}} \approx 0.21\ \text{м}.
$$

Энергиэр шалга: $\tfrac12 m v_{\max}^2 = qE\,y_{\max}$ мөн адил үр дүн өгнө.
