import sitemap from '@/sitemap.json';

export type NavItem = {
  label: string;
  href: string;
};

type SitemapSection = {
  section: string;
  urls: string[];
};

const sectionToRootPath = (section: SitemapSection): string => {
  const first = section.urls[0];
  const url = new URL(first);
  const parts = url.pathname.split('/').filter(Boolean);
  if (parts.length === 0) {
    return '/';
  }

  const preferred = ['diensten', 'beroepsgroepen', 'nieuws', 'vacatures', 'over-ons', 'contact'];
  const found = parts.find((part) => preferred.includes(part));

  return `/${found ?? parts[0]}`;
};

const labelOverrides: Record<string, string> = {
  Home: 'Home',
  'Nieuws/Blog': 'Nieuws',
  'Werken bij': 'Werken bij',
  'Over ons': 'Over ons',
};

export const mainNavigation: NavItem[] = (sitemap.sections as SitemapSection[])
  .filter((section) => ['Home', 'Diensten', 'Beroepsgroepen', 'Nieuws/Blog', 'Werken bij', 'Over ons', 'Contact'].includes(section.section))
  .map((section) => ({
    label: labelOverrides[section.section] ?? section.section,
    href: sectionToRootPath(section),
  }))
  .filter((item, index, all) => all.findIndex((candidate) => candidate.href === item.href) === index);

export const footerNavigation: NavItem[] = [
  { label: 'Privacy', href: '/privacyverklaring' },
  { label: 'Cookies', href: '/cookies' },
  { label: 'Algemene voorwaarden', href: '/algemene-voorwaarden' },
];
