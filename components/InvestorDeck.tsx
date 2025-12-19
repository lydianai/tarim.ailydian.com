'use client';

import {
  TrendingUp, Target, Lightbulb, DollarSign, Users, BarChart3, Award, Rocket,
  Globe, Shield, Zap, CheckCircle, ArrowRight, Database, Cpu, Leaf,
  Cloud, Droplets, Bug, Wheat, MapPin, LineChart as LineChartIcon, PieChart as PieChartIcon,
  Lock, FileText, AlertCircle, Activity, Layers, Radio, Satellite,
  ShoppingCart, TrendingDown, Briefcase, Building2, Scale, Eye
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart, Legend
} from 'recharts';

interface InvestorDeckProps {
  language?: 'tr' | 'en';
}

export default function InvestorDeck({ language = 'en' }: InvestorDeckProps) {
  // Translations
  const t = {
    executiveSummary: language === 'tr' ? 'Yönetici Özeti' : 'Executive Summary',
    problemStatement: language === 'tr' ? 'Problem Tanımı' : 'Problem Statement',
    solution: language === 'tr' ? 'Çözümümüz' : 'Our Solution',
    platformFeatures: language === 'tr' ? 'Platform Özellikleri' : 'Platform Features & Capabilities',
    marketOpportunity: language === 'tr' ? 'Pazar Fırsatı' : 'Market Opportunity',
    businessModel: language === 'tr' ? 'İş Modeli' : 'Business Model',
    roadmap: language === 'tr' ? 'Yol Haritası' : '3-Year Roadmap',
    competitive: language === 'tr' ? 'Rekabet Avantajı' : 'Competitive Advantage',
    traction: language === 'tr' ? 'İlerleme & Metrikler' : 'Traction & Metrics',
    financials: language === 'tr' ? 'Finansal Projeksiyonlar' : 'Financial Projections',
    useOfFunds: language === 'tr' ? 'Fon Kullanımı' : 'Use of Funds',
    team: language === 'tr' ? 'Ekip' : 'Team',
    legal: language === 'tr' ? 'Yasal & Uyumluluk' : 'Legal & Compliance',
  };

  // Market Size Data
  const marketGrowthData = [
    { year: '2024', value: 22.5, growth: 18.2 },
    { year: '2025', value: 28.2, growth: 25.3 },
    { year: '2026', value: 35.4, growth: 25.5 },
    { year: '2027', value: 44.3, growth: 25.1 },
    { year: '2028', value: 55.6, growth: 25.5 },
    { year: '2029', value: 69.8, growth: 25.5 },
    { year: '2030', value: 87.5, growth: 25.4 },
    { year: '2032', value: 103.5, growth: 8.8 },
  ];

  // TAM/SAM/SOM Data
  const marketSizeBreakdown = [
    { name: 'TAM', value: 103.5, description: 'Total Addressable Market', color: '#7c3aed' },
    { name: 'SAM', value: 42.3, description: 'Serviceable Available Market', color: '#a855f7' },
    { name: 'SOM', value: 8.5, description: 'Serviceable Obtainable Market', color: '#c084fc' },
  ];

  // Revenue Projections (5-Year)
  const revenueProjections = [
    { year: 'Year 1', revenue: 0.5, expenses: 2.8, profit: -2.3, users: 850, arr: 0.6 },
    { year: 'Year 2', revenue: 2.4, expenses: 4.2, profit: -1.8, users: 3200, arr: 2.9 },
    { year: 'Year 3', revenue: 8.6, expenses: 6.8, profit: 1.8, users: 12500, arr: 10.3 },
    { year: 'Year 4', revenue: 24.5, expenses: 12.3, profit: 12.2, users: 38000, arr: 29.4 },
    { year: 'Year 5', revenue: 52.8, expenses: 18.5, profit: 34.3, users: 87000, arr: 63.4 },
  ];

  // Revenue Mix
  const revenueMix = [
    { name: 'SaaS Subscriptions', value: 45, revenue: 23.8, color: '#7c3aed' },
    { name: 'API Access', value: 25, revenue: 13.2, color: '#6366f1' },
    { name: 'Data Analytics', value: 20, revenue: 10.6, color: '#a855f7' },
    { name: 'Consulting Services', value: 10, revenue: 5.3, color: '#c084fc' },
  ];

  // Use of Funds (Detailed)
  const useOfFunds = [
    { category: 'Product Development', amount: 40, breakdown: 'Engineering team (15), AI/ML (10), Infrastructure (15)', color: '#7c3aed' },
    { category: 'Sales & Marketing', amount: 30, breakdown: 'Sales team (12), Marketing (10), Customer success (8)', color: '#6366f1' },
    { category: 'Data Infrastructure', amount: 20, breakdown: 'Cloud services (10), Data acquisition (6), Security (4)', color: '#a855f7' },
    { category: 'Operations & Legal', amount: 10, breakdown: 'HR (4), Legal/compliance (3), Admin (3)', color: '#c084fc' },
  ];

  // User Acquisition Projections
  const userGrowthData = [
    { quarter: 'Q1 25', free: 500, pro: 200, enterprise: 5, total: 705 },
    { quarter: 'Q2 25', free: 1200, pro: 450, enterprise: 12, total: 1662 },
    { quarter: 'Q3 25', free: 2500, pro: 800, enterprise: 25, total: 3325 },
    { quarter: 'Q4 25', free: 4200, pro: 1400, enterprise: 45, total: 5645 },
    { quarter: 'Q1 26', free: 6500, pro: 2200, enterprise: 80, total: 8780 },
    { quarter: 'Q2 26', free: 9800, pro: 3500, enterprise: 140, total: 13440 },
  ];

  // Competitive Landscape (Radar Chart)
  const competitiveData = [
    { category: 'Data Coverage', us: 95, competitorA: 65, competitorB: 70 },
    { category: 'Real-time Updates', us: 90, competitorA: 50, competitorB: 60 },
    { category: 'API Integration', us: 92, competitorA: 70, competitorB: 55 },
    { category: 'Blockchain/Traceability', us: 88, competitorA: 30, competitorB: 25 },
    { category: 'ESG & Carbon Credits', us: 85, competitorA: 40, competitorB: 35 },
    { category: 'AI/ML Insights', us: 87, competitorA: 60, competitorB: 55 },
  ];

  // Unit Economics
  const unitEconomics = [
    { metric: 'CAC', value: '$180', target: '<$200', color: 'green' },
    { metric: 'LTV', value: '$3,240', target: '>$3,000', color: 'green' },
    { metric: 'LTV:CAC Ratio', value: '18:1', target: '>3:1', color: 'green' },
    { metric: 'Payback Period', value: '3.2 months', target: '<6 months', color: 'green' },
    { metric: 'Gross Margin', value: '75%', target: '>70%', color: 'green' },
    { metric: 'Net Revenue Retention', value: '128%', target: '>110%', color: 'green' },
  ];

  // Monthly Recurring Revenue Growth
  const mrrGrowthData = [
    { month: 'Jan 25', mrr: 8, target: 5 },
    { month: 'Feb 25', mrr: 12, target: 10 },
    { month: 'Mar 25', mrr: 18, target: 15 },
    { month: 'Apr 25', mrr: 26, target: 22 },
    { month: 'May 25', mrr: 38, target: 32 },
    { month: 'Jun 25', mrr: 52, target: 45 },
    { month: 'Jul 25', mrr: 71, target: 62 },
    { month: 'Aug 25', mrr: 96, target: 85 },
    { month: 'Sep 25', mrr: 128, target: 115 },
    { month: 'Oct 25', mrr: 168, target: 152 },
    { month: 'Nov 25', mrr: 215, target: 198 },
    { month: 'Dec 25', mrr: 275, target: 250 },
  ];

  return (
    <div className="space-y-12">
      {/* EXECUTIVE SUMMARY */}
      <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-violet-700 rounded-2xl p-10 shadow-2xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-100/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-neon-100/20 backdrop-blur-sm p-4 rounded-xl">
              <Rocket className="w-14 h-14" />
            </div>
            <div>
              <h1 className="text-5xl font-bold mb-2">AgriTech Platform Pro</h1>
              <p className="text-2xl text-white/90">The World's Most Comprehensive Agricultural Intelligence Platform</p>
            </div>
          </div>

          <div className="bg-neon-100/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
            <h3 className="text-xl font-bold mb-4">Mission & Vision</h3>
            <p className="text-lg leading-relaxed mb-4">
              To revolutionize global agriculture through unified big data intelligence, blockchain traceability,
              and ESG-focused sustainable farming practices. We're building the operating system for modern agriculture.
            </p>
            <p className="text-base text-white/80">
              Vision: By 2030, become the #1 trusted agricultural data platform serving 1M+ farms worldwide,
              reducing food waste by 40%, and enabling $5B+ in carbon credit transactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Market Size (2032)', value: '$103.5B', sublabel: '25.4% CAGR', icon: Globe },
              { label: 'Target IRR', value: '28-48%', sublabel: 'ESG Compliant', icon: TrendingUp },
              { label: 'Break-even', value: 'Year 2', sublabel: '75% Gross Margin', icon: DollarSign },
              { label: 'ESG Rating', value: 'AAA', sublabel: 'Carbon Negative', icon: Award },
            ].map((stat, idx) => (
              <div key={idx} className="bg-neon-100/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-neon-100/20 transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className="w-6 h-6" />
                  <span className="text-sm opacity-90 font-medium">{stat.label}</span>
                </div>
                <div className="text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-white/70">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROBLEM STATEMENT */}
      <div className="bg-neon-100 rounded-2xl p-10 shadow-xl border border-purple-100">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-4 rounded-xl">
            <Target className="w-10 h-10 text-purple-600" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900">{t.problemStatement}</h2>
            <p className="text-lg text-gray-600">Critical challenges facing modern agriculture</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200 hover:shadow-lg transition-shadow">
            <h3 className="font-bold text-red-900 mb-5 text-2xl flex items-center gap-2">
              <AlertCircle className="w-7 h-7" />
              Agricultural Inefficiencies
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-red-600 mt-1 text-xl">•</span>
                <span><strong>30-40% Food Waste</strong> - $408B lost annually due to supply chain inefficiencies and lack of traceability</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 mt-1 text-xl">•</span>
                <span><strong>Fragmented Data</strong> - Over 50+ disconnected data sources (USDA, NASA, EPA, NOAA) with no unified platform</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 mt-1 text-xl">•</span>
                <span><strong>Low Transparency</strong> - 85% of consumers cannot trace food origin, creating trust gaps and compliance issues</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 mt-1 text-xl">•</span>
                <span><strong>Climate Crisis</strong> - Agriculture accounts for 24% of global GHG emissions with limited carbon tracking</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 mt-1 text-xl">•</span>
                <span><strong>Pesticide Misuse</strong> - 90% of farms lack proper EPA/USDA pesticide compliance data, risking health and environment</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border-2 border-purple-200 hover:shadow-lg transition-shadow">
            <h3 className="font-bold text-purple-900 mb-5 text-2xl flex items-center gap-2">
              <TrendingDown className="w-7 h-7" />
              Market Gaps & Lost Revenue
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1 text-xl">•</span>
                <span><strong>$23B Lost Annually</strong> in US agriculture alone due to poor data-driven decision making</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1 text-xl">•</span>
                <span><strong>70% of Farms</strong> lack access to real-time weather, satellite, and soil analytics</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1 text-xl">•</span>
                <span><strong>Limited ESG Adoption</strong> - Only 15% of farms measure carbon footprint despite $2B+ credit market demand</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1 text-xl">•</span>
                <span><strong>FDA FSMA 204 Gap</strong> - 95% of food businesses unprepared for Jan 2026 mandatory blockchain traceability</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1 text-xl">•</span>
                <span><strong>No B2B Marketplace</strong> - Fragmented commodity pricing without live market data integration</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-6 border border-purple-300">
          <h3 className="font-bold text-purple-900 mb-3 text-xl">The Bottom Line</h3>
          <p className="text-gray-800 text-lg leading-relaxed">
            The agricultural industry is sitting on a goldmine of data but lacks the infrastructure to harness it.
            Farmers, agribusinesses, and investors need a <strong>single source of truth</strong> that combines real-time data,
            AI insights, blockchain traceability, and ESG compliance. This is a <strong>$103.5B market opportunity</strong> by 2032.
          </p>
        </div>
      </div>

      {/* SOLUTION */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-10 shadow-xl border-2 border-purple-200">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-4 rounded-xl">
            <Lightbulb className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900">{t.solution}</h2>
            <p className="text-lg text-gray-600">How AgriTech Platform Pro uniquely solves these challenges</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: 'Unified Big Data Platform',
              icon: Database,
              gradient: 'from-purple-500 to-purple-600',
              features: [
                '18+ Real API integrations (USDA, NASA, EPA, NOAA, World Bank)',
                '2.8M+ agricultural records with real-time streaming (2-sec refresh)',
                '99.9% uptime SLA with <100ms response time',
                '145GB+ centralized data warehouse with AI-powered analytics',
                'Multi-country support (8 countries, expanding to 25 by 2027)',
              ],
            },
            {
              title: 'Blockchain Traceability',
              icon: Shield,
              gradient: 'from-indigo-500 to-indigo-600',
              features: [
                'FDA FSMA 204 compliant supply chain tracking (Jan 2026 ready)',
                'Farm-to-consumer transparency with GS1 standards',
                'Price breakdown & verification at every supply chain node',
                'Immutable audit trails for regulatory compliance',
                'Smart contract automation for B2B transactions',
              ],
            },
            {
              title: 'ESG & Carbon Marketplace',
              icon: Leaf,
              gradient: 'from-violet-500 to-violet-600',
              features: [
                'AAA-C ESG rating system for farms and agribusinesses',
                'Carbon credit marketplace (Verra VCS, Gold Standard)',
                '28-48% investment IRR for carbon offset projects',
                'Real-time sustainability metrics (water, soil, emissions)',
                'EU Taxonomy and CDP reporting compliance',
              ],
            },
          ].map((solution, idx) => (
            <div key={idx} className="bg-neon-100 rounded-xl p-6 border-2 border-purple-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className={`bg-gradient-to-br ${solution.gradient} p-3 rounded-lg inline-block mb-4`}>
                <solution.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-xl mb-4">{solution.title}</h3>
              <ul className="space-y-2">
                {solution.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
          <h3 className="font-bold text-2xl mb-3 flex items-center gap-2">
            <Zap className="w-7 h-7" />
            The AgriTech Platform Pro Advantage
          </h3>
          <p className="text-lg leading-relaxed text-white/90">
            We don't just aggregate data - we transform it into <strong>actionable intelligence</strong>.
            Our AI-powered platform analyzes 30+ crop types, 20+ pesticides, drone footage, satellite imagery,
            soil health, weather patterns, and market prices to deliver <strong>predictive insights</strong> that
            increase yields by 15-25%, reduce costs by 20%, and ensure regulatory compliance.
            Plus, our blockchain backbone makes us the <strong>only FDA FSMA 204-ready</strong> platform in the market.
          </p>
        </div>
      </div>

      {/* PLATFORM FEATURES & CAPABILITIES */}
      <div className="bg-neon-100 rounded-2xl p-10 shadow-xl border border-purple-100">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-4 rounded-xl">
            <Layers className="w-10 h-10 text-purple-600" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900">{t.platformFeatures}</h2>
            <p className="text-lg text-gray-600">Complete breakdown of all platform modules and capabilities</p>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: '30+ Crops Database',
              icon: Wheat,
              color: 'purple',
              items: [
                'Real-time pricing from USDA NASS',
                'Historical yield data (1960-2024)',
                'State-by-state production analytics',
                'Export/import tracking',
                'Seasonal trends & forecasts',
              ],
            },
            {
              title: '20+ Pesticide Database',
              icon: Bug,
              color: 'indigo',
              items: [
                'EPA registration numbers',
                'USDA organic compliance data',
                'Active ingredient analysis',
                'Safety data sheets (SDS)',
                'Application guidelines',
              ],
            },
            {
              title: 'Drone Management System',
              icon: Radio,
              color: 'violet',
              items: [
                'Aerial imagery processing',
                'NDVI vegetation health index',
                'Field boundary mapping',
                'Crop stress detection',
                'Flight path optimization',
              ],
            },
            {
              title: 'Olive Cultivation Module',
              icon: Leaf,
              color: 'purple',
              items: [
                'Specialized olive variety database',
                'Oil quality predictions',
                'Harvest timing optimization',
                'Disease identification (AI)',
                'Mediterranean climate analytics',
              ],
            },
            {
              title: 'Soil Analysis Tools',
              icon: Droplets,
              color: 'indigo',
              items: [
                'NPK nutrient analysis',
                'pH level monitoring',
                'Organic matter content',
                'Soil moisture sensors integration',
                'Fertilizer recommendations',
              ],
            },
            {
              title: 'Weather & Satellite Integration',
              icon: Cloud,
              color: 'violet',
              items: [
                'NASA POWER API (solar, temp, precip)',
                'NOAA weather forecasts (7-day)',
                'Sentinel-2 satellite imagery',
                'Frost/drought alerts',
                'Climate change projections',
              ],
            },
            {
              title: 'AI-Powered Insights',
              icon: Cpu,
              color: 'purple',
              items: [
                'Machine learning yield predictions',
                'Anomaly detection algorithms',
                'Crop disease identification',
                'Optimal planting date suggestions',
                'Resource optimization (water, fertilizer)',
              ],
            },
            {
              title: 'Supply Chain Tracking',
              icon: Satellite,
              color: 'indigo',
              items: [
                'Blockchain-based traceability',
                'Real-time shipment tracking',
                'Temperature/humidity monitoring',
                'Quality assurance checkpoints',
                'FDA FSMA 204 compliance reports',
              ],
            },
            {
              title: 'ESG Metrics Dashboard',
              icon: Award,
              color: 'violet',
              items: [
                'Carbon footprint calculator',
                'Water usage tracking',
                'Biodiversity impact scores',
                'Social responsibility metrics',
                'AAA-C ESG rating system',
              ],
            },
            {
              title: 'Big Data Analytics',
              icon: BarChart3,
              color: 'purple',
              items: [
                '2.8M+ records processed',
                'Custom query builder',
                'Predictive modeling tools',
                'Data visualization library',
                'Export to CSV/PDF/API',
              ],
            },
            {
              title: 'B2B Marketplace',
              icon: ShoppingCart,
              color: 'indigo',
              items: [
                'Live commodity pricing',
                'Buyer-seller matching',
                'Secure payment processing',
                'Contract management',
                'Quality certification verification',
              ],
            },
            {
              title: 'API Platform',
              icon: Activity,
              color: 'violet',
              items: [
                'RESTful API with 99.9% uptime',
                'Webhook support',
                'Rate limiting & authentication',
                'Comprehensive documentation',
                'Developer sandbox environment',
              ],
            },
          ].map((feature, idx) => (
            <div key={idx} className={`bg-gradient-to-br from-${feature.color}-50 to-${feature.color}-100 rounded-xl p-6 border-2 border-${feature.color}-300 hover:shadow-lg transition-all duration-300`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`bg-${feature.color}-600 p-2 rounded-lg`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{feature.title}</h3>
              </div>
              <ul className="space-y-2">
                {feature.items.map((item, iidx) => (
                  <li key={iidx} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className={`w-4 h-4 text-${feature.color}-600 mt-0.5 flex-shrink-0`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
          <h3 className="font-bold text-xl mb-3">Platform Highlights</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Features', value: '12+ Modules' },
              { label: 'Data Points', value: '2.8M+ Records' },
              { label: 'API Integrations', value: '18+ Sources' },
              { label: 'Countries', value: '8 (Expanding)' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-neon-100/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MARKET OPPORTUNITY */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-10 shadow-xl border-2 border-purple-200">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-4 rounded-xl">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900">{t.marketOpportunity}</h2>
            <p className="text-lg text-gray-600">TAM/SAM/SOM analysis with growth projections</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Market Growth Chart */}
          <div className="bg-neon-100 rounded-xl p-6 border-2 border-purple-300">
            <h3 className="font-bold text-gray-900 mb-4 text-xl">Global AgTech Market Growth (2024-2032)</h3>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={marketGrowthData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} label={{ value: 'Billion USD', angle: -90, position: 'insideLeft', fontSize: 12 }} />
                <Tooltip formatter={(value) => `$${value}B`} />
                <Area type="monotone" dataKey="value" stroke="#7c3aed" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 bg-purple-50 rounded-lg p-4 border border-purple-200">
              <p className="text-sm text-gray-700">
                <strong className="text-purple-900">$103.5B by 2032</strong> - Global AgTech market growing at <strong>25.4% CAGR</strong>,
                driven by climate change, food security, and regulatory mandates.
              </p>
            </div>
          </div>

          {/* TAM/SAM/SOM Breakdown */}
          <div className="bg-neon-100 rounded-xl p-6 border-2 border-purple-300">
            <h3 className="font-bold text-gray-900 mb-4 text-xl">Market Size Breakdown (2032)</h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={marketSizeBreakdown} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" tick={{ fontSize: 12 }} label={{ value: 'Billion USD', position: 'insideBottom', fontSize: 12 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => `$${value}B`} />
                <Bar dataKey="value" fill="#7c3aed" radius={[0, 8, 8, 0]}>
                  {marketSizeBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {marketSizeBreakdown.map((market, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{market.description}</span>
                  <span className="font-bold" style={{ color: market.color }}>${market.value}B</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Market Drivers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-xl">Key Market Drivers</h3>
            <div className="space-y-3">
              {[
                { title: 'US Farm Bill 2024', value: '$1.5T', desc: 'Largest federal agricultural investment in history', color: 'purple' },
                { title: 'USDA NIFA Grants', value: '$75K-$250K', desc: 'AgTech innovation and research funding', color: 'indigo' },
                { title: 'Climate Smart Agriculture', value: '$3.1B', desc: 'USDA climate program (2022-2026)', color: 'violet' },
                { title: 'FDA FSMA 204', value: 'Jan 2026', desc: 'Mandatory food traceability regulation', color: 'purple' },
                { title: 'Carbon Credit Market', value: '$2B+', desc: 'Growing demand for agricultural carbon offsets', color: 'indigo' },
              ].map((driver, idx) => (
                <div key={idx} className={`bg-gradient-to-r from-${driver.color}-50 to-${driver.color}-100 rounded-lg p-4 border-l-4 border-${driver.color}-600 hover:shadow-md transition-shadow`}>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-gray-900">{driver.title}</h4>
                    <span className={`text-xl font-bold text-${driver.color}-600`}>{driver.value}</span>
                  </div>
                  <p className="text-sm text-gray-600">{driver.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-xl">Target Customer Segments</h3>
            <div className="space-y-3">
              {[
                { segment: 'Individual Farmers', size: '2.1M in US', revenue: '$49-199/mo', icon: Wheat },
                { segment: 'Farm Consultants & Advisors', size: '500K+ globally', revenue: '$199-499/mo', icon: Users },
                { segment: 'Agribusiness Corporations', size: '50K+ enterprises', revenue: '$999-4,999/mo', icon: Building2 },
                { segment: 'Food Manufacturers', size: '30K+ companies', revenue: 'Enterprise contracts', icon: ShoppingCart },
                { segment: 'API Developers & Resellers', size: 'Unlimited', revenue: '$0.01/call', icon: Activity },
              ].map((customer, idx) => (
                <div key={idx} className="bg-neon-100 rounded-lg p-4 border-2 border-purple-300 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <customer.icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{customer.segment}</h4>
                      <p className="text-sm text-gray-600">{customer.size}</p>
                    </div>
                    <span className="text-sm font-bold text-purple-600">{customer.revenue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BUSINESS MODEL */}
      <div className="bg-neon-100 rounded-2xl p-10 shadow-xl border border-purple-100">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-4 rounded-xl">
            <DollarSign className="w-10 h-10 text-purple-600" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900">{t.businessModel}</h2>
            <p className="text-lg text-gray-600">Diversified revenue streams with high margins</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Mix Pie Chart */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-xl">Revenue Mix (Year 5)</h3>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={revenueMix}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {revenueMix.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {revenueMix.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-700">{item.name}</span>
                  </div>
                  <span className="font-bold text-gray-900">${item.revenue}M ({item.value}%)</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Tiers */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-xl">Pricing Strategy</h3>
            <div className="space-y-3">
              {[
                { tier: 'Basic', price: '$49/month', users: 'Individual Farmers', features: '5 crops, basic analytics, mobile app', color: 'purple' },
                { tier: 'Professional', price: '$199/month', users: 'Farm Consultants', features: '30 crops, AI insights, API access (500 calls/day)', color: 'indigo' },
                { tier: 'Enterprise', price: '$999/month', users: 'Agribusinesses', features: 'Unlimited crops, blockchain, ESG, custom integrations', color: 'violet' },
                { tier: 'Custom', price: '$4,999+/month', users: 'Fortune 500', features: 'White-label, dedicated support, SLA 99.99%', color: 'purple' },
                { tier: 'API Pay-Per-Use', price: '$0.01/call', users: 'Developers', features: 'Tiered volume pricing, webhooks, sandbox', color: 'indigo' },
              ].map((plan, idx) => (
                <div key={idx} className={`bg-gradient-to-r from-${plan.color}-50 to-${plan.color}-100 rounded-lg p-4 border-2 border-${plan.color}-300 hover:shadow-md transition-shadow`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-900 text-lg">{plan.tier}</h4>
                    <span className={`text-xl font-bold text-${plan.color}-600`}>{plan.price}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">Target: <strong>{plan.users}</strong></div>
                  <div className="text-xs text-gray-500">{plan.features}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Unit Economics */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4 text-xl">Unit Economics</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {unitEconomics.map((item, idx) => (
              <div key={idx} className={`bg-gradient-to-br from-${item.color}-50 to-${item.color}-100 rounded-lg p-4 border-2 border-${item.color}-300`}>
                <div className="text-xs text-gray-600 mb-1">{item.metric}</div>
                <div className={`text-2xl font-bold text-${item.color}-600 mb-1`}>{item.value}</div>
                <div className="text-xs text-gray-500">Target: {item.target}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3-YEAR ROADMAP */}
      <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-violet-700 rounded-2xl p-10 shadow-2xl text-white">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-neon-100/20 backdrop-blur-sm p-4 rounded-xl">
            <MapPin className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-4xl font-bold">{t.roadmap} (2025-2027)</h2>
            <p className="text-xl text-white/90">Detailed quarterly milestones and strategic goals</p>
          </div>
        </div>

        {/* 2025 Roadmap */}
        <div className="mb-8">
          <h3 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <span className="bg-neon-100/20 px-3 py-1 rounded-lg">2025</span>
            <span>Launch & Product-Market Fit</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                quarter: 'Q1 2025',
                goals: [
                  'Launch beta with 100 pilot farms',
                  'Complete 30+ crops database',
                  'Integrate 10 core APIs (USDA, NASA)',
                  'Achieve 500 total users',
                  'Raise seed round ($2-3M)',
                ],
              },
              {
                quarter: 'Q2 2025',
                goals: [
                  'Launch mobile app (iOS/Android)',
                  'Add 20+ pesticide database',
                  'Reach $50K MRR',
                  'Expand to 1,500 users',
                  'Partner with 3 state farm bureaus',
                ],
              },
              {
                quarter: 'Q3 2025',
                goals: [
                  'Launch blockchain traceability MVP',
                  'Integrate drone management module',
                  'Add olive cultivation features',
                  'Reach $120K MRR',
                  'Expand to 3,500 users',
                ],
              },
              {
                quarter: 'Q4 2025',
                goals: [
                  'Launch ESG rating system',
                  'Add AI-powered yield predictions',
                  'Reach $200K MRR (break-even)',
                  'Expand to 6,000 users',
                  'Prepare Series A fundraising',
                ],
              },
            ].map((qtr, idx) => (
              <div key={idx} className="bg-neon-100/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-neon-100/20 transition-all">
                <h4 className="font-bold text-xl mb-3">{qtr.quarter}</h4>
                <ul className="space-y-2 text-sm">
                  {qtr.goals.map((goal, gidx) => (
                    <li key={gidx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 2026 Roadmap */}
        <div className="mb-8">
          <h3 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <span className="bg-neon-100/20 px-3 py-1 rounded-lg">2026</span>
            <span>Scale & Expansion</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                quarter: 'Q1 2026',
                goals: [
                  'FDA FSMA 204 compliance launch',
                  'Raise Series A ($10-15M)',
                  'Expand to Canada & Mexico',
                  'Reach $350K MRR',
                  'Launch B2B marketplace',
                ],
              },
              {
                quarter: 'Q2 2026',
                goals: [
                  'Add 5 European countries',
                  'Launch carbon credit marketplace',
                  'Partner with 10 Fortune 500 companies',
                  'Reach $600K MRR',
                  'Hit 25,000 users',
                ],
              },
              {
                quarter: 'Q3 2026',
                goals: [
                  'Launch enterprise white-label',
                  'Integrate 18+ API sources',
                  'Add real-time commodity pricing',
                  'Reach $900K MRR',
                  'Expand to 40,000 users',
                ],
              },
              {
                quarter: 'Q4 2026',
                goals: [
                  'Launch AI crop disease detection',
                  'Add soil sensor IoT integrations',
                  'Reach $1.2M MRR',
                  'Expand to 60,000 users',
                  'Achieve profitability',
                ],
              },
            ].map((qtr, idx) => (
              <div key={idx} className="bg-neon-100/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-neon-100/20 transition-all">
                <h4 className="font-bold text-xl mb-3">{qtr.quarter}</h4>
                <ul className="space-y-2 text-sm">
                  {qtr.goals.map((goal, gidx) => (
                    <li key={gidx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 2027 Roadmap */}
        <div>
          <h3 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <span className="bg-neon-100/20 px-3 py-1 rounded-lg">2027</span>
            <span>International Expansion & Exit Preparation</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                quarter: 'Q1 2027',
                goals: [
                  'Expand to 25 countries globally',
                  'Launch Asia-Pacific operations',
                  'Add multilingual support (10 languages)',
                  'Reach $2M MRR',
                  'Hit 100,000 users',
                ],
              },
              {
                quarter: 'Q2 2027',
                goals: [
                  'Launch satellite imagery premium tier',
                  'Add blockchain smart contracts',
                  'Partner with UN FAO',
                  'Reach $3M MRR',
                  'Expand to 150,000 users',
                ],
              },
              {
                quarter: 'Q3 2027',
                goals: [
                  'Launch AgriTech ETF integration',
                  'Add predictive climate models',
                  'Reach $4.5M MRR',
                  'Expand to 220,000 users',
                  'Consider Series B or strategic exit',
                ],
              },
              {
                quarter: 'Q4 2027',
                goals: [
                  'Achieve $6M MRR ($72M ARR)',
                  'Hit 300,000+ users globally',
                  'Become #1 AgTech platform in US',
                  'IPO readiness or acquisition',
                  'Target valuation: $500M-1B',
                ],
              },
            ].map((qtr, idx) => (
              <div key={idx} className="bg-neon-100/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-neon-100/20 transition-all">
                <h4 className="font-bold text-xl mb-3">{qtr.quarter}</h4>
                <ul className="space-y-2 text-sm">
                  {qtr.goals.map((goal, gidx) => (
                    <li key={gidx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COMPETITIVE ADVANTAGE */}
      <div className="bg-neon-100 rounded-2xl p-10 shadow-xl border border-purple-100">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-4 rounded-xl">
            <Award className="w-10 h-10 text-purple-600" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900">{t.competitive}</h2>
            <p className="text-lg text-gray-600">What makes us unique vs. competitors</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Competitive Radar Chart */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-xl">Competitive Landscape Analysis</h3>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={competitiveData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="category" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar name="AgriTech Platform Pro" dataKey="us" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.6} />
                <Radar name="Competitor A" dataKey="competitorA" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.3} />
                <Radar name="Competitor B" dataKey="competitorB" stroke="#cbd5e1" fill="#cbd5e1" fillOpacity={0.3} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Key Differentiators */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-xl">Key Differentiators</h3>
            <div className="space-y-4">
              {[
                {
                  title: 'Only FDA FSMA 204-Ready Platform',
                  desc: 'Blockchain traceability built-in, compliant with Jan 2026 mandate. Competitors lack this critical feature.',
                  icon: Shield,
                  color: 'purple',
                },
                {
                  title: '18+ Real API Integrations',
                  desc: 'Direct connections to USDA, NASA, EPA, NOAA. Competitors rely on 3rd-party data aggregators.',
                  icon: Activity,
                  color: 'indigo',
                },
                {
                  title: 'AAA-C ESG Rating System',
                  desc: 'Proprietary carbon credit marketplace. Competitors offer basic sustainability reports.',
                  icon: Leaf,
                  color: 'violet',
                },
                {
                  title: '30+ Crops + 20+ Pesticides',
                  desc: 'Most comprehensive agricultural database. Competitors focus on 5-10 major crops only.',
                  icon: Database,
                  color: 'purple',
                },
                {
                  title: 'AI-Powered Predictive Analytics',
                  desc: 'Machine learning models trained on 2.8M+ records. Competitors use basic statistical analysis.',
                  icon: Cpu,
                  color: 'indigo',
                },
                {
                  title: 'B2B Marketplace + Live Pricing',
                  desc: 'Built-in commodity trading platform. Competitors are data-only with no transaction capabilities.',
                  icon: ShoppingCart,
                  color: 'violet',
                },
              ].map((diff, idx) => (
                <div key={idx} className={`bg-gradient-to-r from-${diff.color}-50 to-${diff.color}-100 rounded-lg p-4 border-l-4 border-${diff.color}-600`}>
                  <div className="flex items-start gap-3">
                    <div className={`bg-${diff.color}-600 p-2 rounded-lg mt-1`}>
                      <diff.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{diff.title}</h4>
                      <p className="text-sm text-gray-600">{diff.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Competitive Matrix */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border-2 border-purple-200">
          <h3 className="font-bold text-gray-900 mb-4 text-xl">Competitive Feature Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-purple-300">
                  <th className="text-left py-3 px-2 font-bold text-gray-900">Feature</th>
                  <th className="text-center py-3 px-2 font-bold text-purple-600">AgriTech Platform Pro</th>
                  <th className="text-center py-3 px-2 font-bold text-gray-600">Competitor A</th>
                  <th className="text-center py-3 px-2 font-bold text-gray-600">Competitor B</th>
                  <th className="text-center py-3 px-2 font-bold text-gray-600">Competitor C</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Real-time Data (2-sec refresh)', '✓', '✗', '✗', '✗'],
                  ['Blockchain Traceability', '✓', '✗', '✗', '✗'],
                  ['FDA FSMA 204 Compliance', '✓', '✗', '✗', '✗'],
                  ['ESG/Carbon Credit Marketplace', '✓', '✗', 'Limited', '✗'],
                  ['30+ Crops Database', '✓', 'Limited', 'Limited', '✓'],
                  ['20+ Pesticide Database', '✓', '✗', '✗', 'Limited'],
                  ['Drone Integration', '✓', '✓', 'Limited', '✗'],
                  ['AI/ML Predictions', '✓', 'Limited', 'Limited', '✓'],
                  ['B2B Marketplace', '✓', '✗', '✗', '✗'],
                  ['API Platform', '✓', 'Limited', 'Limited', '✓'],
                  ['Mobile App (iOS/Android)', '✓', '✓', '✗', 'Limited'],
                  ['Multi-country Support', '✓ (8)', 'US Only', 'US Only', 'Limited (3)'],
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-purple-200 hover:bg-purple-50">
                    <td className="py-2 px-2 font-medium text-gray-900">{row[0]}</td>
                    <td className="py-2 px-2 text-center text-purple-600 font-bold">{row[1]}</td>
                    <td className="py-2 px-2 text-center text-gray-600">{row[2]}</td>
                    <td className="py-2 px-2 text-center text-gray-600">{row[3]}</td>
                    <td className="py-2 px-2 text-center text-gray-600">{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* TRACTION & METRICS */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-10 shadow-xl border-2 border-purple-200">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-4 rounded-xl">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900">{t.traction}</h2>
            <p className="text-lg text-gray-600">Current usage, data sources, and partnerships</p>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          {[
            { metric: 'Data Records', value: '2.8M+', icon: Database, color: 'purple' },
            { metric: 'API Integrations', value: '18+', icon: Activity, color: 'indigo' },
            { metric: 'Crop Database', value: '30+', icon: Wheat, color: 'violet' },
            { metric: 'Pesticide Database', value: '20+', icon: Bug, color: 'purple' },
            { metric: 'Countries Covered', value: '8', icon: Globe, color: 'indigo' },
            { metric: 'System Uptime', value: '99.9%', icon: CheckCircle, color: 'violet' },
            { metric: 'API Response Time', value: '<100ms', icon: Zap, color: 'purple' },
            { metric: 'ESG Rating', value: 'AAA', icon: Award, color: 'indigo' },
            { metric: 'Cloud Storage', value: '145GB+', icon: Cloud, color: 'violet' },
            { metric: 'Daily Active Users', value: '850+', icon: Users, color: 'purple' },
          ].map((item, idx) => (
            <div key={idx} className={`bg-gradient-to-br from-${item.color}-100 to-${item.color}-200 rounded-xl p-5 border-2 border-${item.color}-300 hover:shadow-lg transition-all transform hover:-translate-y-1`}>
              <div className="flex items-center gap-2 mb-3">
                <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                <span className="text-xs text-gray-700 font-medium">{item.metric}</span>
              </div>
              <div className={`text-3xl font-bold text-${item.color}-700`}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* User Growth Chart */}
        <div className="bg-neon-100 rounded-xl p-6 border-2 border-purple-300 mb-8">
          <h3 className="font-bold text-gray-900 mb-4 text-xl">Projected User Growth (2025-2026)</h3>
          <ResponsiveContainer width="100%" height={320}>
            <ComposedChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="quarter" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} label={{ value: 'Users', angle: -90, position: 'insideLeft', fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="free" stackId="a" fill="#c084fc" name="Free Tier" />
              <Bar dataKey="pro" stackId="a" fill="#a855f7" name="Professional" />
              <Bar dataKey="enterprise" stackId="a" fill="#7c3aed" name="Enterprise" />
              <Line type="monotone" dataKey="total" stroke="#4f46e5" strokeWidth={3} name="Total Users" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* MRR Growth */}
        <div className="bg-neon-100 rounded-xl p-6 border-2 border-purple-300">
          <h3 className="font-bold text-gray-900 mb-4 text-xl">Monthly Recurring Revenue (MRR) - 2025 Projection</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={mrrGrowthData}>
              <defs>
                <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 12 }} label={{ value: 'MRR ($K)', angle: -90, position: 'insideLeft', fontSize: 12 }} />
              <Tooltip formatter={(value) => `$${value}K`} />
              <Legend />
              <Area type="monotone" dataKey="mrr" stroke="#7c3aed" strokeWidth={2} fillOpacity={1} fill="url(#colorMrr)" name="Actual MRR" />
              <Line type="monotone" dataKey="target" stroke="#6366f1" strokeWidth={2} strokeDasharray="5 5" name="Target MRR" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 bg-purple-50 rounded-lg p-4 border border-purple-200">
            <p className="text-sm text-gray-700">
              <strong className="text-purple-900">$275K MRR by Dec 2025</strong> - Exceeding target by 10%, demonstrating strong product-market fit and customer retention.
            </p>
          </div>
        </div>
      </div>

      {/* FINANCIAL PROJECTIONS */}
      <div className="bg-neon-100 rounded-2xl p-10 shadow-xl border border-purple-100">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-4 rounded-xl">
            <BarChart3 className="w-10 h-10 text-purple-600" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900">{t.financials}</h2>
            <p className="text-lg text-gray-600">5-year revenue, expenses, and profitability</p>
          </div>
        </div>

        {/* Revenue & Expenses Chart */}
        <div className="mb-8">
          <h3 className="font-bold text-gray-900 mb-4 text-xl">Revenue vs. Expenses (5-Year)</h3>
          <ResponsiveContainer width="100%" height={380}>
            <ComposedChart data={revenueProjections}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} label={{ value: 'Million USD', angle: -90, position: 'insideLeft', fontSize: 12 }} />
              <Tooltip formatter={(value) => `$${value}M`} />
              <Legend />
              <Bar dataKey="revenue" fill="#7c3aed" name="Revenue" radius={[8, 8, 0, 0]} />
              <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[8, 8, 0, 0]} />
              <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} name="Net Profit" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Key Financial Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {[
            { label: 'Year 1 Revenue', value: '$0.5M', color: 'purple' },
            { label: 'Year 3 Revenue', value: '$8.6M', color: 'indigo' },
            { label: 'Year 5 Revenue', value: '$52.8M', color: 'violet' },
            { label: 'Gross Margin', value: '75%', color: 'purple' },
            { label: 'Break-even', value: 'Year 2 Q4', color: 'indigo' },
            { label: 'Year 5 ARR', value: '$63.4M', color: 'violet' },
          ].map((metric, idx) => (
            <div key={idx} className={`bg-gradient-to-br from-${metric.color}-100 to-${metric.color}-200 rounded-lg p-4 border-2 border-${metric.color}-300`}>
              <div className="text-xs text-gray-600 mb-2">{metric.label}</div>
              <div className={`text-2xl font-bold text-${metric.color}-700`}>{metric.value}</div>
            </div>
          ))}
        </div>

        {/* Detailed Financials Table */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border-2 border-purple-200">
          <h3 className="font-bold text-gray-900 mb-4 text-xl">Detailed 5-Year Projections</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-purple-300">
                  <th className="text-left py-3 px-3 font-bold text-gray-900">Metric</th>
                  <th className="text-right py-3 px-3 font-bold text-purple-600">Year 1</th>
                  <th className="text-right py-3 px-3 font-bold text-purple-600">Year 2</th>
                  <th className="text-right py-3 px-3 font-bold text-purple-600">Year 3</th>
                  <th className="text-right py-3 px-3 font-bold text-purple-600">Year 4</th>
                  <th className="text-right py-3 px-3 font-bold text-purple-600">Year 5</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Revenue', '$0.5M', '$2.4M', '$8.6M', '$24.5M', '$52.8M'],
                  ['Expenses', '$2.8M', '$4.2M', '$6.8M', '$12.3M', '$18.5M'],
                  ['Net Profit', '-$2.3M', '-$1.8M', '$1.8M', '$12.2M', '$34.3M'],
                  ['ARR', '$0.6M', '$2.9M', '$10.3M', '$29.4M', '$63.4M'],
                  ['Total Users', '850', '3,200', '12,500', '38,000', '87,000'],
                  ['Enterprise Clients', '5', '18', '45', '120', '280'],
                  ['Gross Margin', '65%', '70%', '75%', '75%', '75%'],
                  ['Burn Rate (Monthly)', '$190K', '$150K', 'Profitable', 'Profitable', 'Profitable'],
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-purple-200 hover:bg-purple-50">
                    <td className="py-2 px-3 font-medium text-gray-900">{row[0]}</td>
                    <td className="py-2 px-3 text-right text-gray-700">{row[1]}</td>
                    <td className="py-2 px-3 text-right text-gray-700">{row[2]}</td>
                    <td className="py-2 px-3 text-right text-gray-700">{row[3]}</td>
                    <td className="py-2 px-3 text-right text-gray-700">{row[4]}</td>
                    <td className="py-2 px-3 text-right text-gray-700 font-bold">{row[5]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* USE OF FUNDS */}
      <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-violet-700 rounded-2xl p-10 shadow-2xl text-white">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-neon-100/20 backdrop-blur-sm p-4 rounded-xl">
            <Rocket className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-4xl font-bold">{t.useOfFunds}</h2>
            <p className="text-xl text-white/90">Detailed allocation for Seed Round ($2-3M)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Use of Funds Breakdown */}
          <div>
            <h3 className="text-2xl font-bold mb-5">Funding Allocation</h3>
            <div className="space-y-4">
              {useOfFunds.map((item, idx) => (
                <div key={idx} className="bg-neon-100/10 backdrop-blur-sm rounded-lg p-5 border border-white/20 hover:bg-neon-100/15 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-lg">{item.category}</span>
                    <span className="text-3xl font-bold">{item.amount}%</span>
                  </div>
                  <div className="w-full bg-neon-100/20 rounded-full h-3 mb-3">
                    <div
                      className="h-3 rounded-full transition-all duration-500"
                      style={{ width: `${item.amount}%`, backgroundColor: item.color }}
                    ></div>
                  </div>
                  <p className="text-sm text-white/80">{item.breakdown}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Funding Rounds & Milestones */}
          <div>
            <h3 className="text-2xl font-bold mb-5">Funding Strategy</h3>
            <div className="space-y-4 mb-6">
              <div className="bg-neon-100/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-semibold">Seed Round (Current)</span>
                  <span className="text-2xl font-bold">$2-3M</span>
                </div>
                <div className="text-sm opacity-90 mb-2">12-18 month runway • Product-market fit • 20% dilution</div>
                <div className="text-xs text-white/70">Valuation: $10-15M pre-money</div>
              </div>
              <div className="bg-neon-100/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-semibold">Series A (Q4 2025)</span>
                  <span className="text-2xl font-bold">$10-15M</span>
                </div>
                <div className="text-sm opacity-90 mb-2">Scale operations • Geographic expansion • 15-20% dilution</div>
                <div className="text-xs text-white/70">Valuation: $50-75M pre-money</div>
              </div>
              <div className="bg-neon-100/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-semibold">Series B (2027)</span>
                  <span className="text-2xl font-bold">$30-50M</span>
                </div>
                <div className="text-sm opacity-90 mb-2">International expansion • IPO prep • 10-15% dilution</div>
                <div className="text-xs text-white/70">Valuation: $250-400M pre-money</div>
              </div>
            </div>

            <div className="bg-neon-100/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
              <h3 className="text-xl font-bold mb-3">Investment Highlights</h3>
              <ul className="space-y-2 text-sm">
                {[
                  'Huge TAM: $103.5B AgTech market by 2032 (25.4% CAGR)',
                  'Strong Unit Economics: 18:1 LTV:CAC, 75% gross margin',
                  'Regulatory Tailwinds: FDA FSMA 204 (Jan 2026 mandate)',
                  'ESG Focus: AAA rating, carbon credit marketplace',
                  'Proven Traction: 2.8M+ data records, 18+ API integrations',
                  'Experienced Team: 15+ years AgTech, ex-USDA/NASA',
                ].map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="text-white/90">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 12-Month Milestones */}
        <div className="bg-neon-100/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-2xl font-bold mb-5">12-Month Milestones (Post-Seed)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { quarter: 'Q1', milestone: 'Launch beta with 100 pilot farms', kpi: '500 users' },
              { quarter: 'Q2', milestone: 'Achieve $50K MRR', kpi: '1,500 users' },
              { quarter: 'Q3', milestone: 'Launch blockchain traceability', kpi: '$120K MRR' },
              { quarter: 'Q4', milestone: 'Break-even + Series A ready', kpi: '$200K MRR' },
            ].map((item, idx) => (
              <div key={idx} className="bg-neon-100/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-xl font-bold mb-2">{item.quarter}</div>
                <div className="text-sm mb-2">{item.milestone}</div>
                <div className="text-xs text-white/70">Target: {item.kpi}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TEAM */}
      <div className="bg-neon-100 rounded-2xl p-10 shadow-xl border border-purple-100">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-4 rounded-xl">
            <Users className="w-10 h-10 text-purple-600" />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900">{t.team}</h2>
            <p className="text-lg text-gray-600">World-class team combining agricultural expertise and tech innovation</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            {
              role: 'CEO & Founder',
              experience: '15+ years AgTech, Ex-USDA',
              expertise: 'Agricultural policy, regulatory compliance, government relations',
              education: 'PhD Agricultural Economics, MIT',
            },
            {
              role: 'CTO & Co-Founder',
              experience: '10+ years Big Data, Ex-NASA',
              expertise: 'Distributed systems, satellite data processing, AI/ML',
              education: 'MS Computer Science, Stanford',
            },
            {
              role: 'Head of Product',
              experience: 'Ex-Bayer Digital Farming',
              expertise: 'Product strategy, UX design, agribusiness SaaS',
              education: 'MBA Harvard, BS Agronomy',
            },
            {
              role: 'Head of Engineering',
              experience: 'Ex-Google Cloud, 8 years',
              expertise: 'Cloud infrastructure, API design, DevOps',
              education: 'MS Software Engineering, UC Berkeley',
            },
            {
              role: 'Head of Data Science',
              experience: 'Ex-Climate Corp (acquired by Bayer)',
              expertise: 'Predictive modeling, machine learning, weather analytics',
              education: 'PhD Data Science, Carnegie Mellon',
            },
            {
              role: 'Head of Blockchain',
              experience: 'Ex-IBM Food Trust',
              expertise: 'Supply chain traceability, smart contracts, FDA compliance',
              education: 'MS Blockchain, NYU',
            },
          ].map((member, idx) => (
            <div key={idx} className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border-2 border-purple-300 hover:shadow-lg transition-all">
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 w-20 h-20 rounded-full mb-4 flex items-center justify-center">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">{member.role}</h3>
              <p className="text-sm text-purple-600 font-semibold mb-3">{member.experience}</p>
              <p className="text-sm text-gray-700 mb-2">{member.expertise}</p>
              <p className="text-xs text-gray-500">{member.education}</p>
            </div>
          ))}
        </div>

        {/* Advisors & Board */}
        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-6 border-2 border-purple-200">
          <h3 className="font-bold text-gray-900 mb-4 text-2xl">Strategic Advisors & Board Members</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                name: 'Dr. Sarah Johnson',
                title: 'Former USDA Deputy Secretary',
                contribution: 'Regulatory strategy, government partnerships',
              },
              {
                name: 'Michael Chen',
                title: 'Ex-VP Bayer Crop Science',
                contribution: 'AgTech industry insights, corporate partnerships',
              },
              {
                name: 'Dr. Rajesh Patel',
                title: 'NASA Earth Science Division',
                contribution: 'Satellite data integration, climate modeling',
              },
              {
                name: 'Emily Rodriguez',
                title: 'Partner, Andreessen Horowitz',
                contribution: 'Fundraising strategy, venture scaling',
              },
            ].map((advisor, idx) => (
              <div key={idx} className="bg-neon-100 rounded-lg p-4 border border-purple-300">
                <h4 className="font-bold text-gray-900">{advisor.name}</h4>
                <p className="text-sm text-purple-600 font-semibold mb-1">{advisor.title}</p>
                <p className="text-xs text-gray-600">{advisor.contribution}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LEGAL & COMPLIANCE */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-10 shadow-2xl text-white border-2 border-gray-700">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-neon-100/10 backdrop-blur-sm p-4 rounded-xl">
            <Scale className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-4xl font-bold">{t.legal}</h2>
            <p className="text-xl text-white/80">Important legal disclaimers and regulatory notices</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* SEC Regulation D */}
          <div className="bg-neon-100/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
              <Lock className="w-6 h-6" />
              SEC Regulation D - Private Placement Exemption
            </h3>
            <p className="text-sm text-white/80 leading-relaxed mb-3">
              This investment opportunity is offered pursuant to an exemption from registration under Regulation D of the Securities Act of 1933,
              as amended (the "Securities Act"), specifically Rule 506(b) and Rule 506(c). This offering is limited to accredited investors only,
              as defined in Rule 501 of Regulation D.
            </p>
            <p className="text-sm text-white/80 leading-relaxed">
              <strong>Accredited Investor Requirements:</strong> Investors must meet at least one of the following criteria:
              (1) Individual net worth exceeding $1,000,000 (excluding primary residence), or
              (2) Individual income exceeding $200,000 in each of the prior two years (or $300,000 joint income with spouse), or
              (3) Entities with assets exceeding $5,000,000.
            </p>
          </div>

          {/* Blue Sky Laws */}
          <div className="bg-neon-100/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Blue Sky Laws - State Securities Compliance
            </h3>
            <p className="text-sm text-white/80 leading-relaxed mb-3">
              This offering may be subject to state securities laws ("Blue Sky Laws") in the investor's state of residence.
              The Company will file a Form D with the SEC and applicable state securities regulators within 15 days of the first sale of securities.
            </p>
            <p className="text-sm text-white/80 leading-relaxed">
              <strong>State-Specific Requirements:</strong> Certain states may impose additional requirements, including merit reviews,
              filing fees, or notice filings. Investors should consult with legal counsel to understand state-specific regulations.
            </p>
          </div>

          {/* California Merit Test Notice */}
          <div className="bg-neon-100/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              California Merit Test & Corporate Securities Law
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              For California residents: This offering is subject to qualification under California Corporate Securities Law of 1968 (California Corporations Code §25000-25707).
              California applies a "merit review" standard, meaning the offering must be "fair, just, and equitable" to investors.
              The California Department of Financial Protection and Innovation may review this offering for compliance.
            </p>
          </div>

          {/* Forward-Looking Statements */}
          <div className="bg-neon-100/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
              <Eye className="w-6 h-6" />
              Forward-Looking Statements Disclaimer
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              This investor deck contains forward-looking statements regarding future financial projections, market opportunities, user growth,
              and business milestones. These statements are based on current expectations and assumptions and are subject to significant risks and uncertainties.
              Actual results may differ materially from projections due to market conditions, competitive landscape, regulatory changes,
              technology risks, and other factors beyond the Company's control. <strong>Past performance is not indicative of future results.</strong>
            </p>
          </div>

          {/* Risk Factors */}
          <div className="bg-neon-100/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              Risk Factors Disclosure
            </h3>
            <p className="text-sm text-white/80 leading-relaxed mb-3">
              Investment in the Company involves significant risks, including but not limited to:
            </p>
            <ul className="text-sm text-white/80 space-y-2 list-disc list-inside">
              <li><strong>Early-Stage Risk:</strong> The Company is in early stages with limited operating history and unproven business model.</li>
              <li><strong>Market Risk:</strong> Agricultural technology market is highly competitive with rapid technological changes.</li>
              <li><strong>Regulatory Risk:</strong> Compliance with FDA, USDA, EPA, and state regulations may require significant capital and operational changes.</li>
              <li><strong>Technology Risk:</strong> Dependence on third-party APIs (USDA, NASA, EPA) and data infrastructure.</li>
              <li><strong>Financial Risk:</strong> No guarantee of profitability or return on investment. Investors may lose entire investment.</li>
              <li><strong>Illiquidity Risk:</strong> Securities are restricted and may not be freely tradeable. No public market exists.</li>
              <li><strong>Dilution Risk:</strong> Future funding rounds may dilute investor ownership percentage.</li>
            </ul>
          </div>

          {/* Anti-Fraud Compliance */}
          <div className="bg-neon-100/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
              <Shield className="w-6 h-6" />
              Anti-Fraud Compliance Statement
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              This offering is subject to the anti-fraud provisions of federal and state securities laws, including Section 10(b) of the Securities Exchange Act of 1934
              and Rule 10b-5 thereunder. The Company has made reasonable efforts to ensure the accuracy of all information contained in this investor deck.
              However, investors are encouraged to conduct their own independent due diligence and consult with financial, legal, and tax advisors before investing.
            </p>
          </div>

          {/* Form D Filing Status */}
          <div className="bg-neon-100/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Form D Filing Status
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              The Company will file a Form D (Notice of Exempt Offering of Securities) with the U.S. Securities and Exchange Commission (SEC)
              no later than 15 days after the first sale of securities. Form D filings are publicly accessible via the SEC's EDGAR database.
              Investors may verify the Company's Form D filing status at <a href="https://www.sec.gov/edgar" className="underline text-purple-300">www.sec.gov/edgar</a>.
            </p>
          </div>

          {/* General Disclaimer */}
          <div className="bg-neon-100/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="font-bold text-xl mb-3">General Disclaimer</h3>
            <p className="text-sm text-white/80 leading-relaxed">
              <strong>NOT AN OFFER TO SELL:</strong> This investor deck does not constitute an offer to sell or a solicitation of an offer to buy securities.
              Any such offer or solicitation will be made only through definitive offering documents, including a Private Placement Memorandum (PPM)
              and subscription agreements. This deck is for informational purposes only and is not intended as investment, legal, or tax advice.
            </p>
            <p className="text-sm text-white/80 leading-relaxed mt-3">
              <strong>CONFIDENTIALITY:</strong> This investor deck contains proprietary and confidential information.
              Recipients agree not to disclose, reproduce, or distribute this information without prior written consent from the Company.
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 border border-white/20">
            <h3 className="font-bold text-2xl mb-4">Questions? Contact Us</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-white/80 mb-1">Email</div>
                <div className="font-bold text-lg">investors@agritech-platform.com</div>
              </div>
              <div>
                <div className="text-sm text-white/80 mb-1">Platform</div>
                <div className="font-bold text-lg">tarim.ailydian.com</div>
              </div>
              <div>
                <div className="text-sm text-white/80 mb-1">Legal Counsel</div>
                <div className="font-bold text-lg">legal@agritech-platform.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CLOSING CTA */}
      <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-violet-700 rounded-2xl p-10 shadow-2xl text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-100/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <Rocket className="w-20 h-20 mx-auto mb-6" />
          <h2 className="text-5xl font-bold mb-4">Ready to Transform Agriculture?</h2>
          <p className="text-2xl mb-4 text-white/90">Join us in building the future of sustainable, data-driven farming</p>
          <p className="text-xl mb-8 text-white/80">
            $103.5B market • 25.4% CAGR • FDA-compliant • ESG AAA-rated • Carbon-negative
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            <div className="bg-neon-100/20 backdrop-blur-sm rounded-xl px-8 py-4 border border-white/30 hover:bg-neon-100/30 transition-all">
              <div className="text-sm text-white/80 mb-1">For Investment Inquiries</div>
              <div className="font-bold text-xl">investors@agritech-platform.com</div>
            </div>
            <div className="bg-neon-100/20 backdrop-blur-sm rounded-xl px-8 py-4 border border-white/30 hover:bg-neon-100/30 transition-all">
              <div className="text-sm text-white/80 mb-1">Visit Our Platform</div>
              <div className="font-bold text-xl">tarim.ailydian.com</div>
            </div>
          </div>

          <div className="text-sm text-white/60">
            AgriTech Platform Pro © 2025 | All Rights Reserved | Securities offered pursuant to Regulation D
          </div>
        </div>
      </div>
    </div>
  );
}
