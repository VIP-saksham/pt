import type { Project } from './types';

/**
 * PROJECTS — Saksham Swaroop's verified work.
 *
 * To add a project, copy a block below. `accent` tints the card / index.
 * `status`: 'live' | 'indev' | 'comingsoon' | 'ideation'.
 * `featured: true` gives it a wider, emphasised card.
 * `desc` can be a string or { ru, en, zh }; existing entries use `descKey`.
 * stars/forks reflect the live GitHub API at the time of the last stats run.
 */
export const projects: Project[] = [
  {
    name: 'AICTE Compliance OS',
    status: 'live',
    descKey: 'proj.aicte.desc',
    accent: '#F59E0B',
    github: 'https://github.com/VIP-saksham/aicte-compliance-os',
    stack: ['Python'],
    stars: 0,
    forks: 0,
    language: 'Python',
    featured: true,
  },
  {
    name: 'M2M — Mitti to Market',
    status: 'live',
    descKey: 'proj.m2m.desc',
    accent: '#10B981',
    github: 'https://github.com/VIP-saksham/m2m',
    stack: ['JavaScript', 'Flask', 'React'],
    stars: 0,
    forks: 0,
    language: 'JavaScript',
    featured: true,
  },
  {
    name: 'Telegram Music Bots',
    status: 'live',
    descKey: 'proj.musicbots.desc',
    accent: '#A855F7',
    github: 'https://github.com/VIP-saksham/KeyaraMusic',
    stack: ['Python', 'Telegram Bot API', 'Audio Streaming'],
    stars: 5,
    forks: 1,
    language: 'Python',
  },
  {
    name: 'NikoPad',
    status: 'live',
    descKey: 'proj.nikopad.desc',
    accent: '#FF5D01',
    github: 'https://github.com/VIP-saksham/NikoPad',
    stack: ['Python', 'PE Engineering', 'GPLv3'],
    stars: 0,
    forks: 0,
    language: 'Python',
  },
  {
    name: 'NEXHOST / BotCloud',
    status: 'indev',
    descKey: 'proj.nexhost.desc',
    accent: '#3B82F6',
    stack: ['VPS', 'Deployment', 'Automation'],
  },
  {
    name: 'REA',
    status: 'ideation',
    descKey: 'proj.rea.desc',
    accent: '#7AA2F7',
    stack: ['Automation'],
  },
];
