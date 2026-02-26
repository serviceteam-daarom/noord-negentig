import Link from 'next/link';
import { mainNavigation } from '@/lib/sitemap';

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-slate-900">
          Noord Negentig
        </Link>
        <nav aria-label="Hoofdnavigatie">
          <ul className="flex flex-wrap items-center gap-4 text-sm">
            {mainNavigation.map((item) => (
              <li key={item.href}>
                <Link className="text-slate-700 transition hover:text-slate-900" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
