---
topic: oscillations
difficulty: 2
answer: 1.1803
tolerance: 0.005
sim: pendulum
notes: large-amplitude-pendulum
---

<!-- en -->
# Released from horizontal

A simple pendulum is released from rest with its string **horizontal** ($\theta_0 = 90°$).
By what factor is its period longer than the small-angle value $T_0 = 2\pi\sqrt{\ell/g}$?

Give $T/T_0$ to at least three significant figures. (The series $1 + \theta_0^2/16$ is not
accurate enough here.)

<!-- hint -->
$T/T_0 = 1/\operatorname{AGM}\!\left(1, \cos(\theta_0/2)\right)$. Two or three steps of
$(a, b) \to \left(\tfrac{a+b}{2}, \sqrt{ab}\right)$ on a calculator are enough.

<!-- solution -->
With $\cos 45° = 0.70711$:

| step | $a$ | $b$ |
|---|---|---|
| 0 | 1 | 0.70711 |
| 1 | 0.85355 | 0.84090 |
| 2 | 0.84722 | 0.84720 |
| 3 | 0.84721 | 0.84721 |

So $T/T_0 = 1/0.84721 = 1.1803$.

For comparison, $1 + \theta_0^2/16 = 1.154$ and adding $11\theta_0^4/3072$ gives $1.176$ — the series
converges slowly at large amplitude, while the AGM is exact after three steps.

<!-- mn -->
# Хэвтээ байрлалаас тавих

Энгийн дүүжинг утас нь **хэвтээ** ($\theta_0 = 90°$) байхад тайван байдлаас тавьжээ. Түүний үе
бага өнцгийн утга $T_0 = 2\pi\sqrt{\ell/g}$-ээс хэд дахин их вэ?

$T/T_0$-г дор хаяж гурван орон оронтой өг. ($1 + \theta_0^2/16$ цуваа энд хангалттай нарийвчлалгүй.)

<!-- hint -->
$T/T_0 = 1/\operatorname{AGM}\!\left(1, \cos(\theta_0/2)\right)$. Тооны машин дээр
$(a, b) \to \left(\tfrac{a+b}{2}, \sqrt{ab}\right)$ алхмыг хоёр гурван удаа хийхэд хангалттай.

<!-- solution -->
$\cos 45° = 0.70711$ үед:

| алхам | $a$ | $b$ |
|---|---|---|
| 0 | 1 | 0.70711 |
| 1 | 0.85355 | 0.84090 |
| 2 | 0.84722 | 0.84720 |
| 3 | 0.84721 | 0.84721 |

Иймд $T/T_0 = 1/0.84721 = 1.1803$.

Харьцуулбал $1 + \theta_0^2/16 = 1.154$, $11\theta_0^4/3072$-г нэмбэл $1.176$ — их далайцтай үед цуваа
удаан нийлдэг бол AGM гурван алхмын дараа яг утгаа өгнө.
