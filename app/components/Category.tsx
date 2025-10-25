import Location from './Location';
import TitleCardLinks from './TitleCardLinks';
import type { Link, Location as LocationType } from '../types';

interface CategoryProps {
  links: Link[];
  locations: LocationType[];
  category: 'surf' | 'snow';
}

export default function Category({ links, locations, category }: CategoryProps) {
  return (
    <div>
      <section className="links">
        <TitleCardLinks links={links} />
      </section>
      <section className="locations">
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

