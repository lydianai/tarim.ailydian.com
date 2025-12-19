'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface YieldData {
  year: string;
  value: number;
}

export default function CropYieldChart() {
  const [yieldData, setYieldData] = useState<YieldData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchYieldData();
  }, []);

  const fetchYieldData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/usda-nass?commodity=CORN&state=IOWA');
      const data = await response.json();

      if (data.data) {
        const formattedData = data.data.map((item: any) => ({
          year: item.year?.toString() || '',
          value: parseFloat(item.Value) || 0,
        })).reverse();
        setYieldData(formattedData);
      }
    } catch (error) {
      console.error('Yield data fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-neon-100 rounded-xl p-6 shadow-lg animate-pulse">
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-neon-100 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Corn Yield Trends</h3>
          <p className="text-sm text-gray-600">Iowa - Bushels per Acre</p>
        </div>
        <div className="flex items-center gap-2 text-green-600">
          <TrendingUp className="w-5 h-5" />
          <span className="text-sm font-semibold">+2.3% YoY</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={yieldData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="year"
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            label={{ value: 'Yield (BU/ACRE)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ fill: '#22c55e', r: 5 }}
            activeDot={{ r: 8 }}
            name="Yield"
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-sm text-green-700 font-semibold">Average Yield</div>
          <div className="text-2xl font-bold text-green-900">
            {yieldData.length > 0
              ? Math.round(yieldData.reduce((acc, d) => acc + d.value, 0) / yieldData.length)
              : 0} BU/AC
          </div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-sm text-blue-700 font-semibold">Peak Yield</div>
          <div className="text-2xl font-bold text-blue-900">
            {yieldData.length > 0
              ? Math.max(...yieldData.map(d => d.value))
              : 0} BU/AC
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-sm text-purple-700 font-semibold">Latest Year</div>
          <div className="text-2xl font-bold text-purple-900">
            {yieldData.length > 0
              ? yieldData[yieldData.length - 1].value
              : 0} BU/AC
          </div>
        </div>
      </div>
    </div>
  );
}
