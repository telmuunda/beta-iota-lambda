---
topic: mechanics
difficulty: 2
answer: 67.08
unit: m
tolerance: 0.01
---

<!-- en -->
# A boat that is too slow

A river of width $d = 60\ \text{m}$ flows at $v = 3.0\ \text{m/s}$. A boat can move at
$u = 2.0\ \text{m/s}$ relative to the water — slower than the current, so it will certainly be
carried downstream.

The boater wants to land on the opposite bank **as little downstream as possible**. What is the
smallest possible downstream drift?

<!-- hint -->
Draw the velocity of the boat relative to the shore as $\vec v + \vec u$. The tip of $\vec u$ can be
anywhere on a circle of radius $u$. Which direction of the resultant makes the steepest angle with
the bank?

<!-- solution -->
Relative to the shore, the boat moves with $\vec w = \vec v + \vec u$. Place the tail of $\vec u$ at
the tip of $\vec v$; the tip of $\vec w$ then lies on a circle of radius $u$ around that point.
The path is straight, so to minimise drift we want $\vec w$ to make the **largest angle** with the
bank. That happens when $\vec w$ is **tangent** to the circle, i.e. $\vec u \perp \vec w$.

Then $\sin\beta = u/v$ where $\beta$ is the angle of $\vec w$ to the bank, and

$$
x = \frac{d}{\tan\beta} = d\,\frac{\sqrt{v^2 - u^2}}{u} = 60 \times \frac{\sqrt{5}}{2} \approx 67\ \text{m}.
$$

The boat should be pointed upstream at $\cos\varphi = u/v$, i.e. $48°$ from the bank. Note that
this is **not** the same as pointing straight across (which gives $x = dv/u = 90\ \text{m}$), nor
the fastest crossing.

<!-- mn -->
# Хэт удаан завь

$d = 60\ \text{м}$ өргөн гол $v = 3.0\ \text{м/с}$ хурдтай урсаж байна. Завь усанд харьцангуй
$u = 2.0\ \text{м/с}$ хурдтай явж чадна — урсгалаас удаан тул доош урсгагдах нь гарцаагүй.

Завьчин эсрэг эрэгт **аль болох бага доош** урсаж буухыг хүсчээ. Доош урсах хамгийн бага
зай хэд вэ?

<!-- hint -->
Эрэгт харьцангуй завины хурдыг $\vec v + \vec u$ гэж зур. $\vec u$-ийн үзүүр $u$ радиустай
тойрог дээр хаана ч байж болно. Үр дүнгийн хурдны аль чиглэл эрэгтэй хамгийн их өнцөг үүсгэх вэ?

<!-- solution -->
Эрэгт харьцангуй завь $\vec w = \vec v + \vec u$ хурдтай хөдөлнө. $\vec u$-ийн эхийг $\vec v$-ийн
үзүүрт тавья; тэгвэл $\vec w$-ийн үзүүр тэр цэгийг тойрсон $u$ радиустай тойрог дээр оршино.
Зам шулуун тул урсах зайг багасгахын тулд $\vec w$ эрэгтэй **хамгийн их өнцөг** үүсгэх ёстой.
Энэ нь $\vec w$ тойрогт **шүргэгч** буюу $\vec u \perp \vec w$ үед биелнэ.

Тэгвэл $\vec w$-ийн эрэгтэй үүсгэх өнцөг $\beta$-ийн хувьд $\sin\beta = u/v$ бөгөөд

$$
x = \frac{d}{\tan\beta} = d\,\frac{\sqrt{v^2 - u^2}}{u} = 60 \times \frac{\sqrt{5}}{2} \approx 67\ \text{м}.
$$

Завийг эрэгтэй $\cos\varphi = u/v$, өөрөөр хэлбэл $48°$ өнцгөөр урсгалын эсрэг чиглүүлэх ёстой.
Энэ нь шууд хөндлөн чиглүүлэх ($x = dv/u = 90\ \text{м}$) эсвэл хамгийн хурдан гатлахтай **адил биш**
гэдгийг анхаар.
