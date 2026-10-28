'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface TemplateProps {
  children: React.ReactNode;
}

export const Template: React.FC<TemplateProps> = ({ children }: TemplateProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

const links = [
  { href: '/galeria', label: 'Galeria' },
  { href: '/upload', label: 'Enviar imagem' },
];

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 font-display text-xl font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-lg bg-forest" aria-hidden>
            <span className="size-3.5 rounded-[3px] border-2 border-white" />
          </span>
          ImageLite
        </Link>

        <nav className="flex items-center gap-1" aria-label="Principal">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                  active ? 'bg-mint text-forest-deep' : 'text-muted hover:text-ink'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-muted">
        Desenvolvido por Gabriel
      </div>
    </footer>
  );
};
