'use client';

import { useState } from 'react';
import { GLOBAL_AGRI_LEADERS, TECHNOLOGY_COMPARISONS } from '@/lib/global-agri-insights';
import { BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Globe, TrendingUp, Award, Zap, Droplets, Cpu } from 'lucide-react';

export default function GlobalComparison() {
  const [selectedCountries, setSelectedCountries] = useState(['US', 'NL', 'IL']);
  const [comparisonMetric, setComparisonMetric] = useState<'innovation' | 'productivity' | 'sustainability' | 'automation'>('innovation');

  const toggleCountry = (code: string) => {
    if (selectedCountries.includes(code)) {
      setSelectedCountries(selectedCountries.filter(c => c !== code));
    } else if (selectedCountries.length < 4) {
      setSelectedCountries([...selectedCountries, code]);
    }
  };

  const getComparisonData = () => {
    return GLOBAL_AGRI_LEADERS
      .filter(c => selectedCountries.includes(c.code))
      .map(country => ({
        name: country.country,
        innovation: country.innovationScore,
        productivity: country.farmProductivity,
        sustainability: country.sustainabilityScore,
        automation: country.automationLevel,
        waterEfficiency: country.waterEfficiency
      }));
  };

  const getRadarData = () => {
    const metrics = ['Innovation', 'Productivity', 'Sustainability', 'Automation', 'Water Efficiency'];
    return metrics.map(metric => {
      const entry: any = { metric };
      GLOBAL_AGRI_LEADERS
        .filter(c => selectedCountries.includes(c.code))
        .forEach(country => {
          const key = metric.toLowerCase().replace(' ', '');
          if (key === 'innovation') entry[country.code] = country.innovationScore;
          else if (key === 'productivity') entry[country.code] = (country.farmProductivity / 300) * 100; // normalize
          else if (key === 'sustainability') entry[country.code] = country.sustainabilityScore;
          else if (key === 'automation') entry[country.code] = country.automationLevel;
          else if (key === 'waterefficiency') entry[country.code] = country.waterEfficiency;
        });
      return entry;
    });
  };

  const technologyData = TECHNOLOGY_COMPARISONS.map(tech => ({
    name: tech.technology,
    usa: tech.adoptionRate.usa,
    netherlands: tech.adoptionRate.netherlands,
    israel: tech.adoptionRate.israel,
    japan: tech.adoptionRate.japan,
    global: tech.adoptionRate.global
  }));

  const getMetricValue = (country: any) => {
    switch (comparisonMetric) {
      case 'innovation': return country.innovationScore;
      case 'productivity': return country.farmProductivity;
      case 'sustainability': return country.sustainabilityScore;
      case 'automation': return country.automationLevel;
    }
  };

  const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-earth-900 to-earth-800 rounded-xl p-6 shadow-lg border border-earth-700">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-8 h-8 text-blue-400" />
          <div>
            <h2 className="text-2xl font-bold text-earth-100">Global Agricultural Technology Comparison</h2>
            <p className="text-sm text-earth-300">Compare leading countries in agricultural innovation and productivity</p>
          </div>
        </div>

        {/* Country Selection */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-earth-200 mb-2">Select Countries (max 4):</h3>
          <div className="flex flex-wrap gap-2">
            {GLOBAL_AGRI_LEADERS.slice(0, 8).map(country => (
              <button
                key={country.code}
                onClick={() => toggleCountry(country.code)}
                disabled={!selectedCountries.includes(country.code) && selectedCountries.length >= 4}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  selectedCountries.includes(country.code)
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-earth-800 text-earth-200 hover:bg-earth-700 border border-earth-600 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                {country.country} (#{country.rank})
              </button>
            ))}
          </div>
        </div>

        {/* Metric Selection */}
        <div>
          <h3 className="text-sm font-semibold text-earth-200 mb-2">Comparison Metric:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { key: 'innovation', label: 'Innovation Score', icon: Zap },
              { key: 'productivity', label: 'Productivity Index', icon: TrendingUp },
              { key: 'sustainability', label: 'Sustainability', icon: Globe },
              { key: 'automation', label: 'Automation Level', icon: Cpu }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setComparisonMetric(key as any)}
                className={`p-3 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
                  comparisonMetric === key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-earth-800 text-earth-200 hover:bg-earth-700 border border-earth-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Multi-Metric Radar Chart */}
      <div className="bg-gradient-to-br from-earth-900 to-earth-800 rounded-xl p-6 shadow-lg border border-earth-700">
        <h3 className="text-xl font-bold text-earth-100 mb-4">Multi-Dimensional Comparison</h3>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={getRadarData()}>
            <PolarGrid stroke="#d1d5db" />
            <PolarAngleAxis dataKey="metric" tick={{ fill: '#4b5563', fontSize: 12 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6b7280', fontSize: 10 }} />
            {selectedCountries.map((code, idx) => {
              const country = GLOBAL_AGRI_LEADERS.find(c => c.code === code);
              return country ? (
                <Radar
                  key={code}
                  name={country.country}
                  dataKey={code}
                  stroke={colors[idx]}
                  fill={colors[idx]}
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              ) : null;
            })}
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart Comparison */}
      <div className="bg-gradient-to-br from-earth-900 to-earth-800 rounded-xl p-6 shadow-lg border border-earth-700">
        <h3 className="text-xl font-bold text-earth-100 mb-4">
          {comparisonMetric.charAt(0).toUpperCase() + comparisonMetric.slice(1)} Comparison
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={getComparisonData()}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey={comparisonMetric} fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Technology Adoption Comparison */}
      <div className="bg-gradient-to-br from-earth-900 to-earth-800 rounded-xl p-6 shadow-lg border border-earth-700">
        <h3 className="text-xl font-bold text-earth-100 mb-4">Technology Adoption Rates</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={technologyData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="number" domain={[0, 100]} tick={{ fill: '#6b7280', fontSize: 12 }} />
            <YAxis dataKey="name" type="category" width={180} tick={{ fill: '#6b7280', fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar dataKey="usa" fill="#3b82f6" name="USA" />
            <Bar dataKey="netherlands" fill="#22c55e" name="Netherlands" />
            <Bar dataKey="israel" fill="#f59e0b" name="Israel" />
            <Bar dataKey="japan" fill="#ef4444" name="Japan" />
            <Bar dataKey="global" fill="#9ca3af" name="Global Avg" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Country Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {GLOBAL_AGRI_LEADERS.filter(c => selectedCountries.includes(c.code)).map((country, idx) => (
          <div key={country.code} className="bg-gradient-to-br from-earth-900 to-earth-800 rounded-xl p-6 shadow-lg border border-earth-700 border-t-4" style={{ borderTopColor: colors[idx] }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-earth-100">{country.country}</h3>
                <p className="text-sm text-earth-300">Rank #{country.rank} Globally</p>
              </div>
              <Award className="w-8 h-8" style={{ color: colors[idx] }} />
            </div>

            <div className="space-y-3">
              <div className="bg-earth-800/50 rounded-lg p-3 border border-earth-700">
                <div className="text-xs text-earth-300 mb-1">Key Technologies</div>
                <div className="flex flex-wrap gap-1">
                  {country.keyTechnologies.slice(0, 3).map((tech, i) => (
                    <span key={i} className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded border border-blue-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-green-900/30 rounded p-2 border border-green-700">
                  <div className="text-2xl font-bold text-green-400">{country.innovationScore}</div>
                  <div className="text-xs text-earth-300">Innovation</div>
                </div>
                <div className="bg-blue-900/30 rounded p-2 border border-blue-700">
                  <div className="text-2xl font-bold text-blue-400">{country.waterEfficiency}%</div>
                  <div className="text-xs text-earth-300">Water Eff.</div>
                </div>
              </div>

              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-earth-300">Agri GDP:</span>
                  <span className="font-semibold text-earth-100">${country.agriculturalGDP}B</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-earth-300">Exports:</span>
                  <span className="font-semibold text-earth-100">${country.exportValue}B</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-earth-300">R&D Investment:</span>
                  <span className="font-semibold text-earth-100">${country.rdInvestment}B/yr</span>
                </div>
              </div>

              <div className="pt-3 border-t border-earth-700">
                <div className="text-xs font-semibold text-earth-300 mb-2">Key Achievements:</div>
                <ul className="space-y-1">
                  {country.majorAchievements.slice(0, 2).map((achievement, i) => (
                    <li key={i} className="text-xs text-earth-200 flex items-start">
                      <span className="text-green-400 mr-1">✓</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* US Comparison Insights */}
      <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-xl p-6 shadow-lg border border-blue-700">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-earth-100">Insights for US Agriculture</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-earth-800/50 rounded-lg p-4 border border-earth-700">
            <div className="text-sm font-semibold text-earth-100 mb-2">🇳🇱 Learn from Netherlands</div>
            <ul className="text-xs text-earth-300 space-y-1">
              <li>• Vertical farming can increase yields by 300%</li>
              <li>• Greenhouse tech saves 90% water</li>
              <li>• LED systems optimize growth</li>
            </ul>
          </div>
          <div className="bg-earth-800/50 rounded-lg p-4 border border-earth-700">
            <div className="text-sm font-semibold text-earth-100 mb-2">🇮🇱 Learn from Israel</div>
            <ul className="text-xs text-earth-300 space-y-1">
              <li>• Drip irrigation saves 70% water</li>
              <li>• 90% wastewater recycling possible</li>
              <li>• Desert farming techniques</li>
            </ul>
          </div>
          <div className="bg-earth-800/50 rounded-lg p-4 border border-earth-700">
            <div className="text-sm font-semibold text-earth-100 mb-2">🇯🇵 Learn from Japan</div>
            <ul className="text-xs text-earth-300 space-y-1">
              <li>• Robotics reduce labor costs 35%</li>
              <li>• AI disease detection 95% accurate</li>
              <li>• Automated harvesting systems</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
