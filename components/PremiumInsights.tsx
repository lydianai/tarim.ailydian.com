'use client';

import { useState } from 'react';
import { Sparkles, TrendingUp, Target, Lightbulb, Award, Zap, Brain, Rocket } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export default function PremiumInsights() {
  const [selectedInsight, setSelectedInsight] = useState(0);

  const insights = [
    {
      id: 1,
      icon: Brain,
      title: 'AI-Powered Yield Prediction',
      description: 'Machine learning models predict 23% yield increase potential',
      impact: 'High',
      confidence: 94,
      color: 'from-purple-500 to-pink-500',
      metrics: {
        current: 185,
        potential: 227,
        improvement: '+23%'
      }
    },
    {
      id: 2,
      icon: Zap,
      title: 'Precision Irrigation Opportunity',
      description: 'Implementing Israeli drip tech can save 70% water',
      impact: 'Critical',
      confidence: 97,
      color: 'from-blue-500 to-cyan-500',
      metrics: {
        current: '100%',
        potential: '30%',
        improvement: '-70%'
      }
    },
    {
      id: 3,
      icon: Rocket,
      title: 'Vertical Farming ROI',
      description: 'Dutch greenhouse technology shows 300% productivity gain',
      impact: 'High',
      confidence: 89,
      color: 'from-green-500 to-emerald-500',
      metrics: {
        current: 100,
        potential: 400,
        improvement: '+300%'
      }
    },
    {
      id: 4,
      icon: Target,
      title: 'Optimal Pesticide Strategy',
      description: 'Switch to biological controls reduces costs by 35%',
      impact: 'Medium',
      confidence: 91,
      color: 'from-orange-500 to-red-500',
      metrics: {
        current: '$250/acre',
        potential: '$162/acre',
        improvement: '-35%'
      }
    }
  ];

  const adoptionData = [
    { name: 'USA', value: 65 },
    { name: 'Netherlands', value: 25 },
    { name: 'Israel', value: 5 },
    { name: 'Japan', value: 5 }
  ];

  const trendData = [
    { month: 'Jan', value: 100 },
    { month: 'Feb', value: 115 },
    { month: 'Mar', value: 125 },
    { month: 'Apr', value: 140 },
    { month: 'May', value: 155 },
    { month: 'Jun', value: 175 },
  ];

  const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-xl p-8 shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Premium Insights Dashboard</h2>
            <p className="text-white/80">AI-powered recommendations to revolutionize your farming</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          {[
            { label: 'Potential ROI', value: '+185%', icon: TrendingUp },
            { label: 'Water Savings', value: '70%', icon: Zap },
            { label: 'Yield Increase', value: '+23%', icon: Award },
            { label: 'AI Confidence', value: '93%', icon: Brain }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className="w-5 h-5 text-white" />
                <span className="text-xs text-white/70">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {insights.map((insight, idx) => (
          <div
            key={insight.id}
            onClick={() => setSelectedInsight(idx)}
            className={`relative overflow-hidden rounded-xl p-6 cursor-pointer transition-all duration-300 ${
              selectedInsight === idx
                ? 'bg-white shadow-2xl scale-105 ring-2 ring-purple-500'
                : 'bg-white shadow-lg hover:shadow-xl'
            }`}
          >
            {/* Gradient Background */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${insight.color} opacity-10 blur-3xl`}></div>

            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${insight.color}`}>
                    <insight.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{insight.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-xs text-gray-600 mb-1">Current</div>
                  <div className="font-bold text-gray-900">{insight.metrics.current}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-xs text-gray-600 mb-1">Potential</div>
                  <div className="font-bold text-gray-900">{insight.metrics.potential}</div>
                </div>
                <div className={`bg-gradient-to-br ${insight.color} rounded-lg p-3 text-center`}>
                  <div className="text-xs text-white/80 mb-1">Improvement</div>
                  <div className="font-bold text-white">{insight.metrics.improvement}</div>
                </div>
              </div>

              {/* Impact & Confidence */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    insight.impact === 'Critical' ? 'bg-red-100 text-red-700' :
                    insight.impact === 'High' ? 'bg-orange-100 text-orange-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {insight.impact} Impact
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs text-gray-600">AI Confidence:</div>
                  <div className="font-bold text-green-600">{insight.confidence}%</div>
                </div>
              </div>

              {/* Confidence Bar */}
              <div className="mt-3 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${insight.color} transition-all duration-1000`}
                  style={{ width: `${insight.confidence}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Adoption Pie Chart */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Technology Adoption by Country
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={adoptionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {adoptionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {adoptionData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                <span className="text-gray-700">{item.name}</span>
                <span className="text-gray-500 ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trend Area Chart */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Productivity Trend Projection
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#22c55e"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 text-sm text-green-800">
              <Lightbulb className="w-4 h-4" />
              <span className="font-semibold">Insight:</span>
              <span>Implementing recommendations can achieve 75% productivity increase by June</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Rocket className="w-6 h-6" />
          Recommended Action Plan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { step: 1, title: 'Immediate', action: 'Deploy precision sensors', timeline: '1-2 weeks' },
            { step: 2, title: 'Short-term', action: 'Install drip irrigation', timeline: '1-2 months' },
            { step: 3, title: 'Long-term', action: 'Implement AI analytics', timeline: '3-6 months' }
          ].map((item) => (
            <div key={item.step} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                  {item.step}
                </div>
                <span className="text-xs text-white/70 uppercase tracking-wide">{item.title}</span>
              </div>
              <div className="text-white font-semibold mb-1">{item.action}</div>
              <div className="text-xs text-white/60">Timeline: {item.timeline}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
