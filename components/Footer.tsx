import Link from 'next/link';
import { footerNavigation } from '@/lib/sitemap';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Noord Negentig</p>
        <nav aria-label="Footer navigatie">
          <ul className="flex flex-wrap items-center gap-4">
            {footerNavigation.map((item) => (
              <li key={item.href}>
                <Link className="hover:text-slate-900" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
