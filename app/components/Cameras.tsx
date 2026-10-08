'use client';

import { useState, useRef, useEffect } from 'react';
import Camera from './Camera';
import { ChevronIcon } from './Icons';
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

  const hasMultiple = data.length > 1;
  const activeCamera = data[activeIndex] ?? data[0];

  const navButtonClass =
    'grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-foreground transition-all hover:border-accent/40 hover:bg-accent/15 disabled:pointer-events-none disabled:opacity-30 cursor-pointer';

  return (
    <div className="flex flex-col gap-3 px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="relative overflow-hidden rounded-2xl bg-black shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_12px_32px_-12px_rgba(0,0,0,0.8)]">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-scroll snap-x snap-mandatory scrollbar-hide aspect-video"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {data.map((camera, key) => (
            <div
              key={`cam-${id}-${key}`}
              className="min-w-full snap-start flex-shrink-0 h-full"
            >
              <Camera {...camera} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 px-1">
        <div className="min-w-0 flex-1">
          <p
            className="m-0 truncate font-display text-base uppercase tracking-wide text-foreground"
            aria-live="polite"
          >
            {activeCamera?.name}
          </p>
          {hasMultiple && (
            <p className="m-0 text-xs tabular-nums text-subtle">
              Camera {activeIndex + 1} of {data.length}
            </p>
          )}
        </div>

        {hasMultiple && (
          <>
            <div className="hidden items-center gap-1.5 sm:flex">
              {data.map((camera, index) => (
                <button
                  key={`dot-${id}-${index}`}
                  onClick={() => scrollToIndex(index)}
                  className={`h-2 rounded-full border-0 p-0 transition-all duration-300 cursor-pointer ${
                    activeIndex === index
                      ? 'w-6 bg-accent shadow-[0_0_10px_rgba(124,196,242,0.6)]'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to camera ${index + 1}${camera.name ? `: ${camera.name}` : ''}`}
                  aria-current={activeIndex === index ? 'true' : undefined}
                />
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scrollToIndex(activeIndex - 1)}
                disabled={activeIndex === 0}
                className={navButtonClass}
                aria-label="Previous camera"
              >
                <ChevronIcon direction="left" className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollToIndex(activeIndex + 1)}
                disabled={activeIndex >= data.length - 1}
                className={navButtonClass}
                aria-label="Next camera"
              >
                <ChevronIcon className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
