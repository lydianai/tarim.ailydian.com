'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Droplet, Sprout, Award, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export default function AnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState<'1M' | '3M' | '6M' | '1Y'>('3M');

  const performanceData = [
    { month: 'Jan', yield: 185, cost: 320, revenue: 580, efficiency: 75 },
    { month: 'Feb', yield: 195, cost: 310, revenue: 620, efficiency: 78 },
    { month: 'Mar', yield: 210, cost: 305, revenue: 680, efficiency: 82 },
    { month: 'Apr', yield: 225, cost: 295, revenue: 720, efficiency: 85 },
    { month: 'May', yield: 245, cost: 290, revenue: 780, efficiency: 88 },
    { month: 'Jun', yield: 260, cost: 285, revenue: 850, efficiency: 91 }
  ];

  const resourceUsageData = [
    { month: 'Jan', water: 100, fertilizer: 100, pesticides: 100, energy: 100 },
    { month: 'Feb', water: 95, fertilizer: 98, pesticides: 92, energy: 97 },
    { month: 'Mar', water: 88, fertilizer: 95, pesticides: 85, energy: 93 },
    { month: 'Apr', water: 82, fertilizer: 90, pesticides: 78, energy: 88 },
    { month: 'May', water: 75, fertilizer: 85, pesticides: 70, energy: 82 },
    { month: 'Jun', water: 70, fertilizer: 80, pesticides: 65, energy: 78 }
  ];

  const technologyROI = [
    { technology: 'Precision Irrigation', roi: 245, adoption: 85 },
    { technology: 'Drone Monitoring', roi: 180, adoption: 65 },
    { technology: 'AI Disease Detection', roi: 320, adoption: 55 },
    { technology: 'IoT Sensors', roi: 215, adoption: 75 },
    { technology: 'Automated Tractors', roi: 150, adoption: 45 },
    { technology: 'Vertical Farming', roi: 410, adoption: 35 }
  ];

  const cropPerformanceRadar = [
    { metric: 'Yield', current: 88, industry: 75 },
    { metric: 'Quality', current: 92, industry: 80 },
    { metric: 'Efficiency', current: 85, industry: 70 },
    { metric: 'Sustainability', current: 90, industry: 65 },
    { metric: 'Profitability', current: 87, industry: 72 },
    { metric: 'Innovation', current: 82, industry: 60 }
  ];

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: '$124,500',
      change: '+23.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Water Efficiency',
      value: '30% Saved',
      change: '+12.3%',
      trend: 'up',
      icon: Droplet,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Crop Yield',
      value: '260 bu/acre',
      change: '+18.7%',
      trend: 'up',
      icon: Sprout,
      color: 'from-orange-500 to-amber-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    },
    {
      title: 'Quality Score',
      value: '92/100',
      change: '+5.2%',
      trend: 'up',
      icon: Award,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Timeframe Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-earth-100">Analytics Dashboard</h2>
          <p className="text-earth-300 mt-1">Comprehensive performance insights and metrics</p>
        </div>
        <div className="flex items-center gap-2 bg-earth-800 rounded-lg p-1 shadow-md border border-earth-700">
          {(['1M', '3M', '6M', '1Y'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-4 py-2 rounded-md font-semibold text-sm transition-all ${
                timeframe === period
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md'
                  : 'bg-earth-700 text-earth-200 hover:bg-earth-600'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden bg-earth-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-earth-700 group hover:scale-105 duration-300"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${kpi.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`}></div>

            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${kpi.color}`}>
                  <kpi.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span className="text-sm font-bold">{kpi.change}</span>
                </div>
              </div>

              <div className="text-sm text-earth-300 mb-1">{kpi.title}</div>
              <div className="text-3xl font-bold text-earth-100">{kpi.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Yield & Revenue Trend */}
        <div className="bg-earth-900 rounded-xl p-6 shadow-lg border border-earth-700">
          <h3 className="text-lg font-bold text-earth-100 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Yield & Revenue Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="yieldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1410',
                  border: '1px solid #4a3f35',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  color: '#e8e2d8'
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="yield"
                stroke="#10b981"
                strokeWidth={3}
                fill="url(#yieldGradient)"
                name="Yield (bu/acre)"
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={3}
                fill="url(#revenueGradient)"
                name="Revenue ($)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Resource Usage Reduction */}
        <div className="bg-earth-900 rounded-xl p-6 shadow-lg border border-earth-700">
          <h3 className="text-lg font-bold text-earth-100 mb-4 flex items-center gap-2">
            <Droplet className="w-5 h-5 text-blue-600" />
            Resource Usage Reduction
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={resourceUsageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1410',
                  border: '1px solid #4a3f35',
                  borderRadius: '8px',
                  color: '#e8e2d8'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="water" stroke="#3b82f6" strokeWidth={2} name="Water %" />
              <Line type="monotone" dataKey="fertilizer" stroke="#10b981" strokeWidth={2} name="Fertilizer %" />
              <Line type="monotone" dataKey="pesticides" stroke="#f59e0b" strokeWidth={2} name="Pesticides %" />
              <Line type="monotone" dataKey="energy" stroke="#8b5cf6" strokeWidth={2} name="Energy %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Technology ROI & Performance Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Technology ROI */}
        <div className="bg-earth-900 rounded-xl p-6 shadow-lg border border-earth-700">
          <h3 className="text-lg font-bold text-earth-100 mb-4">Technology ROI Analysis</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={technologyROI} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis dataKey="technology" type="category" width={150} stroke="#9ca3af" style={{ fontSize: '11px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1410',
                  border: '1px solid #4a3f35',
                  borderRadius: '8px',
                  color: '#e8e2d8'
                }}
              />
              <Bar dataKey="roi" fill="#10b981" radius={[0, 8, 8, 0]} name="ROI %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Radar */}
        <div className="bg-earth-900 rounded-xl p-6 shadow-lg border border-earth-700">
          <h3 className="text-lg font-bold text-earth-100 mb-4">Performance vs Industry Average</h3>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={cropPerformanceRadar}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="metric" style={{ fontSize: '12px' }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} style={{ fontSize: '10px' }} />
              <Radar name="Your Farm" dataKey="current" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              <Radar name="Industry Avg" dataKey="industry" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights Summary */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-xl p-6 shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-4">Key Insights Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-earth-950/30 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-3xl font-bold text-white mb-1">23.5%</div>
            <div className="text-sm text-white/80">Revenue increase compared to last quarter</div>
          </div>
          <div className="bg-earth-950/30 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-3xl font-bold text-white mb-1">30%</div>
            <div className="text-sm text-white/80">Reduction in water usage through precision irrigation</div>
          </div>
          <div className="bg-earth-950/30 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-3xl font-bold text-white mb-1">$410</div>
            <div className="text-sm text-white/80">Highest ROI technology: Vertical Farming</div>
          </div>
        </div>
      </div>
    </div>
  );
}
