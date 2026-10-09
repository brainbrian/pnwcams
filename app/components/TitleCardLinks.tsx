import { ExternalIcon } from './Icons';
import type { Link } from '../types';

interface TitleCardLinksProps {
  links: Link[];
}

export default function TitleCardLinks({ links }: TitleCardLinksProps) {
  return (
    <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:gap-4">
      <h2 className="m-0 shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-subtle sm:w-20 sm:pt-2">
        Resources
      </h2>
      <ul className="scrollbar-hide -mx-4 m-0 flex list-none gap-2 overflow-x-auto px-4 py-0.5 sm:mx-0 sm:flex-wrap sm:px-0">
        {links.map((link, index) => (
          <li key={`link-${index}`} className="shrink-0">
            <a
              href={link.url}
              className="group inline-flex items-center gap-1.5 rounded-lg border border-accent/25 bg-gradient-to-b from-accent/15 to-accent/5 px-3 py-1.5 font-display text-sm uppercase tracking-wide text-accent-soft no-underline shadow-[0_1px_0_rgba(255,255,255,0.06)_inset] transition-all hover:-translate-y-px hover:border-accent/50 hover:from-accent/25 hover:text-white hover:shadow-[0_6px_16px_-6px_rgba(124,196,242,0.5)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.name}
              <ExternalIcon className="h-3.5 w-3.5 opacity-60 transition-opacity group-hover:opacity-100" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
