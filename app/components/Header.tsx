'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MountainIcon, WaveIcon } from './Icons';

const tabs = [
  { href: '/surf', label: 'Surf', Icon: WaveIcon },
  { href: '/snow', label: 'Snow', Icon: MountainIcon },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="glass-strong sticky top-0 z-20 border-x-0 border-t-0">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="group flex items-center gap-2.5 no-underline"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-strong text-[#0b1620] shadow-[0_4px_16px_-2px_rgba(124,196,242,0.5)] transition-transform group-hover:-rotate-6">
            <MountainIcon className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-medium uppercase tracking-wide text-foreground">
            PNW<span className="text-accent">Cams</span>
          </span>
        </Link>

        <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-black/25 p-1 shadow-inner">
          {tabs.map(({ href, label, Icon }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-display text-base uppercase tracking-wide no-underline transition-all duration-200 sm:px-5 ${
                    active
                      ? 'bg-gradient-to-b from-accent to-accent-strong text-[#0b1620] shadow-[0_2px_10px_-2px_rgba(124,196,242,0.6)]'
                      : 'text-muted hover:bg-white/5 hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
