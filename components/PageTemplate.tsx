import type { ReactNode } from 'react';

type PageTemplateProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

export function PageTemplate({ title, description, children }: PageTemplateProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        {description ?? 'Placeholderpagina voor de nieuwe Next.js structuur op basis van de sitemap.'}
      </p>
      {children ? <div className="mt-8">{children}</div> : null}
    </section>
  );
}
