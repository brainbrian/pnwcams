'use client';

import { useState, useRef, useEffect } from 'react';
import Camera from './Camera';
import type { Camera as CameraType } from '../types';

interface CamerasProps {
  data: CameraType[];
  id: number;
}

export default function Cameras({ data, id }: CamerasProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const itemWidth = container.offsetWidth;
      const index = Math.round(scrollLeft / itemWidth);
      setActiveIndex(index);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToIndex = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const itemWidth = container.offsetWidth;
    container.scrollTo({
      left: itemWidth * index,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-scroll snap-x snap-mandatory bg-black h-[300px] sm:h-[420px] md:h-[540px] lg:h-[660px] scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {data.map((camera, key) => (
          <div
            key={`cam-${id}-${key}`}
            className="min-w-full snap-start flex-shrink-0"
          >
            <Camera {...camera} />
          </div>
        ))}
      </div>
      <div className="absolute top-[144px] sm:top-[205px] w-full text-center">
        {data.map((_, index) => (
          <button
            key={`dot-${id}-${index}`}
            onClick={() => scrollToIndex(index)}
            className={`w-3 h-3 md:w-4 md:h-4 lg:w-[18px] lg:h-[18px] rounded-full mx-1 opacity-70 transition-colors border-0 cursor-pointer ${
              activeIndex === index ? 'bg-[#305771]' : 'bg-[#a8bcc7]'
            }`}
            aria-label={`Go to camera ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
}

