import sitemap from '@/sitemap.json';

type SitemapPage = {
  url: string;
  meta_title?: string;
  meta_description?: string;
  h1?: string[];
  h2?: string[];
  ctas?: Array<{ text: string; target: string }>;
  internal_links?: Array<{ text: string; target: string }>;
};

export type ServicePage = {
  slug: string;
  path: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h2: string[];
  ctas: Array<{ text: string; href: string }>;
  relatedServices: Array<{ title: string; href: string }>;
};

const pages = (sitemap.pages as SitemapPage[]) ?? [];

const servicePaths = new Set(
  pages
    .map((page) => {
      const pathname = new URL(page.url).pathname;
      return pathname.startsWith('/diensten/') ? pathname : null;
    })
    .filter((pathname): pathname is string => Boolean(pathname)),
);

const toLabel = (slug: string) =>
  slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const baseServices: ServicePage[] = pages
  .map((page) => {
    const pathname = new URL(page.url).pathname;
    if (!pathname.startsWith('/diensten/')) {
      return null;
    }

    const slug = pathname.replace('/diensten/', '');
    const title = page.h1?.[0] || toLabel(slug);

    const ctas = (page.ctas ?? [])
      .map((cta) => {
        const href = new URL(cta.target).pathname;
        return href.startsWith('/') ? { text: cta.text || 'Meer informatie', href } : null;
      })
      .filter((cta): cta is { text: string; href: string } => Boolean(cta));

    const relatedServices = (page.internal_links ?? [])
      .map((link) => {
        const href = new URL(link.target).pathname;
        if (!href.startsWith('/diensten/') || href === pathname || !servicePaths.has(href)) {
          return null;
        }
        return { title: link.text || toLabel(href.replace('/diensten/', '')), href };
      })
      .filter((link): link is { title: string; href: string } => Boolean(link));

    const uniqueRelated = relatedServices.filter(
      (link, index, all) => all.findIndex((candidate) => candidate.href === link.href) === index,
    );

    return {
      slug,
      path: pathname,
      title,
      metaTitle: page.meta_title ?? '',
      metaDescription: page.meta_description ?? '',
      h2: page.h2 ?? [],
      ctas,
      relatedServices: uniqueRelated,
    };
  })
  .filter((service): service is ServicePage => Boolean(service));

export const services = baseServices.sort((a, b) => a.title.localeCompare(b.title, 'nl'));

export const serviceBySlug = new Map(services.map((service) => [service.slug, service]));
