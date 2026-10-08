import Location from './Location';
import TitleCardLinks from './TitleCardLinks';
import { MountainIcon, WaveIcon } from './Icons';
import { slugify } from '../lib/utils';
import type { Link, Location as LocationType } from '../types';

interface CategoryProps {
  links: Link[];
  locations: LocationType[];
  category: 'surf' | 'snow';
}

const copy = {
  surf: {
    title: 'Surf Cams',
    blurb: 'Live breaks from Tofino to the Oregon coast — check the swell before you load the board.',
    Icon: WaveIcon,
  },
  snow: {
    title: 'Snow Cams',
    blurb: 'Live views from Cascade passes and resorts — see the snow line before you hit the road.',
    Icon: MountainIcon,
  },
};

export default function Category({ links, locations, category }: CategoryProps) {
  const { title, blurb, Icon } = copy[category];
  const cameraCount = locations.reduce((sum, l) => sum + l.cameras.length, 0);

  return (
    <div className="flex flex-col gap-8 sm:gap-10">
      <section className="flex flex-col gap-6 pt-8 sm:pt-12">
        <div className="flex flex-col gap-3">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Live now
          </span>
          <h1 className="text-gradient m-0 flex items-center gap-3 font-display text-5xl font-medium uppercase leading-none tracking-wide sm:text-6xl">
            {title}
            <Icon className="hidden h-10 w-10 text-accent/70 sm:block" />
          </h1>
          <p className="m-0 max-w-xl text-base text-muted sm:text-lg">{blurb}</p>
          <p className="m-0 text-sm text-subtle">
            <span className="font-semibold text-foreground">{locations.length}</span> locations
            <span className="mx-2">·</span>
            <span className="font-semibold text-foreground">{cameraCount}</span> cameras
          </p>
        </div>

        <div className="card flex flex-col gap-4 rounded-2xl p-4 sm:p-5">
          <TitleCardLinks links={links} />
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <nav aria-label="Jump to location" className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:gap-4">
            <h2 className="m-0 shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-subtle sm:w-20 sm:pt-2">
              Jump to
            </h2>
            <ul className="scrollbar-hide -mx-4 m-0 flex list-none gap-2 overflow-x-auto px-4 py-0.5 sm:mx-0 sm:flex-wrap sm:px-0">
              {locations.map((location) => (
                <li key={location.name} className="shrink-0">
                  <a
                    href={`#${slugify(location.name)}`}
                    className="block rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-muted no-underline transition-colors hover:border-accent/40 hover:bg-accent/10 hover:text-foreground"
                  >
                    {location.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section className="grid gap-6 sm:gap-8 xl:grid-cols-2" aria-label="Locations">
        {locations.map((location, index) => (
          <Location
            key={`loc-${index}`}
            id={index}
            name={location.name}
            latitude={location.latitude}
            longitude={location.longitude}
            link={location.link}
            links={location.links}
            cameras={location.cameras}
            weather={location.weather}
            category={category}
          />
        ))}
      </section>
    </div>
  );
}
