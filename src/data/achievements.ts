import { Trophy, GraduationCap, Users, Swords } from 'lucide-vue-next';
import type { Achievement } from './types';

/**
 * ACHIEVEMENTS — wins & milestones. Copy an object to add one.
 * Text is inline {ru,en,zh}. Only verified wins belong here.
 */
export const achievements: Achievement[] = [
  {
    title: { ru: 'Гранд-финалист SIH 2026', en: 'SIH 2026 Grand Finalist', zh: 'SIH 2026 大决赛入围者' },
    desc: {
      ru: 'Гранд-финалист Smart India Hackathon 2026 с проектом AICTE Compliance OS.',
      en: 'Grand-finalist at Smart India Hackathon 2026 with AICTE Compliance OS.',
      zh: '凭借 AICTE Compliance OS 入围 Smart India Hackathon 2026 大决赛。',
    },
    tag: { ru: 'Хакатон', en: 'Hackathon', zh: '黑客松' },
    year: '2026',
    accent: '#F59E0B',
    icon: Trophy,
    featured: true,
  },
  {
    title: { ru: 'Вёл свой кружок по программированию', en: 'Ran my own coding club', zh: '运营自己的编程俱乐部' },
    desc: {
      ru: 'Учил ребят программировать и собирать их первые проекты.',
      en: 'Taught kids to code and ship their first projects.',
      zh: '教孩子们编程并完成他们的第一个项目。',
    },
    tag: { ru: 'Наставничество', en: 'Mentorship', zh: '导师' },
    accent: '#10B981',
    icon: Users,
  },
  {
    title: { ru: 'Бросал вызов крупным корпорациям — и не раз', en: 'Challenged big corporations — more than once', zh: '多次挑战大公司' },
    desc: {
      ru: 'Отстаивал свои идеи и проекты, когда их пытались задавить.',
      en: 'Stood up for my ideas and projects when they were being crushed.',
      zh: '当我的想法和项目被压制时，我坚持维护了它们。',
    },
    tag: { ru: 'Характер', en: 'Grit', zh: '毅力' },
    accent: '#EF4444',
    icon: Swords,
  },
  {
    title: { ru: 'Алгоритмы и структуры данных — T-Образование, поток B', en: 'Algorithms & Data Structures — T-Education, cohort B', zh: '算法与数据结构 — T-Education, B 班' },
    desc: {
      ru: 'Прошёл углублённый курс по алгоритмам и структурам данных.',
      en: 'Completed the advanced algorithms & data-structures course.',
      zh: '完成了进阶算法与数据结构课程。',
    },
    tag: { ru: 'Курс', en: 'Course', zh: '课程' },
    accent: '#3B82F6',
    icon: GraduationCap,
  },
];
