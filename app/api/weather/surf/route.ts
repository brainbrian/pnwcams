import { NextRequest, NextResponse } from 'next/server';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'aedd7de81c14d670e877d39ead4ed7b4';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return NextResponse.json(
      { error: 'Missing latitude or longitude' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${API_URL}?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Weather API request failed');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching surf weather:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}

