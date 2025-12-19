'use client';

import { useState } from 'react';
import { Leaf, Users, Shield, TrendingUp, Award, DollarSign, Droplet, Wind, Heart, FileCheck, BarChart3, Target } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, Legend } from 'recharts';
import { SAMPLE_ESG_DATA, INVESTMENT_ROI_DATA } from '@/lib/esg-metrics';

export default function ESGDashboard() {
  const [selectedFarm, setSelectedFarm] = useState(SAMPLE_ESG_DATA[0]);

  const esgRadarData = [
    { category: 'Environmental', score: selectedFarm.esgScore.environmental, fullMark: 100 },
    { category: 'Social', score: selectedFarm.esgScore.social, fullMark: 100 },
    { category: 'Governance', score: selectedFarm.esgScore.governance, fullMark: 100 },
    { category: 'Carbon Credits', score: (selectedFarm.carbonCredits.reduce((sum, c) => sum + c.creditsGenerated, 0) / 10), fullMark: 100 },
    { category: 'Transparency', score: selectedFarm.governance.auditScore, fullMark: 100 },
    { category: 'Community Impact', score: selectedFarm.social.farmWorkerWellbeing.satisfactionScore, fullMark: 100 }
  ];

  const carbonComparisonData = [
    { name: 'Scope 1\n(Direct)', value: selectedFarm.environmental.carbonFootprint.scope1, fill: '#ef4444' },
    { name: 'Scope 2\n(Electricity)', value: selectedFarm.environmental.carbonFootprint.scope2, fill: '#f59e0b' },
    { name: 'Scope 3\n(Supply Chain)', value: selectedFarm.environmental.carbonFootprint.scope3, fill: '#8b5cf6' }
  ];

  const getRatingColor = (rating: string) => {
    if (rating === 'AAA' || rating === 'AA') return 'from-green-500 to-emerald-600';
    if (rating === 'A' || rating === 'BBB') return 'from-blue-500 to-cyan-600';
    if (rating === 'BB' || rating === 'B') return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-rose-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`bg-gradient-to-r ${getRatingColor(selectedFarm.esgScore.rating)} rounded-xl p-6 shadow-2xl`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="bg-neon-100/20 backdrop-blur-sm p-4 rounded-xl">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">ESG Performance Dashboard</h2>
              <p className="text-white/90">Environmental, Social & Governance Metrics</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold text-white mb-1">{selectedFarm.esgScore.rating}</div>
            <div className="text-white/80 text-sm">ESG Rating</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          {[
            { label: 'Overall Score', value: selectedFarm.esgScore.overall, icon: Target },
            { label: 'Environmental', value: selectedFarm.esgScore.environmental, icon: Leaf },
            { label: 'Social', value: selectedFarm.esgScore.social, icon: Users },
            { label: 'Governance', value: selectedFarm.esgScore.governance, icon: Shield }
          ].map((metric, idx) => (
            <div key={idx} className="bg-neon-100/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <metric.icon className="w-5 h-5 text-white" />
                <span className="text-xs text-white/80">{metric.label}</span>
              </div>
              <div className="text-3xl font-bold text-white">{metric.value}</div>
              <div className="mt-2 bg-neon-100/20 rounded-full h-2">
                <div className="bg-neon-100 h-2 rounded-full" style={{ width: `${metric.value}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Farm Selector */}
      <div className="bg-neon-100 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Select Farm</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SAMPLE_ESG_DATA.map((farm) => (
            <button
              key={farm.farmId}
              onClick={() => setSelectedFarm(farm)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedFarm.farmId === farm.farmId
                  ? 'border-green-500 bg-green-50 shadow-md'
                  : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-bold text-gray-900">{farm.farmName}</div>
                <div className={`px-3 py-1 rounded-full text-white text-xs font-bold bg-gradient-to-r ${getRatingColor(farm.esgScore.rating)}`}>
                  {farm.esgScore.rating}
                </div>
              </div>
              <div className="text-sm text-gray-600">Farm ID: {farm.farmId}</div>
              <div className="text-xs text-gray-500 mt-1">Period: {farm.reportingPeriod}</div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                <div className="text-center">
                  <div className="text-gray-600">E</div>
                  <div className="font-bold text-green-600">{farm.esgScore.environmental}</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-600">S</div>
                  <div className="font-bold text-blue-600">{farm.esgScore.social}</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-600">G</div>
                  <div className="font-bold text-purple-600">{farm.esgScore.governance}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ESG Radar Chart & Carbon Footprint */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-neon-100 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            ESG Performance Radar
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={esgRadarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="category" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar name="Score" dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Benchmark Percentile</div>
                <div className="text-2xl font-bold text-green-600">{selectedFarm.benchmarkComparison.percentile}th</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-600">Industry Avg: {selectedFarm.benchmarkComparison.industryAverage}</div>
                <div className="text-xs text-gray-600">Top Performer: {selectedFarm.benchmarkComparison.topPerformer}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-neon-100 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Wind className="w-5 h-5 text-blue-600" />
            Carbon Footprint Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={carbonComparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} label={{ value: 'tons CO2e', angle: -90, position: 'insideLeft', fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-red-50 rounded-lg p-3 border border-red-200">
              <div className="text-xs text-red-700 mb-1">Total Emissions</div>
              <div className="text-xl font-bold text-red-600">{selectedFarm.environmental.carbonFootprint.total} t CO2e</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
              <div className="text-xs text-green-700 mb-1">Reduction vs Baseline</div>
              <div className="text-xl font-bold text-green-600">↓ {selectedFarm.environmental.carbonFootprint.reduction}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Metrics */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 shadow-lg border border-green-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Leaf className="w-6 h-6 text-green-600" />
          Environmental Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-neon-100 rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Droplet className="w-5 h-5 text-blue-600" />
              <div className="text-sm text-gray-600">Water Efficiency</div>
            </div>
            <div className="text-2xl font-bold text-blue-600">{selectedFarm.environmental.waterUsage.efficiency}%</div>
            <div className="text-xs text-gray-600 mt-1">
              Saved: {(selectedFarm.environmental.waterUsage.savedVsBaseline / 1000).toFixed(0)}K gal
            </div>
          </div>
          <div className="bg-neon-100 rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="w-5 h-5 text-green-600" />
              <div className="text-sm text-gray-600">Soil Health Index</div>
            </div>
            <div className="text-2xl font-bold text-green-600">{selectedFarm.environmental.soilHealth.biodiversityIndex}</div>
            <div className="text-xs text-gray-600 mt-1">
              +{selectedFarm.environmental.soilHealth.organicMatterIncrease}% organic matter
            </div>
          </div>
          <div className="bg-neon-100 rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Wind className="w-5 h-5 text-purple-600" />
              <div className="text-sm text-gray-600">Carbon Sequestered</div>
            </div>
            <div className="text-2xl font-bold text-purple-600">{selectedFarm.environmental.soilHealth.carbonSequestered} t/yr</div>
            <div className="text-xs text-gray-600 mt-1">
              {selectedFarm.environmental.soilHealth.erosionReduction}% erosion reduction
            </div>
          </div>
          <div className="bg-neon-100 rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-pink-600" />
              <div className="text-sm text-gray-600">Biodiversity</div>
            </div>
            <div className="text-2xl font-bold text-pink-600">{selectedFarm.environmental.biodiversity.nativePollinator}</div>
            <div className="text-xs text-gray-600 mt-1">
              {selectedFarm.environmental.biodiversity.birdSpecies} bird species
            </div>
          </div>
        </div>
      </div>

      {/* Social Metrics */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 shadow-lg border border-blue-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-600" />
          Social Impact & Labor Practices
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neon-100 rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-3">Employment</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Employees</span>
                <span className="font-bold text-gray-900">{selectedFarm.social.employment.totalEmployees}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Women Employment</span>
                <span className="font-bold text-purple-600">{selectedFarm.social.employment.womenEmployment}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Minority Employment</span>
                <span className="font-bold text-blue-600">{selectedFarm.social.employment.minorityEmployment}%</span>
              </div>
            </div>
          </div>
          <div className="bg-neon-100 rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-3">Worker Wellbeing</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-3 h-3 rounded-full ${selectedFarm.social.farmWorkerWellbeing.healthInsuranceProvided ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className="text-gray-700">Health Insurance</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-3 h-3 rounded-full ${selectedFarm.social.farmWorkerWellbeing.childcareAvailable ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className="text-gray-700">Childcare Available</span>
              </div>
              <div className="mt-3">
                <div className="text-xs text-gray-600 mb-1">Satisfaction Score</div>
                <div className="text-2xl font-bold text-green-600">{selectedFarm.social.farmWorkerWellbeing.satisfactionScore}/100</div>
              </div>
            </div>
          </div>
          <div className="bg-neon-100 rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-3">Community Impact</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Investment</span>
                <span className="font-bold text-green-600">${(selectedFarm.social.communityImpact.communityInvestment / 1000).toFixed(0)}K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Food Donations</span>
                <span className="font-bold text-orange-600">{(selectedFarm.social.communityImpact.foodDonations / 1000).toFixed(1)}K lbs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Education Programs</span>
                <span className="font-bold text-blue-600">{selectedFarm.social.communityImpact.educationPrograms}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carbon Credits */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 shadow-lg border border-purple-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Award className="w-6 h-6 text-purple-600" />
          Carbon Credit Portfolio
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {selectedFarm.carbonCredits.map((credit) => (
            <div key={credit.creditId} className="bg-neon-100 rounded-lg p-4 shadow-sm border-l-4 border-purple-500">
              <div className="flex items-center justify-between mb-2">
                <div className="font-bold text-gray-900">{credit.methodology}</div>
                <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  credit.status === 'Active' ? 'bg-green-100 text-green-700' :
                  credit.status === 'Retired' ? 'bg-gray-100 text-gray-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {credit.status}
                </div>
              </div>
              <div className="text-sm text-gray-600 mb-3">{credit.projectType}</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Credits Generated</div>
                  <div className="font-bold text-purple-600">{credit.creditsGenerated} t CO2e</div>
                </div>
                <div>
                  <div className="text-gray-600">Total Value</div>
                  <div className="font-bold text-green-600">${credit.totalValue.toLocaleString()}</div>
                </div>
              </div>
              {credit.buyer && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="text-xs text-gray-600">Buyer: <span className="font-semibold text-gray-800">{credit.buyer}</span></div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="bg-neon-100 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Total Carbon Credits</div>
              <div className="text-3xl font-bold text-purple-600">
                {selectedFarm.carbonCredits.reduce((sum, c) => sum + c.creditsGenerated, 0)} t CO2e
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Total Revenue</div>
              <div className="text-3xl font-bold text-green-600">
                ${selectedFarm.carbonCredits.reduce((sum, c) => sum + c.totalValue, 0).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Investment ROI Analytics */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-100 rounded-xl p-6 shadow-lg border border-orange-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-orange-600" />
          Investment ROI Analysis
        </h3>
        <div className="bg-neon-100 rounded-lg p-4 shadow-sm mb-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={INVESTMENT_ROI_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="category" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" height={80} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="roi" name="ROI %" fill="#10b981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="irr" name="IRR %" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {INVESTMENT_ROI_DATA.map((investment, idx) => (
            <div key={idx} className="bg-neon-100 rounded-lg p-3 shadow-sm">
              <div className="text-xs text-gray-600 mb-1 truncate" title={investment.category}>
                {investment.category.split('(')[0].trim()}
              </div>
              <div className="text-lg font-bold text-green-600">{investment.roi}%</div>
              <div className="text-xs text-gray-500 mt-1">
                Payback: {investment.paybackPeriod}y
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Investment Attractiveness */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-neon-100 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Investment Attractiveness
          </h3>
          <div className="text-center mb-6">
            <div className="text-6xl font-bold text-green-600">{selectedFarm.investmentAttractiveness.score}</div>
            <div className="text-sm text-gray-600 mt-2">Investment Score (out of 100)</div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">Opportunities</h4>
              <ul className="space-y-1 text-sm text-green-800">
                {selectedFarm.investmentAttractiveness.opportunities.map((opp, idx) => (
                  <li key={idx}>• {opp}</li>
                ))}
              </ul>
            </div>
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <h4 className="font-semibold text-amber-900 mb-2">Risks</h4>
              <ul className="space-y-1 text-sm text-amber-800">
                {selectedFarm.investmentAttractiveness.risks.map((risk, idx) => (
                  <li key={idx}>• {risk}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-neon-100 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-blue-600" />
            Governance & Compliance
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <span className="text-sm text-gray-700">Audit Score</span>
              <span className="text-xl font-bold text-blue-600">{selectedFarm.governance.auditScore}/100</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <span className="text-sm text-gray-700">Transparency Level</span>
              <span className="text-sm font-bold text-purple-600">{selectedFarm.governance.transparencyLevel}</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <span className="text-sm text-gray-700">Audit Frequency</span>
              <span className="text-sm font-bold text-gray-800">{selectedFarm.governance.auditFrequency}</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Certifications</h4>
              <div className="flex flex-wrap gap-2">
                {selectedFarm.governance.certifications.map((cert, idx) => (
                  <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mt-4">
              <h4 className="font-semibold text-blue-900 mb-2">Traceability</h4>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center">
                  <div className={`w-4 h-4 mx-auto mb-1 rounded-full ${selectedFarm.governance.traceability.blockchainEnabled ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <div className="text-gray-700">Blockchain</div>
                </div>
                <div className="text-center">
                  <div className={`w-4 h-4 mx-auto mb-1 rounded-full ${selectedFarm.governance.traceability.qrCodeTracking ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <div className="text-gray-700">QR Code</div>
                </div>
                <div className="text-center">
                  <div className={`w-4 h-4 mx-auto mb-1 rounded-full ${selectedFarm.governance.traceability.thirdPartyVerified ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <div className="text-gray-700">3rd Party</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
