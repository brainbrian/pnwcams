import Cameras from './Cameras';
import TitleCard from './TitleCard';
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
    <div className="relative">
      <TitleCard
        name={name}
        link={link}
        latitude={latitude}
        longitude={longitude}
        category={category}
      />
      <Cameras data={cameras} id={id} />
    </div>
  );
}

