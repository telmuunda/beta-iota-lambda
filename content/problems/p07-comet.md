---
topic: gravitation
difficulty: 1
answer: 75.1
unit: yr
tolerance: 0.01
sim: orbit
notes: kepler-problem
source: classic
---

<!-- en -->
# A comet's return

A comet passes the Sun at a closest distance of $0.60\ \text{AU}$ and reaches $35\ \text{AU}$ at its
farthest. How many years pass between two of its closest approaches?

Then, a quick follow-up for yourself: what is the ratio of its speed at perihelion to its speed at
aphelion?

<!-- hint -->
Kepler's third law in solar units: $T[\text{yr}]^2 = a[\text{AU}]^3$. What is $a$ in terms of the two
distances?

<!-- solution -->
The two distances are the ends of the major axis, so $2a = 0.60 + 35 = 35.6\ \text{AU}$ and
$a = 17.8\ \text{AU}$. For the Earth $a = 1\ \text{AU}$, $T = 1\ \text{yr}$, so

$$
T = a^{3/2} = 17.8^{3/2} \approx 75.1\ \text{yr}.
$$

At the two ends of the major axis the velocity is perpendicular to the radius, so angular momentum
conservation gives $v_p r_p = v_a r_a$:

$$
\frac{v_p}{v_a} = \frac{35}{0.60} \approx 58 .
$$

<!-- mn -->
# Сүүлт одны эргэн ирэлт

Сүүлт од Нарыг хамгийн ойроос $0.60\ \text{АН}$ зайгаар өнгөрч, хамгийн холдоо $35\ \text{АН}$
хүрдэг. Нар руу хоёр удаа хамгийн ойртох хооронд хэдэн жил өнгөрөх вэ?

Дараа нь өөртөө зориулсан нэмэлт асуулт: перигелий дэх хурд нь афелий дэх хурдаас хэд дахин их вэ?

<!-- hint -->
Нарны нэгжээр Кеплерийн гуравдугаар хууль: $T[\text{жил}]^2 = a[\text{АН}]^3$. Хоёр зайгаар $a$
юутай тэнцүү вэ?

<!-- solution -->
Хоёр зай нь их тэнхлэгийн хоёр үзүүр тул $2a = 0.60 + 35 = 35.6\ \text{АН}$, $a = 17.8\ \text{АН}$.
Дэлхийн хувьд $a = 1\ \text{АН}$, $T = 1\ \text{жил}$ тул

$$
T = a^{3/2} = 17.8^{3/2} \approx 75.1\ \text{жил}.
$$

Их тэнхлэгийн хоёр үзүүрт хурд радиуст перпендикуляр тул импульсийн моментийн хадгалалт
$v_p r_p = v_a r_a$-г өгнө:

$$
\frac{v_p}{v_a} = \frac{35}{0.60} \approx 58 .
$$
