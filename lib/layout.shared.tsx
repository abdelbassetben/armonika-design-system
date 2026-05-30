import type { BaseLayoutProps, LinkItemType } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

const links: LinkItemType[] = [
  { type: 'main', text: 'Colors', url: '/colors' },
  { type: 'main', text: 'Get Started', url: '/docs/get-started' },
];

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
    },
    links,
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
