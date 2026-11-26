import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import type { Topic } from '../lib/i18n';

export interface SimInfo {
  id: string;
  topic: Topic;
  title: { en: string; mn: string };
  blurb: { en: string; mn: string };
  Component: LazyExoticComponent<ComponentType>;
}

export const sims: SimInfo[] = [
  {
    id: 'projectile',
    topic: 'mechanics',
    title: { en: 'Projectile with air resistance', mn: 'Агаарын эсэргүүцэлтэй шидэлт' },
    blurb: {
      en: 'Why 45° stops being the best angle, and the parabola no trajectory can cross.',
      mn: 'Яагаад 45° хамгийн сайн өнцөг байхаа болидог, ямар ч траектори давж гарахгүй парабол.',
    },
    Component: lazy(() => import('./ProjectileSim')),
  },
  {
    id: 'pendulum',
    topic: 'oscillations',
    title: { en: 'The pendulum at large amplitude', mn: 'Их далайцтай дүүжин' },
    blurb: {
      en: 'Where sin θ ≈ θ breaks down, and how much the period grows.',
      mn: 'sin θ ≈ θ хаана эвдэрдэг, үе хэр их өсдөг вэ.',
    },
    Component: lazy(() => import('./PendulumSim')),
  },
  {
    id: 'orbit',
    topic: 'gravitation',
    title: { en: 'Orbits and Kepler’s laws', mn: 'Тойрог зам ба Кеплерийн хуулиуд' },
    blurb: {
      en: 'One launch speed decides circle, ellipse, parabola or hyperbola.',
      mn: 'Ганц анхны хурд тойрог, эллипс, парабол эсвэл гиперболыг шийддэг.',
    },
    Component: lazy(() => import('./OrbitSim')),
  },
];

export const simById = (id?: string) => sims.find((s) => s.id === id);
