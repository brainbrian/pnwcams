/**
 * Convert direction in degrees to human readable compass value
 * @param num Direction in degrees
 * @returns String value of direction
 */
export function degToCompass(num: number): string {
  const val = Math.floor(num / 22.5 + 0.5);
  const arr = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];

  return arr[val % arr.length];
}

/**
 * Add random query parameter to image URL to prevent caching
 * @param img Image URL
 * @returns Image URL with random parameter
 */
export function randomImage(img: string): string {
  if (img.match(/^http.*\.(jpeg|jpg|gif|png)$/) === null) {
    return img;
  }
  const separator = img.indexOf('?') > -1 ? '&' : '?';
  return `${img}${separator}random=${Math.round(Math.random() * 100000000)}`;
}


/**
 * Convert a display name into a URL-safe anchor id
 * @param value Display name, e.g. "Snoqualmie Pass, WA"
 * @returns Slug, e.g. "snoqualmie-pass-wa"
 */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
