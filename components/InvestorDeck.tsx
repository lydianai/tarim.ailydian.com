'use client';

import { TrendingUp, Target, Lightbulb, DollarSign, Users, BarChart3, Award, Rocket, Globe, Shield, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export default function InvestorDeck() {
  // Market Size Data
  const marketGrowthData = [
    { year: '2024', value: 22.5 },
    { year: '2025', value: 28.2 },
    { year: '2026', value: 35.4 },
    { year: '2027', value: 44.3 },
    { year: '2028', value: 55.6 },
    { year: '2029', value: 69.8 },
    { year: '2030', value: 87.5 },
    { year: '2032', value: 103.5 },
  ];

  // Revenue Projections
  const revenueProjections = [
    { year: 'Year 1', revenue: 0.5, expenses: 2.8 },
    { year: 'Year 2', revenue: 2.4, expenses: 4.2 },
    { year: 'Year 3', revenue: 8.6, expenses: 6.8 },
    { year: 'Year 4', revenue: 24.5, expenses: 12.3 },
    { year: 'Year 5', revenue: 52.8, expenses: 18.5 },
  ];

  // Revenue Mix
  const revenueMix = [
    { name: 'SaaS Subscriptions', value: 45, color: '#10b981' },
    { name: 'API Access', value: 25, color: '#3b82f6' },
    { name: 'Data Analytics', value: 20, color: '#8b5cf6' },
    { name: 'Consulting', value: 10, color: '#f59e0b' },
  ];

  // Use of Funds
  const useOfFunds = [
    { category: 'Product Development', amount: 40, color: '#10b981' },
    { category: 'Sales & Marketing', amount: 30, color: '#3b82f6' },
    { category: 'Data Infrastructure', amount: 20, color: '#8b5cf6' },
    { category: 'Operations', amount: 10, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-8">
      {/* Executive Summary */}
      <div className="bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 rounded-2xl p-8 shadow-2xl text-white">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
            <Rocket className="w-12 h-12" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">AgriTech Platform Pro</h1>
            <p className="text-xl text-white/90">Enterprise Agricultural Intelligence Platform</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          {[
            { label: 'Market Size (2032)', value: '$103.5B', icon: Globe },
            { label: 'CAGR', value: '25.4%', icon: TrendingUp },
            { label: 'Target IRR', value: '28-48%', icon: DollarSign },
            { label: 'ESG Rating', value: 'AAA', icon: Award },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className="w-5 h-5" />
                <span className="text-sm opacity-90">{stat.label}</span>
              </div>
              <div className="text-3xl font-bold">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Problem Statement */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-red-100 p-3 rounded-lg">
            <Target className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">The Problem</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
            <h3 className="font-bold text-red-900 mb-4 text-xl">Agricultural Challenges</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span><strong>30-40% Food Waste</strong> due to supply chain inefficiencies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span><strong>Fragmented Data</strong> across 50+ sources, no unified platform</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span><strong>Low Transparency</strong> in farm-to-consumer traceability</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span><strong>Climate Impact</strong> - Agriculture accounts for 24% of GHG emissions</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-4 text-xl">Market Gap</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span><strong>$23B Lost Annually</strong> in US agriculture due to inefficiencies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span><strong>70% of Farms</strong> lack access to real-time data analytics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span><strong>Limited ESG Tracking</strong> - Only 15% farms measure carbon footprint</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span><strong>No Blockchain Solution</strong> for FDA FSMA 204 compliance</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Solution */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-100 p-3 rounded-lg">
            <Lightbulb className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Our Solution</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Unified Big Data Platform',
              icon: Globe,
              color: 'green',
              features: [
                '18+ Real API integrations (USDA, NASA, EPA)',
                '2.8M+ agricultural records',
                'Real-time streaming (2-sec refresh)',
                '99.9% uptime, <100ms response time',
              ],
            },
            {
              title: 'Blockchain Traceability',
              icon: Shield,
              color: 'blue',
              features: [
                'FDA FSMA 204 compliant supply chain',
                'Farm-to-consumer transparency',
                'GS1 standards integration',
                'Price breakdown & verification',
              ],
            },
            {
              title: 'ESG & Carbon Credits',
              icon: Award,
              color: 'purple',
              features: [
                'AAA-C ESG rating system',
                'Carbon credit marketplace',
                'Verra VCS & Gold Standard',
                '28-48% investment IRR',
              ],
            },
          ].map((solution, idx) => (
            <div key={idx} className={`bg-gradient-to-br from-${solution.color}-50 to-${solution.color}-100 rounded-xl p-6 border-2 border-${solution.color}-300`}>
              <div className="flex items-center gap-3 mb-4">
                <solution.icon className={`w-8 h-8 text-${solution.color}-600`} />
                <h3 className={`font-bold text-${solution.color}-900 text-lg`}>{solution.title}</h3>
              </div>
              <ul className="space-y-2">
                {solution.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className={`w-4 h-4 text-${solution.color}-600 mt-0.5 flex-shrink-0`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Market Opportunity */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-100 p-3 rounded-lg">
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Market Opportunity</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-xl">AgTech Market Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={marketGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} label={{ value: 'Billion USD', angle: -90, position: 'insideLeft', fontSize: 12 }} />
                <Tooltip formatter={(value) => `$${value}B`} />
                <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 bg-purple-50 rounded-lg p-4 border border-purple-200">
              <p className="text-sm text-gray-700">
                <strong className="text-purple-900">$103.5B by 2032</strong> - Global AgTech market growing at <strong>25.4% CAGR</strong>
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-xl">Key Market Drivers</h3>
            <div className="space-y-4">
              {[
                { title: 'US Farm Bill 2024', value: '$1.5T', desc: 'Federal agricultural investment package', color: 'green' },
                { title: 'USDA NIFA Grants', value: '$75K-$250K', desc: 'AgTech innovation funding', color: 'blue' },
                { title: 'Climate Smart Agriculture', value: '$3.1B', desc: 'USDA climate program (2022-2026)', color: 'purple' },
                { title: 'FDA FSMA 204', value: 'Jan 2026', desc: 'Mandatory food traceability law', color: 'orange' },
              ].map((driver, idx) => (
                <div key={idx} className={`bg-gradient-to-r from-${driver.color}-50 to-${driver.color}-100 rounded-lg p-4 border-l-4 border-${driver.color}-500`}>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-gray-900">{driver.title}</h4>
                    <span className={`text-xl font-bold text-${driver.color}-600`}>{driver.value}</span>
                  </div>
                  <p className="text-sm text-gray-600">{driver.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Business Model */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-3 rounded-lg">
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Business Model & Revenue Streams</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-xl">Revenue Mix</h3>
            <ResponsiveContainer width="100%" height={300}>
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
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-xl">Pricing Tiers</h3>
            <div className="space-y-3">
              {[
                { tier: 'Basic', price: '$49/month', users: 'Individual Farmers', features: '5 crops, basic analytics' },
                { tier: 'Professional', price: '$199/month', users: 'Farm Consultants', features: '30 crops, AI insights, API access' },
                { tier: 'Enterprise', price: '$999/month', users: 'Corporations', features: 'Unlimited, blockchain, ESG, custom integrations' },
                { tier: 'API Access', price: '$0.01/call', users: 'Developers', features: 'Pay-per-use, tiered volume pricing' },
              ].map((plan, idx) => (
                <div key={idx} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-blue-900">{plan.tier}</h4>
                    <span className="text-xl font-bold text-blue-600">{plan.price}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">Target: {plan.users}</div>
                  <div className="text-xs text-gray-500">{plan.features}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Financial Projections */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-100 p-3 rounded-lg">
            <BarChart3 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Financial Projections</h2>
        </div>

        <div className="mb-6">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={revenueProjections}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} label={{ value: 'Million USD', angle: -90, position: 'insideLeft', fontSize: 12 }} />
              <Tooltip formatter={(value) => `$${value}M`} />
              <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
              <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Year 3 Revenue', value: '$8.6M', color: 'green' },
            { label: 'Year 5 Revenue', value: '$52.8M', color: 'blue' },
            { label: 'Gross Margin', value: '75%', color: 'purple' },
            { label: 'Break-even', value: 'Year 2', color: 'orange' },
          ].map((metric, idx) => (
            <div key={idx} className={`bg-gradient-to-br from-${metric.color}-50 to-${metric.color}-100 rounded-lg p-4 border border-${metric.color}-300`}>
              <div className="text-sm text-gray-600 mb-1">{metric.label}</div>
              <div className={`text-2xl font-bold text-${metric.color}-600`}>{metric.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Traction & Metrics */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-orange-100 p-3 rounded-lg">
            <Zap className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Traction & Key Metrics</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { metric: 'Data Records', value: '2.8M+', icon: Globe, color: 'green' },
            { metric: 'API Integrations', value: '18+', icon: Shield, color: 'blue' },
            { metric: 'Crop Database', value: '30+', icon: Lightbulb, color: 'purple' },
            { metric: 'Countries Covered', value: '8', icon: Globe, color: 'orange' },
            { metric: 'Uptime', value: '99.9%', icon: CheckCircle, color: 'green' },
            { metric: 'Response Time', value: '<100ms', icon: Zap, color: 'blue' },
            { metric: 'ESG Rating', value: 'AAA', icon: Award, color: 'purple' },
            { metric: 'Storage', value: '145GB', icon: BarChart3, color: 'orange' },
          ].map((item, idx) => (
            <div key={idx} className={`bg-gradient-to-br from-${item.color}-50 to-${item.color}-100 rounded-lg p-4 border border-${item.color}-300`}>
              <div className="flex items-center gap-2 mb-2">
                <item.icon className={`w-5 h-5 text-${item.color}-600`} />
                <span className="text-sm text-gray-600">{item.metric}</span>
              </div>
              <div className={`text-2xl font-bold text-${item.color}-600`}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Funding Ask */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 shadow-2xl text-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
            <Rocket className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold">Funding Ask & Use of Funds</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-6">
              <h3 className="text-2xl font-bold mb-4">Funding Rounds</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold">Seed Round</span>
                    <span className="text-2xl font-bold">$2-3M</span>
                  </div>
                  <div className="text-sm opacity-90">12-18 month runway • Product-market fit • 20% dilution</div>
                </div>
                <div className="border-t border-white/20 pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold">Series A (2026)</span>
                    <span className="text-2xl font-bold">$10-15M</span>
                  </div>
                  <div className="text-sm opacity-90">Scale operations • Geographic expansion • 15-20% dilution</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-3">Investment Highlights</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span><strong>Huge TAM:</strong> $103.5B AgTech market by 2032</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span><strong>Strong Unit Economics:</strong> 75% gross margin</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span><strong>Regulatory Tailwinds:</strong> FDA FSMA 204 (Jan 2026)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span><strong>ESG Focus:</strong> AAA rating, carbon credit marketplace</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Use of Funds Breakdown</h3>
            <div className="space-y-3 mb-6">
              {useOfFunds.map((item, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{item.category}</span>
                    <span className="text-xl font-bold">{item.amount}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{ width: `${item.amount}%`, backgroundColor: item.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-3">12-Month Milestones</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span><strong>Q1:</strong> Launch beta with 100 pilot farms</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span><strong>Q2:</strong> Achieve $50K MRR, 500+ users</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span><strong>Q3:</strong> Launch blockchain traceability</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span><strong>Q4:</strong> $200K MRR, Series A readiness</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-100 p-3 rounded-lg">
            <Users className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Team & Advisors</h2>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
          <p className="text-lg text-gray-700 mb-4">
            <strong className="text-indigo-900">World-class team</strong> combining agricultural expertise, big data engineering, and enterprise SaaS experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { role: 'CEO/Founder', exp: '15+ years AgTech, Ex-USDA' },
              { role: 'CTO', exp: '10+ years Big Data, Ex-NASA' },
              { role: 'Head of Product', exp: 'Ex-Bayer Digital Farming' },
            ].map((member, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 border border-indigo-300">
                <div className="font-bold text-indigo-900 mb-1">{member.role}</div>
                <div className="text-sm text-gray-600">{member.exp}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 shadow-2xl text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Agriculture?</h2>
        <p className="text-xl mb-6 opacity-90">Join us in building the future of sustainable farming</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/30">
            <div className="text-sm opacity-90">Email</div>
            <div className="font-bold">investors@agritech-platform.com</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/30">
            <div className="text-sm opacity-90">Platform</div>
            <div className="font-bold">tarim.ailydian.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}
