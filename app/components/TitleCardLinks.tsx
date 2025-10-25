import type { Link } from '../types';

interface TitleCardLinksProps {
  links: Link[];
}

export default function TitleCardLinks({ links }: TitleCardLinksProps) {
  return (
    <div className="bg-[#b9e3ff] border-b border-[#a8bcc7] h-12 sm:h-16 table w-full text-center">
      <ul className="table-cell align-middle m-0 p-0 w-full">
        {links.map((link, index) => (
          <li key={`link-${index}`} className="inline-block mx-2 sm:mx-3">
            <a
              href={link.url}
              className="text-[#5c717f] no-underline font-oswald text-base sm:text-xl uppercase font-normal sm:transition-colors sm:hover:text-[#3d4d56]"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

