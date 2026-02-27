import Link from 'next/link';
import { notFound } from 'next/navigation';
import { serviceBySlug, services } from '../_data';

type ServiceDetailPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const service = serviceBySlug.get(params.slug);

  if (!service) {
    notFound();
  }

  const fallbackRelated = services.filter((candidate) => candidate.slug !== service.slug).slice(0, 3);
  const related = service.relatedServices.length > 0 ? service.relatedServices : fallbackRelated.map((item) => ({ title: item.title, href: `/diensten/${item.slug}` }));

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-12">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-600">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-slate-900">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/diensten" className="hover:text-slate-900">
              Diensten
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-medium text-slate-900">{service.title}</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-slate-900">{service.title}</h1>

      <div className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-white p-6">
        <p className="text-slate-700">{service.metaDescription || 'Tijdelijke tekst uit sitemap-export.'}</p>

        {service.metaTitle ? (
          <p className="text-sm text-slate-500">
            <span className="font-medium">Meta title:</span> {service.metaTitle}
          </p>
        ) : null}

        {service.h2.length > 0 ? (
          <div>
            <h2 className="text-lg font-semibold text-slate-900">H2-structuur</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
              {service.h2.map((heading) => (
                <li key={heading}>{heading}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {service.ctas.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-slate-900">CTA-links</h2>
          <div className="mt-3 flex flex-wrap gap-3">
            {service.ctas.map((cta) => (
              <Link key={`${cta.href}-${cta.text}`} href={cta.href} className="rounded-md border border-slate-300 px-3 py-2 text-sm hover:bg-slate-100">
                {cta.text}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-10 border-t border-slate-200 pt-6">
        <h2 className="text-lg font-semibold text-slate-900">Gerelateerde diensten</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {related.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-slate-700 underline-offset-2 hover:text-slate-900 hover:underline">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <Link href="/diensten" className="text-sm font-medium text-slate-700 underline underline-offset-2 hover:text-slate-900">
          ← Terug naar dienstenoverzicht
        </Link>
      </div>
    </section>
  );
}
