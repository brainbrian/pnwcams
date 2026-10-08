import Cameras from './Cameras';
import TitleCard from './TitleCard';
import { slugify } from '../lib/utils';
import type { Location as LocationType } from '../types';

interface LocationProps extends LocationType {
  id: number;
  category: 'surf' | 'snow';
}

export default function Location({
  cameras,
  id,
  latitude,
  link,
  longitude,
  name,
  category,
}: LocationProps) {
  return (
    <article
      id={slugify(name)}
      className="card group/card flex scroll-mt-24 flex-col overflow-hidden rounded-3xl transition-[border-color,box-shadow] duration-300 hover:border-accent/25"
    >
      <TitleCard
        name={name}
        link={link}
        latitude={latitude}
        longitude={longitude}
        category={category}
      />
      <Cameras data={cameras} id={id} />
    </article>
  );
}
