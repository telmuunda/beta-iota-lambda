---
topic: mechanics
difficulty: 1
answer: 14.36
unit: m
tolerance: 0.01
sim: projectile
notes: projectile-motion
---

<!-- en -->
# Throwing from a cliff

A stone is thrown with speed $v = 10\ \text{m/s}$ from the edge of a cliff of height
$h = 5.0\ \text{m}$ above flat ground. Air resistance is negligible and $g = 9.8\ \text{m/s}^2$.

What is the **greatest horizontal distance** from the foot of the cliff at which the stone can
land? (Is the best angle more or less than $45°$?)

<!-- hint -->
Energy fixes the landing speed $v_f$ no matter what the angle is. Now think about the triangle
formed by $\vec v_0$, $\vec v_f$ and $\vec g\,t$ — what is its area?

<!-- solution -->
The landing speed is fixed by energy: $v_f = \sqrt{v^2 + 2gh} = \sqrt{100 + 98} = 14.07\ \text{m/s}$.

Since $\vec v_f = \vec v_0 + \vec g t$, twice the area of the velocity triangle is

$$
|\vec v_0 \times \vec v_f| = |\vec v_0 \times \vec g|\,t = g\,(v_0\cos\theta)\,t = gR .
$$

So $R = v v_f \sin\alpha / g$, where $\alpha$ is the angle between $\vec v_0$ and $\vec v_f$. This is
largest when $\alpha = 90°$:

$$
R_{\max} = \frac{v\, v_f}{g} = \frac{v}{g}\sqrt{v^2 + 2gh} = \frac{10 \times 14.07}{9.8} \approx 14.4\ \text{m}.
$$

The best angle satisfies $\tan\theta^* = v/v_f$, giving $\theta^* \approx 35.4°$ — less than $45°$,
because the stone already has a head start in height.

<!-- mn -->
# Хадан цохионоос шидэх

Хавтгай газраас $h = 5.0\ \text{м}$ өндөр хадан цохионы захаас чулууг $v = 10\ \text{м/с}$
хурдтай шиджээ. Агаарын эсэргүүцлийг үл тооно, $g = 9.8\ \text{м/с}^2$.

Чулуу хадны ёроолоос **хамгийн хол** хэдэн метрт унаж болох вэ? (Хамгийн сайн өнцөг $45°$-аас
их үү, бага уу?)

<!-- hint -->
Өнцгөөс үл хамааран энерги унах хурд $v_f$-г тогтооно. Одоо $\vec v_0$, $\vec v_f$ ба
$\vec g\,t$-ээс үүссэн гурвалжны тухай бодоорой — түүний талбай хэд вэ?

<!-- solution -->
Унах хурдыг энерги тогтооно: $v_f = \sqrt{v^2 + 2gh} = \sqrt{100 + 98} = 14.07\ \text{м/с}$.

$\vec v_f = \vec v_0 + \vec g t$ тул хурдны гурвалжны талбайн хоёр дахин их нь

$$
|\vec v_0 \times \vec v_f| = |\vec v_0 \times \vec g|\,t = g\,(v_0\cos\theta)\,t = gR .
$$

Иймд $R = v v_f \sin\alpha / g$, энд $\alpha$ нь $\vec v_0$ ба $\vec v_f$-ийн хоорондох өнцөг.
Энэ нь $\alpha = 90°$ үед хамгийн их:

$$
R_{\max} = \frac{v\, v_f}{g} = \frac{v}{g}\sqrt{v^2 + 2gh} = \frac{10 \times 14.07}{9.8} \approx 14.4\ \text{м}.
$$

Хамгийн сайн өнцөг $\tan\theta^* = v/v_f$, өөрөөр хэлбэл $\theta^* \approx 35.4°$ — чулуу аль хэдийн
өндөрт байгаа учир $45°$-аас бага.
