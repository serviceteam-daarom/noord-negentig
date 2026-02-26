import Link from 'next/link';
import { services } from './_data';

export default function DienstenPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-600">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-slate-900">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-medium text-slate-900">Diensten</li>
        </ol>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Diensten</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Overzicht van alle dienstpagina&apos;s uit de sitemap-export. Dit is tijdelijke content uit de JSON-inventaris.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <article key={service.slug} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{service.title}</h2>
            <p className="mt-2 line-clamp-3 text-sm text-slate-600">
              {service.metaDescription || 'Tijdelijke samenvatting vanuit de sitemap-export.'}
            </p>
            <Link
              href={`/diensten/${service.slug}`}
              className="mt-4 inline-flex rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
            >
              Bekijk dienst
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
