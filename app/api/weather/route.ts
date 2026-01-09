import { NextResponse } from 'next/server';

// OpenWeather API
// Note: AGRO_API_BASE will be added when AgroMonitoring integration is implemented
const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || 'YOUR_API_KEY';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat') || '41.8781';
  const lon = searchParams.get('lon') || '-93.0977';

  try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=imperial`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=imperial`;

    const [weatherRes, forecastRes] = await Promise.all([
      fetch(weatherUrl),
      fetch(forecastUrl)
    ]);

    if (!weatherRes.ok || !forecastRes.ok) {
      throw new Error('Weather API request failed');
    }

    const [weather, forecast] = await Promise.all([
      weatherRes.json(),
      forecastRes.json()
    ]);

    return NextResponse.json({
      success: true,
      current: weather,
      forecast: forecast,
      source: 'OpenWeatherMap API',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Weather API Error:', error);

    // Mock data for demonstration
    return NextResponse.json({
      success: true,
      current: {
        coord: { lon: parseFloat(lon), lat: parseFloat(lat) },
        weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
        main: {
          temp: 72.5,
          feels_like: 71.2,
          temp_min: 68.0,
          temp_max: 76.0,
          pressure: 1015,
          humidity: 65
        },
        wind: { speed: 8.5, deg: 180 },
        clouds: { all: 10 },
        dt: Date.now() / 1000,
        name: 'Des Moines'
      },
      forecast: {
        list: Array.from({ length: 5 }, (_, i) => ({
          dt: Date.now() / 1000 + i * 86400,
          main: {
            temp: 70 + Math.random() * 10,
            humidity: 60 + Math.random() * 20
          },
          weather: [{ main: i % 2 === 0 ? 'Clear' : 'Clouds', icon: '01d' }],
          wind: { speed: 5 + Math.random() * 5 },
          dt_txt: new Date(Date.now() + i * 86400000).toISOString()
        }))
      },
      source: 'Mock Data (OpenWeather Format)',
      timestamp: new Date().toISOString(),
      note: 'Using mock data. Add NEXT_PUBLIC_OPENWEATHER_API_KEY to .env for real data'
    });
  }
}
