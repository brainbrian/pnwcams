'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed w-full z-10 border-b border-gray-400/40">
      <nav className="h-12">
        <ul className="flex h-full m-0 p-0 list-none">
          <li className="w-1/2 h-full m-0">
            <Link
              href="/surf"
              className={`block w-full h-full text-center no-underline transition-colors ${
                pathname === '/surf'
                  ? 'bg-[#579dcc] text-white'
                  : 'bg-[#b9e3ff] text-[#5c717f] hover:bg-[#579dcc] hover:text-white'
              }`}
            >
              <span className="block text-2xl relative top-1/2 -translate-y-1/2 font-oswald uppercase font-normal">
                Surf Cams
              </span>
            </Link>
          </li>
          <li className="w-1/2 h-full m-0">
            <Link
              href="/snow"
              className={`block w-full h-full text-center no-underline transition-colors ${
                pathname === '/snow'
                  ? 'bg-[#579dcc] text-white'
                  : 'bg-[#b9e3ff] text-[#5c717f] hover:bg-[#579dcc] hover:text-white'
              }`}
            >
              <span className="block text-2xl relative top-1/2 -translate-y-1/2 font-oswald uppercase font-normal">
                Snow Cams
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

