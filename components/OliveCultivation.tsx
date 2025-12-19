'use client';

import { useState, useMemo } from 'react';
import {
  TURKISH_OLIVE_VARIETIES,
  OLIVE_DISEASES,
  OLIVE_PESTS,
  getClimateRecommendations,
  type OliveVariety,
  type OliveDisease,
  type OlivePest
} from '@/lib/olive-database';
import {
  Leaf,
  TrendingUp,
  Bug,
  AlertTriangle,
  Calendar,
  DollarSign,
  BarChart3,
  Sprout,
  Droplets,
  Thermometer,
  CloudRain,
  Search,
  Camera,
  Clock,
  Target,
  Shield,
  Zap,
  Award,
  MapPin,
  CheckCircle2,
  XCircle,
  Info,
  Upload,
  Calculator,
  Activity,
  TrendingDown,
  Package
} from 'lucide-react';

interface OliveCultivationProps {
  language?: 'tr' | 'en';
}

export default function OliveCultivation({ language = 'en' }: OliveCultivationProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'varieties' | 'disease' | 'pest' | 'harvest' | 'market' | 'analytics'>('overview');
  const [selectedVariety, setSelectedVariety] = useState<OliveVariety | null>(null);
  const [selectedDisease, setSelectedDisease] = useState<OliveDisease | null>(null);
  const [selectedPest, setSelectedPest] = useState<OlivePest | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [climateData, setClimateData] = useState({ temp: 22, rainfall: 45, humidity: 65 });
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [harvestData, setHarvestData] = useState({ trees: 100, variety: 'ayvalik', date: new Date() });
  const [comparisonVarieties, setComparisonVarieties] = useState<string[]>([]);

  const t = (tr: string, en: string) => language === 'tr' ? tr : en;

  const tabs = [
    { id: 'overview', label: t('Genel Bakış', 'Overview'), icon: BarChart3 },
    { id: 'varieties', label: t('Çeşitler', 'Varieties'), icon: Sprout },
    { id: 'disease', label: t('Hastalık Tespiti', 'Disease Detection'), icon: AlertTriangle },
    { id: 'pest', label: t('Zararlı Yönetimi', 'Pest Management'), icon: Bug },
    { id: 'harvest', label: t('Hasat Planlama', 'Harvest Planning'), icon: Calendar },
    { id: 'market', label: t('Pazar Analizi', 'Market Analysis'), icon: DollarSign },
    { id: 'analytics', label: t('Analitik', 'Analytics'), icon: TrendingUp }
  ] as const;

  const climateRecommendations = useMemo(
    () => getClimateRecommendations(climateData.temp, climateData.rainfall, climateData.humidity),
    [climateData]
  );

  // Disease symptom checker
  const diseasesBySymptoms = useMemo(() => {
    if (selectedSymptoms.length === 0) return [];
    return OLIVE_DISEASES.filter(disease =>
      disease.symptoms.some(symptom =>
        selectedSymptoms.some(selected =>
          symptom.toLowerCase().includes(selected.toLowerCase())
        )
      )
    ).sort((a, b) => b.economicImpact - a.economicImpact);
  }, [selectedSymptoms]);

  // All unique symptoms from diseases
  const allSymptoms = useMemo(() => {
    const symptoms = new Set<string>();
    OLIVE_DISEASES.forEach(disease => {
      disease.symptoms.forEach(symptom => symptoms.add(symptom));
    });
    return Array.from(symptoms);
  }, []);

  // Calculate harvest maturity index
  const calculateMaturityIndex = (variety: string, daysToHarvest: number) => {
    const base = daysToHarvest < 30 ? 0.6 : daysToHarvest < 15 ? 0.8 : 1.0;
    const varietyFactor = variety === 'memecik' ? 1.1 : variety === 'ayvalik' ? 1.05 : 1.0;
    return Math.min(base * varietyFactor, 1.0);
  };

  // Oil quality predictor
  const predictOilQuality = (variety: OliveVariety, temp: number, rainfall: number) => {
    let quality = variety.oilContent;
    if (temp >= variety.optimalTemp.min && temp <= variety.optimalTemp.max) quality += 2;
    if (rainfall >= 400 && rainfall <= 800) quality += 1.5;
    if (variety.waterRequirement === 'low' && rainfall < 500) quality += 1;
    return Math.min(quality, 30);
  };

  // ROI Calculator
  const calculateROI = (trees: number, variety: string, years: number = 5) => {
    const varietyData = TURKISH_OLIVE_VARIETIES.find(v => v.id === variety);
    if (!varietyData) return { revenue: 0, costs: 0, roi: 0, profit: 0 };

    const yieldPerTree = varietyData.yieldPerTree;
    const totalYield = trees * yieldPerTree * years;
    const oilYield = totalYield * (varietyData.oilContent / 100);
    const pricePerKg = varietyData.bestFor === 'oil' ? 150 : varietyData.bestFor === 'table' ? 80 : 120; // TRY
    const revenue = oilYield * pricePerKg;

    const costPerTree = 500; // Initial investment
    const annualCostPerTree = 150; // Maintenance
    const costs = (trees * costPerTree) + (trees * annualCostPerTree * years);

    const profit = revenue - costs;
    const roi = ((profit / costs) * 100);

    return { revenue, costs, roi, profit, yieldPerTree, totalYield, oilYield };
  };

  // Market price trends (simulated)
  const marketTrends = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((month, idx) => ({
      month,
      price: 140 + Math.sin(idx / 2) * 20 + Math.random() * 10,
      demand: 70 + Math.cos(idx / 3) * 15 + Math.random() * 10,
      production: 80 + Math.sin((idx + 3) / 2) * 12
    }));
  }, []);

  // Pest activity timeline
  const pestTimeline = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map(month => ({
      month,
      oliveFly: OLIVE_PESTS[0].peakActivity.some(p => p.toLowerCase().includes(month.toLowerCase())) ? 80 : 30,
      oliveMoth: OLIVE_PESTS[1].peakActivity.some(p => p.toLowerCase().includes(month.toLowerCase())) ? 75 : 25,
      scale: OLIVE_PESTS[2].peakActivity.some(p => p.toLowerCase().includes(month.toLowerCase())) ? 70 : 20
    }));
  }, []);

  // Season-based disease prevalence
  const diseaseHeatMap = useMemo(() => {
    const seasons = ['spring', 'summer', 'fall', 'winter'] as const;
    return OLIVE_DISEASES.map(disease => ({
      name: language === 'tr' ? disease.nameTr : disease.name,
      spring: disease.seasonalRisk.spring === 'high' ? 90 : disease.seasonalRisk.spring === 'medium' ? 60 : 30,
      summer: disease.seasonalRisk.summer === 'high' ? 90 : disease.seasonalRisk.summer === 'medium' ? 60 : 30,
      fall: disease.seasonalRisk.fall === 'high' ? 90 : disease.seasonalRisk.fall === 'medium' ? 60 : 30,
      winter: disease.seasonalRisk.winter === 'high' ? 90 : disease.seasonalRisk.winter === 'medium' ? 60 : 30
    }));
  }, [language]);

  const filteredVarieties = useMemo(() => {
    return TURKISH_OLIVE_VARIETIES.filter(variety =>
      variety.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      variety.region.some(r => r.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-agri-50 via-white to-forest-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-agri-600 to-forest-600 text-white py-8 px-6 shadow-lg relative overflow-hidden">
        {/* Animated Olive Grove Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="oliveGrove" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                {/* Olive tree trunk */}
                <rect x="45" y="60" width="10" height="40" fill="#8B4513" opacity="0.6"/>
                {/* Olive tree canopy (round) */}
                <circle cx="50" cy="50" r="25" fill="#22c55e" opacity="0.7"/>
                <circle cx="45" cy="45" r="8" fill="#16a34a" opacity="0.8"/>
                <circle cx="55" cy="48" r="7" fill="#16a34a" opacity="0.8"/>
                <circle cx="50" cy="55" r="6" fill="#15803d" opacity="0.8"/>
                {/* Olive fruits (small dots) */}
                <circle cx="42" cy="48" r="2" fill="#6b21a8" opacity="0.9"/>
                <circle cx="58" cy="52" r="2" fill="#6b21a8" opacity="0.9"/>
                <circle cx="50" cy="44" r="2" fill="#7c3aed" opacity="0.9"/>
                <circle cx="54" cy="57" r="2" fill="#6b21a8" opacity="0.9"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#oliveGrove)"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm animate-pulse">
              <Leaf className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                {t('Zeytin Yetiştirme Yönetim Sistemi', 'Olive Cultivation Management System')}
              </h1>
              <p className="text-white/90 text-lg font-medium drop-shadow-md">
                {t('Türkiye\'nin En Kapsamlı Zeytin Tarımı Platformu', 'Turkey\'s Most Comprehensive Olive Farming Platform')}
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sprout className="w-5 h-5 text-white" />
                <span className="text-sm text-white/80 font-medium">{t('Toplam Ağaç', 'Total Trees')}</span>
              </div>
              <p className="text-2xl font-bold text-white">182M</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-5 h-5 text-white" />
                <span className="text-sm text-white/80 font-medium">{t('Yıllık Üretim', 'Annual Production')}</span>
              </div>
              <p className="text-2xl font-bold text-white">450K {t('ton', 'tons')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-white" />
                <span className="text-sm text-white/80 font-medium">{t('Ana Bölge', 'Main Region')}</span>
              </div>
              <p className="text-2xl font-bold text-white">{t('Ege', 'Aegean')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-300" />
                <span className="text-sm text-white/80 font-medium">{t('Kayıp Oranı', 'Loss Rate')}</span>
              </div>
              <p className="text-2xl font-bold text-white">~30%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gradient-to-br from-agri-50 to-forest-50 shadow-md border-b border-agri-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto gap-2 py-4">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-agri-600 to-forest-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Climate-based Risk Assessment */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <Thermometer className="w-6 h-6 text-agri-600" />
                  <h3 className="text-xl font-bold text-gray-800">
                    {t('İklim Bazlı Risk Değerlendirmesi', 'Climate-Based Risk Assessment')}
                  </h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                      {t('Sıcaklık (°C)', 'Temperature (°C)')}
                    </label>
                    <input
                      type="range"
                      min="-10"
                      max="45"
                      value={climateData.temp}
                      onChange={(e) => setClimateData({ ...climateData, temp: Number(e.target.value) })}
                      className="w-full"
                    />
                    <span className="text-sm text-gray-600">{climateData.temp}°C</span>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                      {t('Yağış (mm)', 'Rainfall (mm)')}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={climateData.rainfall}
                      onChange={(e) => setClimateData({ ...climateData, rainfall: Number(e.target.value) })}
                      className="w-full"
                    />
                    <span className="text-sm text-gray-600">{climateData.rainfall}mm</span>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                      {t('Nem (%)', 'Humidity (%)')}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={climateData.humidity}
                      onChange={(e) => setClimateData({ ...climateData, humidity: Number(e.target.value) })}
                      className="w-full"
                    />
                    <span className="text-sm text-gray-600">{climateData.humidity}%</span>
                  </div>
                </div>

                {climateRecommendations.recommendedActions.length > 0 && (
                  <div className="bg-harvest-50 border border-harvest-300 rounded-lg p-4 mb-4">
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <Info className="w-5 h-5 text-harvest-600" />
                      {t('Önerilen Aksiyonlar', 'Recommended Actions')}
                    </h4>
                    <ul className="space-y-1">
                      {climateRecommendations.recommendedActions.map((action, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-agri-600 mt-0.5 flex-shrink-0" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {climateRecommendations.diseaseRisk.length > 0 && (
                  <div className="bg-red-50 border border-red-300 rounded-lg p-4 mb-4">
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      {t('Hastalık Riski', 'Disease Risk')}
                    </h4>
                    <ul className="space-y-1">
                      {climateRecommendations.diseaseRisk.map((risk, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {climateRecommendations.pestRisk.length > 0 && (
                  <div className="bg-orange-50 border border-orange-300 rounded-lg p-4">
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <Bug className="w-5 h-5 text-orange-600" />
                      {t('Zararlı Riski', 'Pest Risk')}
                    </h4>
                    <ul className="space-y-1">
                      {climateRecommendations.pestRisk.map((risk, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Disease Prevalence Heat Map */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="w-6 h-6 text-agri-600" />
                  <h3 className="text-xl font-bold text-gray-800">
                    {t('Hastalık Yaygınlık Haritası', 'Disease Prevalence Heat Map')}
                  </h3>
                </div>

                <div className="space-y-3">
                  {diseaseHeatMap.map((disease, idx) => (
                    <div key={idx} className="space-y-1">
                      <p className="text-sm font-semibold text-gray-700">{disease.name}</p>
                      <div className="grid grid-cols-4 gap-2">
                        {(['spring', 'summer', 'fall', 'winter'] as const).map(season => {
                          const value = disease[season];
                          const intensity = value >= 75 ? 'bg-red-500' : value >= 50 ? 'bg-orange-400' : 'bg-green-400';
                          return (
                            <div key={season} className="text-center">
                              <div className={`${intensity} h-8 rounded flex items-center justify-center text-white text-xs font-bold`}>
                                {value}%
                              </div>
                              <p className="text-xs text-gray-600 mt-1 capitalize">{season}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-agri-500 to-forest-600 text-white rounded-xl shadow-lg p-6">
                <Award className="w-12 h-12 mb-3 opacity-80" />
                <h4 className="text-lg font-bold mb-2">{t('En Yüksek Verim', 'Highest Yield')}</h4>
                <p className="text-3xl font-bold">Memecik</p>
                <p className="text-sm opacity-90">50 kg/{t('ağaç', 'tree')}</p>
              </div>

              <div className="bg-gradient-to-br from-harvest-500 to-sunset-600 text-white rounded-xl shadow-lg p-6">
                <Target className="w-12 h-12 mb-3 opacity-80" />
                <h4 className="text-lg font-bold mb-2">{t('En Yüksek Yağ İçeriği', 'Highest Oil Content')}</h4>
                <p className="text-3xl font-bold">Gemlik</p>
                <p className="text-sm opacity-90">28% {t('yağ', 'oil')}</p>
              </div>

              <div className="bg-gradient-to-br from-earth-500 to-earth-700 text-white rounded-xl shadow-lg p-6">
                <Shield className="w-12 h-12 mb-3 opacity-80" />
                <h4 className="text-lg font-bold mb-2">{t('En Dayanıklı', 'Most Resistant')}</h4>
                <p className="text-3xl font-bold">Gemlik</p>
                <p className="text-sm opacity-90">{t('Soğuğa dayanıklı', 'Cold resistant')} -8°C</p>
              </div>
            </div>
          </div>
        )}

        {/* VARIETIES TAB */}
        {activeTab === 'varieties' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Sprout className="w-6 h-6 text-agri-600" />
                  <h3 className="text-xl font-bold text-gray-800">
                    {t('Türk Zeytin Çeşitleri', 'Turkish Olive Varieties')}
                  </h3>
                </div>
                <span className="text-sm text-gray-600">{TURKISH_OLIVE_VARIETIES.length} {t('çeşit', 'varieties')}</span>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t('Çeşit veya bölge ara...', 'Search variety or region...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500 focus:border-transparent text-gray-700"
                />
              </div>

              {/* Comparison Mode */}
              <div className="mb-6 p-4 bg-agri-50 rounded-lg border border-agri-200">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-agri-600" />
                  {t('Çeşit Karşılaştırma', 'Variety Comparison')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {TURKISH_OLIVE_VARIETIES.map(variety => (
                    <button
                      key={variety.id}
                      onClick={() => {
                        if (comparisonVarieties.includes(variety.id)) {
                          setComparisonVarieties(comparisonVarieties.filter(v => v !== variety.id));
                        } else if (comparisonVarieties.length < 3) {
                          setComparisonVarieties([...comparisonVarieties, variety.id]);
                        }
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        comparisonVarieties.includes(variety.id)
                          ? 'bg-agri-600 text-white'
                          : 'bg-white text-gray-700 border border-gray-300 hover:border-agri-500'
                      }`}
                    >
                      {variety.name}
                    </button>
                  ))}
                </div>

                {comparisonVarieties.length > 0 && (
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-agri-100">
                          <th className="p-2 text-left text-gray-700 font-bold">{t('Özellik', 'Feature')}</th>
                          {comparisonVarieties.map(vid => {
                            const v = TURKISH_OLIVE_VARIETIES.find(variety => variety.id === vid);
                            return <th key={vid} className="p-2 text-center text-gray-700 font-bold">{v?.name}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody className="text-gray-700">
                        <tr className="border-t border-agri-200">
                          <td className="p-2 font-semibold">{t('Yağ İçeriği', 'Oil Content')}</td>
                          {comparisonVarieties.map(vid => {
                            const v = TURKISH_OLIVE_VARIETIES.find(variety => variety.id === vid);
                            return <td key={vid} className="p-2 text-center">{v?.oilContent}%</td>;
                          })}
                        </tr>
                        <tr className="border-t border-agri-200">
                          <td className="p-2 font-semibold">{t('Ağaç Başına Verim', 'Yield/Tree')}</td>
                          {comparisonVarieties.map(vid => {
                            const v = TURKISH_OLIVE_VARIETIES.find(variety => variety.id === vid);
                            return <td key={vid} className="p-2 text-center">{v?.yieldPerTree} kg</td>;
                          })}
                        </tr>
                        <tr className="border-t border-agri-200">
                          <td className="p-2 font-semibold">{t('Su Gereksinimi', 'Water Req.')}</td>
                          {comparisonVarieties.map(vid => {
                            const v = TURKISH_OLIVE_VARIETIES.find(variety => variety.id === vid);
                            return <td key={vid} className="p-2 text-center capitalize">{v?.waterRequirement}</td>;
                          })}
                        </tr>
                        <tr className="border-t border-agri-200">
                          <td className="p-2 font-semibold">{t('Kullanım', 'Best For')}</td>
                          {comparisonVarieties.map(vid => {
                            const v = TURKISH_OLIVE_VARIETIES.find(variety => variety.id === vid);
                            return <td key={vid} className="p-2 text-center capitalize">{v?.bestFor}</td>;
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Varieties List */}
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {filteredVarieties.map(variety => (
                    <div
                      key={variety.id}
                      onClick={() => setSelectedVariety(variety)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedVariety?.id === variety.id
                          ? 'border-agri-600 bg-agri-50 shadow-lg'
                          : 'border-gray-200 hover:border-agri-400 hover:shadow'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-lg font-bold text-gray-800">{variety.name}</h4>
                          <p className="text-sm text-gray-600 italic">{variety.nameTr}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          variety.bestFor === 'oil' ? 'bg-harvest-100 text-harvest-700' :
                          variety.bestFor === 'table' ? 'bg-forest-100 text-forest-700' :
                          'bg-agri-100 text-agri-700'
                        }`}>
                          {variety.bestFor.toUpperCase()}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Package className="w-4 h-4 text-agri-600" />
                          <span className="font-semibold">{variety.yieldPerTree} kg</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Droplets className="w-4 h-4 text-agri-600" />
                          <span className="font-semibold">{variety.oilContent}% {t('yağ', 'oil')}</span>
                        </div>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-1">
                        {variety.region.slice(0, 2).map(region => (
                          <span key={region} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {region}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Variety Details */}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 max-h-[600px] overflow-y-auto">
                  {selectedVariety ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">{selectedVariety.name}</h3>
                        <p className="text-gray-600 italic mb-4">{selectedVariety.nameTr}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-600 mb-1">{t('Yağ İçeriği', 'Oil Content')}</p>
                          <p className="text-2xl font-bold text-agri-700">{selectedVariety.oilContent}%</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-600 mb-1">{t('Verim', 'Yield')}</p>
                          <p className="text-2xl font-bold text-forest-700">{selectedVariety.yieldPerTree} kg</p>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                          <Thermometer className="w-5 h-5 text-agri-600" />
                          {t('Optimal Sıcaklık', 'Optimal Temperature')}
                        </h4>
                        <p className="text-gray-700">{selectedVariety.optimalTemp.min}°C - {selectedVariety.optimalTemp.max}°C</p>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-agri-600" />
                          {t('Olgunlaşma Dönemi', 'Maturity Period')}
                        </h4>
                        <p className="text-gray-700">{selectedVariety.maturityPeriod}</p>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="font-bold text-gray-800 mb-2">{t('Özellikler', 'Characteristics')}</h4>
                        <ul className="space-y-1">
                          {selectedVariety.characteristics.map((char, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-agri-600 mt-0.5 flex-shrink-0" />
                              {char}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                          <Shield className="w-5 h-5 text-green-600" />
                          {t('Dayanıklı', 'Resistant To')}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedVariety.resistantTo.map((item, idx) => (
                            <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                          {t('Hassas', 'Susceptible To')}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedVariety.susceptibleTo.map((item, idx) => (
                            <span key={idx} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded font-semibold">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="font-bold text-gray-800 mb-2">{t('Bölgeler', 'Regions')}</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedVariety.region.map((region, idx) => (
                            <span key={idx} className="text-sm bg-agri-100 text-agri-700 px-3 py-1 rounded-lg font-semibold">
                              {region}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Oil Quality Prediction */}
                      <div className="bg-gradient-to-br from-harvest-50 to-harvest-100 p-4 rounded-lg border border-harvest-300">
                        <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                          <Zap className="w-5 h-5 text-harvest-600" />
                          {t('Tahmini Yağ Kalitesi', 'Predicted Oil Quality')}
                        </h4>
                        <p className="text-3xl font-bold text-harvest-700">
                          {predictOilQuality(selectedVariety, climateData.temp, climateData.rainfall).toFixed(1)}%
                        </p>
                        <p className="text-xs text-gray-600 mt-1">{t('Mevcut iklim koşullarına göre', 'Based on current climate conditions')}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <div className="text-center">
                        <Sprout className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>{t('Detayları görmek için bir çeşit seçin', 'Select a variety to see details')}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DISEASE DETECTION TAB */}
        {activeTab === 'disease' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Disease Detection Simulator */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <Camera className="w-6 h-6 text-agri-600" />
                  <h3 className="text-xl font-bold text-gray-800">
                    {t('AI Hastalık Tanılama', 'AI Disease Detection')}
                  </h3>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                  <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-2">{t('Yaprak veya meyve fotoğrafı yükleyin', 'Upload leaf or fruit image')}</p>
                  <button className="bg-gradient-to-r from-agri-600 to-forest-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                    {t('Fotoğraf Seç', 'Choose Photo')}
                  </button>
                </div>

                <div className="bg-agri-50 border border-agri-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <Info className="w-5 h-5 text-agri-600" />
                    {t('AI Tanılama Nasıl Çalışır?', 'How AI Detection Works?')}
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-agri-600 mt-0.5 flex-shrink-0" />
                      {t('Yaprak veya meyve fotoğrafı analiz edilir', 'Leaf or fruit image is analyzed')}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-agri-600 mt-0.5 flex-shrink-0" />
                      {t('Hastalık belirtileri tespit edilir', 'Disease symptoms are detected')}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-agri-600 mt-0.5 flex-shrink-0" />
                      {t('Olası hastalıklar %95+ doğrulukla belirlenir', 'Likely diseases identified with 95%+ accuracy')}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-agri-600 mt-0.5 flex-shrink-0" />
                      {t('Tedavi önerileri sunulur', 'Treatment recommendations provided')}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Symptom Checker */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-agri-600" />
                  <h3 className="text-xl font-bold text-gray-800">
                    {t('Belirti Kontrol Sistemi', 'Symptom Checker')}
                  </h3>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  {t('Gözlemlediğiniz belirtileri seçin:', 'Select observed symptoms:')}
                </p>

                <div className="max-h-64 overflow-y-auto mb-4 border border-gray-200 rounded-lg p-3">
                  <div className="space-y-2">
                    {allSymptoms.slice(0, 15).map(symptom => (
                      <label key={symptom} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={selectedSymptoms.includes(symptom)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedSymptoms([...selectedSymptoms, symptom]);
                            } else {
                              setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
                            }
                          }}
                          className="w-4 h-4 text-agri-600 rounded"
                        />
                        <span className="text-sm text-gray-700">{symptom}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {diseasesBySymptoms.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-800">{t('Olası Hastalıklar:', 'Likely Diseases:')}</h4>
                    {diseasesBySymptoms.map(disease => (
                      <div
                        key={disease.id}
                        className="bg-red-50 border border-red-200 rounded-lg p-3 cursor-pointer hover:shadow-md transition-all"
                        onClick={() => setSelectedDisease(disease)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-bold text-gray-800">
                            {language === 'tr' ? disease.nameTr : disease.name}
                          </h5>
                          <span className="text-xs bg-red-600 text-white px-2 py-1 rounded font-bold">
                            {disease.economicImpact}% {t('kayıp', 'loss')}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 italic">{disease.scientificName}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Disease List */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {t('Tüm Zeytin Hastalıkları', 'All Olive Diseases')}
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Disease Cards */}
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {OLIVE_DISEASES.map(disease => (
                    <div
                      key={disease.id}
                      onClick={() => setSelectedDisease(disease)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedDisease?.id === disease.id
                          ? 'border-red-600 bg-red-50 shadow-lg'
                          : 'border-gray-200 hover:border-red-400 hover:shadow'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-lg font-bold text-gray-800">
                            {language === 'tr' ? disease.nameTr : disease.name}
                          </h4>
                          <p className="text-sm text-gray-600 italic">{disease.scientificName}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          disease.type === 'fungal' ? 'bg-orange-100 text-orange-700' :
                          disease.type === 'bacterial' ? 'bg-red-100 text-red-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {disease.type.toUpperCase()}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-gray-700">
                          <TrendingDown className="w-4 h-4 text-red-600" />
                          <span className="font-semibold">{disease.economicImpact}% {t('kayıp', 'loss')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Disease Details */}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 max-h-[500px] overflow-y-auto">
                  {selectedDisease ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">
                          {language === 'tr' ? selectedDisease.nameTr : selectedDisease.name}
                        </h3>
                        <p className="text-gray-600 italic mb-2">{selectedDisease.scientificName}</p>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                            selectedDisease.type === 'fungal' ? 'bg-orange-100 text-orange-700' :
                            selectedDisease.type === 'bacterial' ? 'bg-red-100 text-red-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {selectedDisease.type}
                          </span>
                          <span className="px-3 py-1 rounded-lg text-xs font-bold bg-red-600 text-white">
                            {selectedDisease.economicImpact}% {t('ekonomik kayıp', 'economic loss')}
                          </span>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="font-bold text-gray-800 mb-2">{t('Belirtiler', 'Symptoms')}</h4>
                        <ul className="space-y-1">
                          {selectedDisease.symptoms.map((symptom, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                              {symptom}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="font-bold text-gray-800 mb-2">{t('Etkilenen Kısımlar', 'Affected Parts')}</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedDisease.affectedParts.map((part, idx) => (
                            <span key={idx} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded font-semibold">
                              {part}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="font-bold text-gray-800 mb-2">{t('Önleme', 'Prevention')}</h4>
                        <ul className="space-y-1">
                          {selectedDisease.prevention.map((method, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                              <Shield className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              {method}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h4 className="font-bold text-gray-800 mb-2 text-sm">{t('Konvansiyonel Tedavi', 'Conventional Treatment')}</h4>
                          <ul className="space-y-1">
                            {selectedDisease.treatment.map((method, idx) => (
                              <li key={idx} className="text-xs text-gray-700 flex items-start gap-1">
                                <CheckCircle2 className="w-3 h-3 text-agri-600 mt-0.5 flex-shrink-0" />
                                {method}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <h4 className="font-bold text-gray-800 mb-2 text-sm">{t('Organik Kontrol', 'Organic Control')}</h4>
                          <ul className="space-y-1">
                            {selectedDisease.organicControl.map((method, idx) => (
                              <li key={idx} className="text-xs text-gray-700 flex items-start gap-1">
                                <CheckCircle2 className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                                {method}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <div className="text-center">
                        <AlertTriangle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>{t('Detayları görmek için bir hastalık seçin', 'Select a disease to see details')}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PEST MANAGEMENT TAB */}
        {activeTab === 'pest' && (
          <div className="space-y-6">
            {/* Pest Activity Timeline */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-agri-600" />
                <h3 className="text-xl font-bold text-gray-800">
                  {t('Zararlı Aktivite Takvimi', 'Pest Activity Timeline')}
                </h3>
              </div>

              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  {pestTimeline.map((month, idx) => (
                    <div key={idx} className="mb-4">
                      <p className="text-sm font-bold text-gray-700 mb-2">{month.month}</p>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-600">{t('Zeytin Sineği', 'Olive Fly')}</span>
                            <span className="text-xs font-bold text-gray-700">{month.oliveFly}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${month.oliveFly > 60 ? 'bg-red-500' : month.oliveFly > 40 ? 'bg-orange-400' : 'bg-green-400'}`}
                              style={{ width: `${month.oliveFly}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-600">{t('Zeytin Güvesi', 'Olive Moth')}</span>
                            <span className="text-xs font-bold text-gray-700">{month.oliveMoth}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${month.oliveMoth > 60 ? 'bg-red-500' : month.oliveMoth > 40 ? 'bg-orange-400' : 'bg-green-400'}`}
                              style={{ width: `${month.oliveMoth}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-600">{t('Kabuklu Bit', 'Black Scale')}</span>
                            <span className="text-xs font-bold text-gray-700">{month.scale}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${month.scale > 60 ? 'bg-red-500' : month.scale > 40 ? 'bg-orange-400' : 'bg-green-400'}`}
                              style={{ width: `${month.scale}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pest List and Details */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {t('Zeytin Zararlıları', 'Olive Pests')}
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pest Cards */}
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {OLIVE_PESTS.map(pest => (
                    <div
                      key={pest.id}
                      onClick={() => setSelectedPest(pest)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedPest?.id === pest.id
                          ? 'border-orange-600 bg-orange-50 shadow-lg'
                          : 'border-gray-200 hover:border-orange-400 hover:shadow'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-lg font-bold text-gray-800">
                            {language === 'tr' ? pest.nameTr : pest.name}
                          </h4>
                          <p className="text-sm text-gray-600 italic">{pest.scientificName}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          pest.type === 'insect' ? 'bg-orange-100 text-orange-700' :
                          pest.type === 'mite' ? 'bg-red-100 text-red-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {pest.type.toUpperCase()}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-gray-700">
                          <TrendingDown className="w-4 h-4 text-red-600" />
                          <span className="font-semibold">{pest.economicImpact}% {t('kayıp', 'loss')}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-700">
                          <Clock className="w-4 h-4 text-agri-600" />
                          <span className="font-semibold text-xs">{pest.lifecycle}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pest Details */}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 max-h-[600px] overflow-y-auto">
                  {selectedPest ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">
                          {language === 'tr' ? selectedPest.nameTr : selectedPest.name}
                        </h3>
                        <p className="text-gray-600 italic mb-2">{selectedPest.scientificName}</p>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                            selectedPest.type === 'insect' ? 'bg-orange-100 text-orange-700' :
                            selectedPest.type === 'mite' ? 'bg-red-100 text-red-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {selectedPest.type}
                          </span>
                          <span className="px-3 py-1 rounded-lg text-xs font-bold bg-red-600 text-white">
                            {selectedPest.economicImpact}% {t('ekonomik kayıp', 'economic loss')}
                          </span>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="font-bold text-gray-800 mb-2">{t('Yaşam Döngüsü', 'Lifecycle')}</h4>
                        <p className="text-sm text-gray-700">{selectedPest.lifecycle}</p>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="font-bold text-gray-800 mb-2">{t('Zarar Tipi', 'Damage Type')}</h4>
                        <ul className="space-y-1">
                          {selectedPest.damageType.map((damage, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                              <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                              {damage}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="font-bold text-gray-800 mb-2">{t('Tespit Yöntemleri', 'Detection Methods')}</h4>
                        <ul className="space-y-1">
                          {selectedPest.detection.map((method, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                              <Search className="w-4 h-4 text-agri-600 mt-0.5 flex-shrink-0" />
                              {method}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                          <Target className="w-5 h-5 text-agri-600" />
                          {t('Eşik Değer', 'Threshold')}
                        </h4>
                        <p className="text-sm font-semibold text-agri-700 bg-agri-50 px-3 py-2 rounded">
                          {selectedPest.threshold}
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="font-bold text-gray-800 mb-2">{t('Önleme', 'Prevention')}</h4>
                        <ul className="space-y-1">
                          {selectedPest.prevention.map((method, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                              <Shield className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              {method}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <h4 className="font-bold text-gray-800 mb-2 text-sm">{t('Biyolojik Kontrol', 'Biological Control')}</h4>
                          <ul className="space-y-1">
                            {selectedPest.biologicalControl.map((method, idx) => (
                              <li key={idx} className="text-xs text-gray-700 flex items-start gap-1">
                                <CheckCircle2 className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                                {method}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h4 className="font-bold text-gray-800 mb-2 text-sm">{t('Kimyasal Kontrol', 'Chemical Control')}</h4>
                          <ul className="space-y-1">
                            {selectedPest.chemicalControl.map((method, idx) => (
                              <li key={idx} className="text-xs text-gray-700 flex items-start gap-1">
                                <CheckCircle2 className="w-3 h-3 text-agri-600 mt-0.5 flex-shrink-0" />
                                {method}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="font-bold text-gray-800 mb-2">{t('Yoğun Aktivite Dönemleri', 'Peak Activity Periods')}</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedPest.peakActivity.map((period, idx) => (
                            <span key={idx} className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-lg font-semibold">
                              {period}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <div className="text-center">
                        <Bug className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>{t('Detayları görmek için bir zararlı seçin', 'Select a pest to see details')}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HARVEST PLANNING TAB */}
        {activeTab === 'harvest' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Harvest Calculator */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <Calculator className="w-6 h-6 text-agri-600" />
                  <h3 className="text-xl font-bold text-gray-800">
                    {t('Hasat Olgunluk İndeksi', 'Harvest Maturity Index')}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                      {t('Çeşit Seçin', 'Select Variety')}
                    </label>
                    <select
                      value={harvestData.variety}
                      onChange={(e) => setHarvestData({ ...harvestData, variety: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500 text-gray-700"
                    >
                      {TURKISH_OLIVE_VARIETIES.map(v => (
                        <option key={v.id} value={v.id}>{v.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                      {t('Ağaç Sayısı', 'Number of Trees')}
                    </label>
                    <input
                      type="number"
                      value={harvestData.trees}
                      onChange={(e) => setHarvestData({ ...harvestData, trees: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500 text-gray-700"
                    />
                  </div>

                  {(() => {
                    const selectedVar = TURKISH_OLIVE_VARIETIES.find(v => v.id === harvestData.variety);
                    const daysToHarvest = 45; // Simulated
                    const maturityIndex = calculateMaturityIndex(harvestData.variety, daysToHarvest);
                    const totalYield = selectedVar ? harvestData.trees * selectedVar.yieldPerTree : 0;
                    const oilYield = selectedVar ? totalYield * (selectedVar.oilContent / 100) : 0;

                    return (
                      <>
                        <div className="bg-gradient-to-br from-agri-50 to-forest-50 p-6 rounded-lg border border-agri-300">
                          <h4 className="font-bold text-gray-800 mb-4">{t('Hasat Tahminleri', 'Harvest Estimates')}</h4>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                              <p className="text-sm text-gray-600 mb-1">{t('Olgunluk İndeksi', 'Maturity Index')}</p>
                              <p className="text-3xl font-bold text-agri-700">{(maturityIndex * 100).toFixed(0)}%</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                              <p className="text-sm text-gray-600 mb-1">{t('Tahmini Süre', 'Days to Harvest')}</p>
                              <p className="text-3xl font-bold text-forest-700">{daysToHarvest}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                              <p className="text-sm text-gray-600 mb-1">{t('Toplam Verim', 'Total Yield')}</p>
                              <p className="text-2xl font-bold text-gray-800">{totalYield.toLocaleString()} kg</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                              <p className="text-sm text-gray-600 mb-1">{t('Yağ Verimi', 'Oil Yield')}</p>
                              <p className="text-2xl font-bold text-harvest-700">{oilYield.toLocaleString()} kg</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-agri-50 border border-agri-200 rounded-lg p-4">
                          <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                            <Info className="w-5 h-5 text-agri-600" />
                            {t('Hasat Önerileri', 'Harvest Recommendations')}
                          </h4>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-agri-600 mt-0.5 flex-shrink-0" />
                              {t('Sabah erken saatlerde hasat yapın', 'Harvest in early morning hours')}
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-agri-600 mt-0.5 flex-shrink-0" />
                              {t('Meyvelerin %70-80\'i olgunlaştığında hasat edin', 'Harvest when 70-80% of fruits are ripe')}
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-agri-600 mt-0.5 flex-shrink-0" />
                              {t('Hasattan sonra 24 saat içinde işleyin', 'Process within 24 hours after harvest')}
                            </li>
                          </ul>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Precision Irrigation Recommendations */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <Droplets className="w-6 h-6 text-agri-600" />
                  <h3 className="text-xl font-bold text-gray-800">
                    {t('Hassas Sulama Önerileri', 'Precision Irrigation Recommendations')}
                  </h3>
                </div>

                <div className="space-y-4">
                  {(() => {
                    const selectedVar = TURKISH_OLIVE_VARIETIES.find(v => v.id === harvestData.variety);
                    if (!selectedVar) return null;

                    const waterReqMap = { low: 400, medium: 600, high: 800 };
                    const baseWater = waterReqMap[selectedVar.waterRequirement];
                    const climateAdjustment = climateData.temp > 30 ? 1.2 : climateData.temp < 15 ? 0.8 : 1.0;
                    const recommendedWater = baseWater * climateAdjustment;

                    return (
                      <>
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-300">
                          <h4 className="font-bold text-gray-800 mb-4">{t('Sulama Planı', 'Irrigation Plan')}</h4>

                          <div className="grid grid-cols-1 gap-4">
                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                              <p className="text-sm text-gray-600 mb-1">{t('Yıllık Su Gereksinimi', 'Annual Water Requirement')}</p>
                              <p className="text-3xl font-bold text-blue-700">{recommendedWater.toFixed(0)} mm</p>
                              <p className="text-xs text-gray-600 mt-1">{t('İklim koşullarına göre ayarlandı', 'Adjusted for climate conditions')}</p>
                            </div>

                            <div className="bg-white p-4 rounded-lg border border-gray-200">
                              <p className="text-sm text-gray-600 mb-1">{t('Toplam Su (tüm bahçe)', 'Total Water (entire orchard)')}</p>
                              <p className="text-2xl font-bold text-gray-800">
                                {(recommendedWater * harvestData.trees * 0.05).toLocaleString()} {t('litre', 'liters')}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-agri-50 border border-agri-200 rounded-lg p-4">
                          <h4 className="font-bold text-gray-800 mb-2">{t('Sulama Stratejisi', 'Irrigation Strategy')}</h4>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                              <Droplets className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              {selectedVar.waterRequirement === 'low'
                                ? t('Kuraklığa dayanıklı - minimal sulama', 'Drought resistant - minimal irrigation')
                                : selectedVar.waterRequirement === 'medium'
                                ? t('Orta sulama - büyüme döneminde düzenli', 'Medium irrigation - regular during growth')
                                : t('Yüksek sulama - sık ve düzenli sulama', 'High irrigation - frequent and regular')}
                            </li>
                            <li className="flex items-start gap-2">
                              <Droplets className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              {t('Damla sulama sistemi önerilir', 'Drip irrigation system recommended')}
                            </li>
                            <li className="flex items-start gap-2">
                              <Droplets className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              {t('Toprak nem sensörleri kullanın', 'Use soil moisture sensors')}
                            </li>
                          </ul>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* Harvest Timeline */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-agri-600" />
                <h3 className="text-xl font-bold text-gray-800">
                  {t('Çeşitlere Göre Hasat Takvimi', 'Harvest Calendar by Variety')}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {TURKISH_OLIVE_VARIETIES.map(variety => (
                  <div key={variety.id} className="bg-gradient-to-br from-agri-50 to-forest-50 p-4 rounded-lg border border-agri-200">
                    <h4 className="font-bold text-gray-800 mb-2">{variety.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Calendar className="w-4 h-4 text-agri-600" />
                      <span className="font-semibold">{variety.maturityPeriod}</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-600">
                      {variety.region[0]} {t('bölgesi için', 'region')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MARKET ANALYSIS TAB */}
        {activeTab === 'market' && (
          <div className="space-y-6">
            {/* Price Trends */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-agri-600" />
                <h3 className="text-xl font-bold text-gray-800">
                  {t('Türkiye Zeytinyağı Fiyat Trendleri (2024/25)', 'Turkey Olive Oil Price Trends (2024/25)')}
                </h3>
              </div>

              <div className="overflow-x-auto">
                <div className="min-w-[800px] space-y-2">
                  {marketTrends.map((month, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-2 text-sm font-bold text-gray-700">{month.month}</div>

                      <div className="col-span-10 grid grid-cols-3 gap-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-600">{t('Fiyat', 'Price')}</span>
                            <span className="text-xs font-bold text-harvest-700">{month.price.toFixed(0)} TRY/kg</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-gradient-to-r from-harvest-400 to-harvest-600 h-3 rounded-full"
                              style={{ width: `${(month.price / 180) * 100}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-600">{t('Talep', 'Demand')}</span>
                            <span className="text-xs font-bold text-agri-700">{month.demand.toFixed(0)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-gradient-to-r from-agri-400 to-agri-600 h-3 rounded-full"
                              style={{ width: `${month.demand}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-600">{t('Üretim', 'Production')}</span>
                            <span className="text-xs font-bold text-forest-700">{month.production.toFixed(0)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-gradient-to-r from-forest-400 to-forest-600 h-3 rounded-full"
                              style={{ width: `${month.production}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Market Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-harvest-500 to-sunset-600 text-white rounded-xl shadow-lg p-6">
                <DollarSign className="w-12 h-12 mb-3 opacity-80" />
                <h4 className="text-lg font-bold mb-2">{t('Ortalama Piyasa Fiyatı', 'Average Market Price')}</h4>
                <p className="text-3xl font-bold">150 TRY/kg</p>
                <p className="text-sm opacity-90">{t('Zeytinyağı (2024/25)', 'Olive Oil (2024/25)')}</p>
              </div>

              <div className="bg-gradient-to-br from-agri-500 to-forest-600 text-white rounded-xl shadow-lg p-6">
                <TrendingUp className="w-12 h-12 mb-3 opacity-80" />
                <h4 className="text-lg font-bold mb-2">{t('Yıllık Büyüme', 'Annual Growth')}</h4>
                <p className="text-3xl font-bold">+12%</p>
                <p className="text-sm opacity-90">{t('İhracat artışı', 'Export increase')}</p>
              </div>

              <div className="bg-gradient-to-br from-earth-500 to-earth-700 text-white rounded-xl shadow-lg p-6">
                <Package className="w-12 h-12 mb-3 opacity-80" />
                <h4 className="text-lg font-bold mb-2">{t('Toplam Üretim', 'Total Production')}</h4>
                <p className="text-3xl font-bold">450K {t('ton', 'tons')}</p>
                <p className="text-sm opacity-90">{t('Türkiye (2024/25)', 'Turkey (2024/25)')}</p>
              </div>
            </div>

            {/* Regional Distribution */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-agri-600" />
                <h3 className="text-xl font-bold text-gray-800">
                  {t('Bölgesel Üretim Dağılımı', 'Regional Production Distribution')}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { region: 'Ege', tr: 'Ege', percentage: 65, production: 292500 },
                  { region: 'Marmara', tr: 'Marmara', percentage: 15, production: 67500 },
                  { region: 'Akdeniz', tr: 'Mediterranean', percentage: 12, production: 54000 },
                  { region: 'Güneydoğu Anadolu', tr: 'Southeast Anatolia', percentage: 8, production: 36000 }
                ].map((region, idx) => (
                  <div key={idx} className="bg-agri-50 p-4 rounded-lg border border-agri-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-800">{language === 'tr' ? region.region : region.tr}</h4>
                      <span className="text-sm font-bold text-agri-700">{region.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                      <div
                        className="bg-gradient-to-r from-agri-500 to-forest-600 h-4 rounded-full"
                        style={{ width: `${region.percentage}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-700">
                      {region.production.toLocaleString()} {t('ton üretim', 'tons production')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* ROI Calculator */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <Calculator className="w-6 h-6 text-agri-600" />
                <h3 className="text-xl font-bold text-gray-800">
                  {t('Yatırım Getirisi (ROI) Hesaplayıcı', 'Return on Investment (ROI) Calculator')}
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                      {t('Çeşit', 'Variety')}
                    </label>
                    <select
                      value={harvestData.variety}
                      onChange={(e) => setHarvestData({ ...harvestData, variety: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500 text-gray-700"
                    >
                      {TURKISH_OLIVE_VARIETIES.map(v => (
                        <option key={v.id} value={v.id}>{v.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                      {t('Ağaç Sayısı', 'Number of Trees')}
                    </label>
                    <input
                      type="number"
                      value={harvestData.trees}
                      onChange={(e) => setHarvestData({ ...harvestData, trees: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500 text-gray-700"
                    />
                  </div>
                </div>

                {(() => {
                  const roi = calculateROI(harvestData.trees, harvestData.variety, 5);
                  return (
                    <div className="bg-gradient-to-br from-agri-50 to-forest-50 p-6 rounded-lg border border-agri-300">
                      <h4 className="font-bold text-gray-800 mb-4">{t('5 Yıllık Projeksiyon', '5-Year Projection')}</h4>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-600 mb-1">{t('Toplam Gelir', 'Total Revenue')}</p>
                          <p className="text-2xl font-bold text-green-700">
                            {roi.revenue?.toLocaleString() || 0} TRY
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-600 mb-1">{t('Toplam Maliyet', 'Total Cost')}</p>
                          <p className="text-2xl font-bold text-red-700">
                            {roi.costs?.toLocaleString() || 0} TRY
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-600 mb-1">{t('Net Kar', 'Net Profit')}</p>
                          <p className={`text-2xl font-bold ${roi.profit > 0 ? 'text-green-700' : 'text-red-700'}`}>
                            {roi.profit?.toLocaleString() || 0} TRY
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-600 mb-1">{t('ROI', 'ROI')}</p>
                          <p className={`text-2xl font-bold ${roi.roi > 0 ? 'text-green-700' : 'text-red-700'}`}>
                            {roi.roi.toFixed(1)}%
                          </p>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-600 mb-1">{t('Toplam Verim (5 yıl)', 'Total Yield (5 years)')}</p>
                        <p className="text-xl font-bold text-gray-800">
                          {roi.totalYield?.toLocaleString() || 0} kg ({roi.oilYield?.toLocaleString() || 0} kg {t('yağ', 'oil')})
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </div>

              <div className="mt-6 bg-harvest-50 border border-harvest-300 rounded-lg p-4">
                <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Info className="w-5 h-5 text-harvest-600" />
                  {t('Hesaplama Notları', 'Calculation Notes')}
                </h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-harvest-600 mt-0.5 flex-shrink-0" />
                    {t('İlk yatırım: 500 TRY/ağaç', 'Initial investment: 500 TRY/tree')}
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-harvest-600 mt-0.5 flex-shrink-0" />
                    {t('Yıllık bakım: 150 TRY/ağaç', 'Annual maintenance: 150 TRY/tree')}
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-harvest-600 mt-0.5 flex-shrink-0" />
                    {t('Fiyatlar 2024/25 piyasa verilerine göre', 'Prices based on 2024/25 market data')}
                  </li>
                </ul>
              </div>
            </div>

            {/* Yield Prediction */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {TURKISH_OLIVE_VARIETIES.slice(0, 3).map(variety => {
                const roi = calculateROI(100, variety.id, 5);
                return (
                  <div key={variety.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <Sprout className="w-6 h-6 text-agri-600" />
                      <h3 className="text-lg font-bold text-gray-800">{variety.name}</h3>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-agri-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">{t('5 Yıllık ROI', '5-Year ROI')}</p>
                        <p className={`text-2xl font-bold ${roi.roi > 0 ? 'text-green-700' : 'text-red-700'}`}>
                          {roi.roi.toFixed(1)}%
                        </p>
                      </div>

                      <div className="bg-forest-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">{t('Toplam Kar', 'Total Profit')}</p>
                        <p className="text-xl font-bold text-gray-800">
                          {roi.profit?.toLocaleString() || 0} TRY
                        </p>
                      </div>

                      <div className="bg-harvest-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">{t('Yağ Verimi', 'Oil Yield')}</p>
                        <p className="text-xl font-bold text-gray-800">
                          {roi.oilYield?.toLocaleString() || 0} kg
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
