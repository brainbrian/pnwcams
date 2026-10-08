import { randomImage } from '../lib/utils';
import type { Camera as CameraType } from '../types';

export default function Camera({ image, name, youtube, iframe }: CameraType) {
  let iframeUrl = '';

  if (youtube) {
    iframeUrl = `https://www.youtube-nocookie.com/embed/${youtube}`;
  } else if (iframe) {
    iframeUrl = iframe;
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-[radial-gradient(ellipse_at_center,#13293a_0%,#070e14_75%)]">
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={randomImage(image)}
          alt={`Web camera for ${name}`}
          loading="lazy"
        />
      )}
      {iframeUrl !== '' && (
        <iframe
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={iframeUrl}
          frameBorder="0"
          scrolling="no"
          allowFullScreen
          loading="lazy"
          title={`Web camera for ${name}`}
        />
      )}
      {name && image && (
        // still images get a corner label; embeds already show their own title bar
        <span className="pointer-events-none absolute left-3 top-3 z-[3] rounded-lg border border-white/15 bg-black/45 px-2.5 py-1 font-display text-sm uppercase tracking-wide text-white shadow-lg backdrop-blur-md">
          {name}
        </span>
      )}
    </div>
  );
}
