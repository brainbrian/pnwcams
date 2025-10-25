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
    <div className="relative w-full h-full">
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="absolute top-0 left-0 w-full h-full overflow-hidden object-cover"
          src={randomImage(image)}
          alt={`Web camera for ${name}`}
        />
      )}
      {iframeUrl !== '' && (
        <iframe
          className="absolute top-0 left-0 w-full h-full overflow-hidden"
          src={iframeUrl}
          frameBorder="0"
          scrolling="no"
          allowFullScreen
          title={`Web camera for ${name}`}
        />
      )}
      {name && (
        <h3
          className={`absolute text-center w-full z-[3] m-0 ${
            iframeUrl ? 'top-[35%]' : 'top-1/2'
          } -translate-y-1/2`}
        >
          <span className="bg-[rgba(185,227,255,0.5)] px-[10px] py-[5px] pb-[3px] text-[#305771] font-oswald text-2xl font-normal">
            {name}
          </span>
        </h3>
      )}
    </div>
  );
}

