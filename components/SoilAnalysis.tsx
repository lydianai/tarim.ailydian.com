'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { Sprout, Droplet, TestTube, Activity } from 'lucide-react';

export default function SoilAnalysis() {
  const [soilData] = useState({
    pH: 6.5,
    organicMatter: 3.2,
    nitrogen: 45,
    phosphorus: 38,
    potassium: 210,
    texture: 'Silty Loam',
    drainage: 'Well Drained',
    erosionRisk: 'Low'
  });

  const nutrientData = [
    { nutrient: 'Nitrogen', value: soilData.nitrogen, optimal: 50, unit: 'ppm' },
    { nutrient: 'Phosphorus', value: soilData.phosphorus, optimal: 40, unit: 'ppm' },
    { nutrient: 'Potassium', value: soilData.potassium, optimal: 200, unit: 'ppm' },
  ];

  const radarData = [
    { property: 'pH', value: (soilData.pH / 7) * 100, fullMark: 100 },
    { property: 'Organic Matter', value: (soilData.organicMatter / 5) * 100, fullMark: 100 },
    { property: 'N', value: (soilData.nitrogen / 50) * 100, fullMark: 100 },
    { property: 'P', value: (soilData.phosphorus / 40) * 100, fullMark: 100 },
    { property: 'K', value: (soilData.potassium / 200) * 100, fullMark: 100 },
  ];

  return (
    <div className="bg-neon-100 rounded-xl p-6 shadow-lg">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Soil Analysis</h3>
        <p className="text-sm text-gray-600">Based on USDA SSURGO Database</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-4 border border-amber-200">
            <div className="flex items-center gap-3 mb-2">
              <TestTube className="w-5 h-5 text-amber-700" />
              <span className="font-semibold text-amber-900">Soil Properties</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-amber-700">pH Level:</span>
                <span className="font-semibold text-amber-900">{soilData.pH}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-700">Texture:</span>
                <span className="font-semibold text-amber-900">{soilData.texture}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-700">Organic Matter:</span>
                <span className="font-semibold text-amber-900">{soilData.organicMatter}%</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <Droplet className="w-5 h-5 text-blue-700" />
              <span className="font-semibold text-blue-900">Drainage & Erosion</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-700">Drainage:</span>
                <span className="font-semibold text-blue-900">{soilData.drainage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Erosion Risk:</span>
                <span className="font-semibold text-blue-900">{soilData.erosionRisk}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <div className="flex items-center gap-3 mb-2">
              <Sprout className="w-5 h-5 text-green-700" />
              <span className="font-semibold text-green-900">Crop Recommendations</span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-green-800">Corn (Excellent)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-green-800">Soybeans (Excellent)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                <span className="text-green-800">Wheat (Good)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Soil Health Index
          </h4>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#d1d5db" />
              <PolarAngleAxis dataKey="property" tick={{ fill: '#4b5563', fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6b7280', fontSize: 10 }} />
              <Radar name="Current Value" dataKey="value" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-3">Nutrient Levels vs Optimal</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={nutrientData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="nutrient" tick={{ fill: '#6b7280', fontSize: 12 }} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar dataKey="value" fill="#22c55e" name="Current" />
            <Bar dataKey="optimal" fill="#94a3b8" name="Optimal" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
