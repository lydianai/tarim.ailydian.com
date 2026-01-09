'use client';

import { useEffect, useState } from 'react';
import { Cloud, Droplets, Wind, Thermometer } from 'lucide-react';
import { Language } from '@/lib/i18n';

interface WeatherData {
  current: {
    main: {
      temp: number;
      humidity: number;
    };
    weather: Array<{ main: string; description: string }>;
    wind: { speed: number };
  };
  forecast: {
    list: Array<{
      dt_txt: string;
      main: { temp: number };
      weather: Array<{ main: string }>;
    }>;
  };
}

interface WeatherWidgetProps {
  lat?: number;
  lon?: number;
  language?: Language;
}

export default function WeatherWidget({ lat = 41.8781, lon = -93.0977, language = 'en' }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeather();
  }, [lat, lon]);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error('Weather fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white animate-pulse">
        <div className="h-32 flex items-center justify-center">
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  if (!weather?.current) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold">{"Current Weather"}</h3>
          <p className="text-blue-100 text-sm capitalize">
            {weather.current.weather[0]?.description || 'Clear'}
          </p>
          <p className="text-blue-200 text-xs mt-1">
            📍 {lat.toFixed(4)}°, {lon.toFixed(4)}°
          </p>
        </div>
        <Cloud className="w-12 h-12 text-blue-200" />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className="w-5 h-5" />
            <span className="text-sm text-blue-100">{"Temperature"}</span>
          </div>
          <div className="text-3xl font-bold">{Math.round(weather.current.main.temp)}°F</div>
        </div>

        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="w-5 h-5" />
            <span className="text-sm text-blue-100">{"Humidity"}</span>
          </div>
          <div className="text-3xl font-bold">{weather.current.main.humidity}%</div>
        </div>
      </div>

      <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-2">
          <Wind className="w-5 h-5" />
          <span className="text-sm text-blue-100">{"Wind Speed"}</span>
        </div>
        <div className="text-2xl font-bold">{weather.current.wind.speed} mph</div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/20">
        <h4 className="text-sm font-semibold mb-3 text-blue-100">{"5-Day Forecast"}</h4>
        <div className="grid grid-cols-5 gap-2">
          {weather.forecast?.list?.slice(0, 5).map((day, idx) => (
            <div key={idx} className="bg-white/10 rounded-lg p-2 text-center backdrop-blur-sm">
              <div className="text-xs text-blue-100 mb-1">
                {new Date(day.dt_txt).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', { weekday: 'short' })}
              </div>
              <div className="text-lg font-bold">{Math.round(day.main.temp)}°</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
