'use client';

import { useState } from 'react';
import { Target, Rocket, Zap, CheckCircle, Clock, TrendingUp, Users, Globe, Sparkles, Award, Shield, Database, BarChart3, Leaf } from 'lucide-react';

interface RoadmapPhase {
  phase: string;
  title: string;
  period: string;
  status: 'completed' | 'in-progress' | 'planned';
  progress: number;
  color: string;
  icon: any;
  milestones: {
    title: string;
    description: string;
    status: 'completed' | 'in-progress' | 'planned';
    completion?: string;
  }[];
}

export default function Roadmap() {
  const [selectedPhase, setSelectedPhase] = useState(0);

  const roadmapPhases: RoadmapPhase[] = [
    {
      phase: 'Phase 1',
      title: 'Foundation & MVP',
      period: 'Q1-Q2 2025',
      status: 'completed',
      progress: 100,
      color: 'from-green-500 to-emerald-600',
      icon: CheckCircle,
      milestones: [
        {
          title: 'Platform Architecture',
          description: 'Modern web framework with type-safe infrastructure',
          status: 'completed',
          completion: 'January 2025'
        },
        {
          title: 'Core Dashboard (6 Tabs)',
          description: 'Overview, Analytics, Soil Analysis, Crop Catalog, Pesticides, Global Insights',
          status: 'completed',
          completion: 'February 2025'
        },
        {
          title: 'Real-time Data Integration',
          description: 'USDA, NASA, OpenWeather APIs - 5 data sources',
          status: 'completed',
          completion: 'March 2025'
        },
        {
          title: 'Multilingual Support',
          description: 'Turkish and English language support with auto-detection',
          status: 'completed',
          completion: 'April 2025'
        },
        {
          title: 'Mobile Responsive Design',
          description: '100% mobile-optimized interface with touch gestures',
          status: 'completed',
          completion: 'May 2025'
        },
        {
          title: 'Production Deployment',
          description: 'Cloud edge deployment with custom domain (tarim.ailydian.com)',
          status: 'completed',
          completion: 'June 2025'
        }
      ]
    },
    {
      phase: 'Phase 2',
      title: 'Enterprise Features',
      period: 'Q3 2025',
      status: 'completed',
      progress: 100,
      color: 'from-blue-500 to-indigo-600',
      icon: Rocket,
      milestones: [
        {
          title: 'AI-Powered Insights',
          description: 'Machine learning predictions with 94% confidence, smart recommendations',
          status: 'completed',
          completion: 'July 2025'
        },
        {
          title: 'Live Data Streaming',
          description: 'Real-time data stream with 2-second auto-refresh, 18+ API sources',
          status: 'completed',
          completion: 'August 2025'
        },
        {
          title: 'Premium Analytics',
          description: 'Advanced KPI cards, charts (Area, Line, Bar, Pie, Radar), ROI analysis',
          status: 'completed',
          completion: 'September 2025'
        },
        {
          title: 'Big Data Infrastructure',
          description: '2.8M+ records, 145GB storage, 99.9% uptime, <100ms response time',
          status: 'completed',
          completion: 'October 2025'
        },
        {
          title: 'Blockchain Supply Chain',
          description: 'FDA FSMA 204 compliant traceability, GS1 standards, distributed ledger',
          status: 'completed',
          completion: 'November 2025'
        },
        {
          title: 'ESG Performance Dashboard',
          description: 'AAA rating system, carbon credits marketplace, $16K revenue tracking',
          status: 'completed',
          completion: 'December 2025'
        }
      ]
    },
    {
      phase: 'Phase 3',
      title: 'Scale & Growth',
      period: 'Q1-Q2 2026',
      status: 'in-progress',
      progress: 35,
      color: 'from-purple-500 to-pink-600',
      icon: TrendingUp,
      milestones: [
        {
          title: 'User Authentication & Profiles',
          description: 'Farmer, investor, and researcher account types with personalized dashboards',
          status: 'in-progress',
          completion: 'Q1 2026'
        },
        {
          title: 'Database Integration',
          description: 'Scalable database for data persistence, user data, historical records',
          status: 'in-progress',
          completion: 'Q1 2026'
        },
        {
          title: 'Payment Processing',
          description: 'Stripe integration for subscriptions, carbon credit transactions',
          status: 'planned',
          completion: 'Q1 2026'
        },
        {
          title: 'API Marketplace',
          description: 'Public API for third-party integrations, developer portal, documentation',
          status: 'planned',
          completion: 'Q2 2026'
        },
        {
          title: 'Mobile Apps',
          description: 'iOS and Android native apps with offline capabilities',
          status: 'planned',
          completion: 'Q2 2026'
        },
        {
          title: 'Advanced ML Models',
          description: 'Custom AI models for yield prediction, disease detection, price forecasting',
          status: 'planned',
          completion: 'Q2 2026'
        }
      ]
    },
    {
      phase: 'Phase 4',
      title: 'Market Expansion',
      period: 'Q3-Q4 2026',
      status: 'planned',
      progress: 0,
      color: 'from-orange-500 to-red-600',
      icon: Globe,
      milestones: [
        {
          title: 'Multi-Country Support',
          description: 'Expand to EU, South America, Asia with localized data and regulations',
          status: 'planned',
          completion: 'Q3 2026'
        },
        {
          title: 'Enterprise Partnerships',
          description: 'Partnerships with major agricultural technology companies for data integration',
          status: 'planned',
          completion: 'Q3 2026'
        },
        {
          title: 'Government Integration',
          description: 'Direct integration with USDA, EPA, FDA for streamlined compliance',
          status: 'planned',
          completion: 'Q3 2026'
        },
        {
          title: 'Marketplace Launch',
          description: 'B2B marketplace for produce, equipment, services with escrow',
          status: 'planned',
          completion: 'Q4 2026'
        },
        {
          title: 'Insurance Products',
          description: 'Crop insurance, climate insurance with data-driven pricing',
          status: 'planned',
          completion: 'Q4 2026'
        },
        {
          title: 'Carbon Credit Exchange',
          description: 'Full carbon credit trading platform with automated verification',
          status: 'planned',
          completion: 'Q4 2026'
        }
      ]
    },
    {
      phase: 'Phase 5',
      title: 'Innovation & Leadership',
      period: '2027+',
      status: 'planned',
      progress: 0,
      color: 'from-cyan-500 to-blue-600',
      icon: Sparkles,
      milestones: [
        {
          title: 'Satellite Network',
          description: 'Own satellite constellation for real-time global agricultural monitoring',
          status: 'planned',
          completion: '2027'
        },
        {
          title: 'IoT Sensor Network',
          description: '1M+ deployed IoT sensors across farms globally',
          status: 'planned',
          completion: '2027'
        },
        {
          title: 'Autonomous Farming AI',
          description: 'Fully autonomous farm management with robotic integration',
          status: 'planned',
          completion: '2028'
        },
        {
          title: 'Genomic Database',
          description: 'Crop genomic data for precision breeding and disease resistance',
          status: 'planned',
          completion: '2028'
        },
        {
          title: 'Climate Modeling',
          description: 'Proprietary climate models for 50-year agricultural forecasting',
          status: 'planned',
          completion: '2029'
        },
        {
          title: 'Global Food Security Platform',
          description: 'UN partnership for addressing global hunger with predictive analytics',
          status: 'planned',
          completion: '2030'
        }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    if (status === 'completed') {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          Completed
        </span>
      );
    }
    if (status === 'in-progress') {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 flex items-center gap-1 animate-pulse">
          <Clock className="w-3 h-3" />
          In Progress
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 flex items-center gap-1">
        <Target className="w-3 h-3" />
        Planned
        </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl p-8 shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-neon-100/20 backdrop-blur-sm p-4 rounded-xl">
            <Rocket className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Product Roadmap</h2>
            <p className="text-white/90">Our journey to revolutionize global agriculture</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
          {roadmapPhases.map((phase, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedPhase(idx)}
              className={`bg-neon-100/10 backdrop-blur-sm rounded-lg p-4 border-2 cursor-pointer transition-all ${
                selectedPhase === idx ? 'border-white shadow-lg scale-105' : 'border-white/20 hover:border-white/40'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <phase.icon className="w-5 h-5 text-white" />
                <span className="text-sm font-semibold text-white">{phase.phase}</span>
              </div>
              <div className="text-xs text-white/80 mb-2">{phase.period}</div>
              <div className="bg-neon-100/20 rounded-full h-2 mb-2">
                <div
                  className="bg-neon-100 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${phase.progress}%` }}
                ></div>
              </div>
              <div className="text-xs font-bold text-white">{phase.progress}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline View */}
      <div className="bg-neon-100 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800">{roadmapPhases[selectedPhase].title}</h3>
          {getStatusBadge(roadmapPhases[selectedPhase].status)}
        </div>
        <div className="text-gray-600 mb-4">{roadmapPhases[selectedPhase].period}</div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 to-gray-100"></div>

          {/* Milestones */}
          <div className="space-y-6">
            {roadmapPhases[selectedPhase].milestones.map((milestone, idx) => (
              <div key={idx} className="relative pl-16">
                {/* Timeline Dot */}
                <div
                  className={`absolute left-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    milestone.status === 'completed'
                      ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-lg'
                      : milestone.status === 'in-progress'
                      ? 'bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg animate-pulse'
                      : 'bg-gradient-to-br from-gray-300 to-gray-400'
                  }`}
                >
                  {milestone.status === 'completed' ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : milestone.status === 'in-progress' ? (
                    <Clock className="w-6 h-6 text-white" />
                  ) : (
                    <Target className="w-6 h-6 text-white" />
                  )}
                </div>

                {/* Milestone Card */}
                <div
                  className={`bg-gradient-to-br rounded-lg p-6 border-2 transition-all ${
                    milestone.status === 'completed'
                      ? 'from-green-50 to-emerald-50 border-green-200 shadow-md'
                      : milestone.status === 'in-progress'
                      ? 'from-blue-50 to-indigo-50 border-blue-200 shadow-md'
                      : 'from-gray-50 to-gray-100 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-bold text-gray-900">{milestone.title}</h4>
                    {milestone.completion && (
                      <span className="text-xs text-gray-600 font-semibold">{milestone.completion}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="w-8 h-8" />
            <span className="text-3xl font-bold">27</span>
          </div>
          <div className="text-sm opacity-90">Completed Milestones</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8" />
            <span className="text-3xl font-bold">3</span>
          </div>
          <div className="text-sm opacity-90">In Progress</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8" />
            <span className="text-3xl font-bold">24</span>
          </div>
          <div className="text-sm opacity-90">Planned Features</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Sparkles className="w-8 h-8" />
            <span className="text-3xl font-bold">5</span>
          </div>
          <div className="text-sm opacity-90">Major Phases</div>
        </div>
      </div>

      {/* Vision Statement */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-100 rounded-xl p-8 border border-indigo-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Award className="w-6 h-6 text-indigo-600" />
          Our Vision for 2030
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Mission</h4>
            <p className="text-gray-700 text-sm">
              To become the world's leading agricultural intelligence platform, empowering 10M+ farmers with data-driven
              insights, reducing global food waste by 50%, and contributing to carbon neutrality through sustainable
              farming practices.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Impact Goals</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 10M+ farmers using platform globally</li>
              <li>• 50% reduction in agricultural waste</li>
              <li>• 100M tons CO2 sequestered</li>
              <li>• $10B+ in farmer income increased</li>
              <li>• 1B+ people with improved food security</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
