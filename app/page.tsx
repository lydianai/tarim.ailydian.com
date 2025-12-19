'use client';

import { useState, useEffect } from 'react';
import AgriMap from '@/components/AgriMap';
import WeatherWidget from '@/components/WeatherWidget';
import CropYieldChart from '@/components/CropYieldChart';
import PesticideTable from '@/components/PesticideTable';
import SoilAnalysis from '@/components/SoilAnalysis';
import CropCatalog from '@/components/CropCatalog';
import GlobalComparison from '@/components/GlobalComparison';
import PesticideMatcher from '@/components/PesticideMatcher';
import LiveDataStream from '@/components/LiveDataStream';
import PremiumInsights from '@/components/PremiumInsights';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import AboutProject from '@/components/AboutProject';
import { Sprout, MapPin, Globe, BarChart3, Leaf, Menu, X, Database, Shield, Sparkles, Activity, LineChart, Languages, BookOpen, AlertCircle } from 'lucide-react';
import { CROPS_DATABASE } from '@/lib/crops-database';
import { PESTICIDES_DATABASE } from '@/lib/pesticides-database';
import { DATA_SOURCES } from '@/lib/bigdata-collector';
import { GLOBAL_AGRI_LEADERS } from '@/lib/global-agri-insights';
import { Language, getTranslation, detectBrowserLanguage } from '@/lib/i18n';

type TabType = 'overview' | 'soil' | 'pesticides' | 'crops' | 'global' | 'matcher' | 'insights' | 'live-data' | 'analytics' | 'about';

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState({ lat: 41.8781, lon: -93.0977 });
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [language, setLanguage] = useState<Language>('tr');
  const [showDevBanner, setShowDevBanner] = useState(true);

  useEffect(() => {
    // Detect browser language on mount
    const detected = detectBrowserLanguage();
    setLanguage(detected);
  }, []);

  const t = getTranslation(language);

  const handleLocationSelect = (lat: number, lon: number) => {
    setSelectedLocation({ lat, lon });
  };

  const tabs: Array<{key: TabType, label: string, icon: any}> = [
    { key: 'overview', label: t.overview, icon: BarChart3 },
    { key: 'analytics', label: t.analytics, icon: LineChart },
    { key: 'insights', label: t.aiInsights, icon: Sparkles },
    { key: 'live-data', label: t.liveData, icon: Activity },
    { key: 'soil', label: t.soilAnalysis, icon: Leaf },
    { key: 'crops', label: t.cropCatalog, icon: Sprout },
    { key: 'matcher', label: t.pesticideMatcher, icon: Shield },
    { key: 'pesticides', label: t.pesticidesDB, icon: Database },
    { key: 'global', label: t.globalInsights, icon: Globe },
    { key: 'about', label: t.aboutProject, icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Development Banner */}
      {showDevBanner && (
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            <div>
              <span className="font-bold">{t.devBannerTitle}</span>
              <span className="mx-2">•</span>
              <span className="text-sm">{t.devBannerMessage}</span>
            </div>
          </div>
          <button
            onClick={() => setShowDevBanner(false)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-green-500 sticky top-0 z-50">
        <div className="max-w-full px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-green-500 to-green-700 p-3 rounded-xl shadow-lg">
                <Sprout className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-green-900 bg-clip-text text-transparent">
                  {t.headerTitle}
                </h1>
                <p className="text-sm text-gray-600">{t.headerSubtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1 border border-gray-200">
                <button
                  onClick={() => setLanguage('tr')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    language === 'tr'
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  🇹🇷 TR
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    language === 'en'
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  🇬🇧 EN
                </button>
              </div>

              <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-purple-50 to-pink-50 px-3 py-2 rounded-lg border border-purple-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-purple-700">{t.liveStatus}</span>
              </div>
              <div className="hidden md:flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                <Database className="w-3 h-3 text-blue-700" />
                <span className="text-xs font-semibold text-blue-900">{DATA_SOURCES.length} {t.dataSources}</span>
              </div>
              <div className="hidden lg:flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                <MapPin className="w-3 h-3 text-green-700" />
                <span className="text-xs font-semibold text-green-900">
                  {selectedLocation.lat.toFixed(4)}, {selectedLocation.lon.toFixed(4)}
                </span>
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                {sidebarOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} lg:block w-64 bg-white shadow-lg min-h-[calc(100vh-88px)] sticky top-[88px]`}>
          <nav className="p-4 space-y-2">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === key
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-semibold">{label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 mt-6 space-y-4">
            {/* Platform Stats */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3 text-sm">{t.platformStatistics}</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-blue-700">{t.crops}:</span>
                  <span className="font-bold text-blue-900">{CROPS_DATABASE.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">{t.pesticides}:</span>
                  <span className="font-bold text-blue-900">{PESTICIDES_DATABASE.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">{t.dataSources}:</span>
                  <span className="font-bold text-blue-900">{DATA_SOURCES.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">{t.countries}:</span>
                  <span className="font-bold text-blue-900">{GLOBAL_AGRI_LEADERS.length}</span>
                </div>
              </div>
            </div>

            {/* Data Sources */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-2 text-sm">{t.liveDataSources}</h3>
              <ul className="space-y-1 text-xs text-purple-800">
                <li>• USDA NASS API</li>
                <li>• EPA PPLS Database</li>
                <li>• OpenWeather Agro</li>
                <li>• NASA MODIS/SMAP</li>
                <li>• Sentinel-2 Satellite</li>
                <li>• SSURGO Soil Data</li>
                <li>• FAO FAOSTAT</li>
              </ul>
            </div>

            {/* Global Leaders */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4 border border-amber-200">
              <h3 className="font-semibold text-amber-900 mb-2 text-sm">{t.agriTechLeaders}</h3>
              <ul className="space-y-1 text-xs text-amber-800">
                <li>🇳🇱 {language === 'tr' ? 'Hollanda' : 'Netherlands'} (#1)</li>
                <li>🇮🇱 {language === 'tr' ? 'İsrail' : 'Israel'} (#2)</li>
                <li>🇯🇵 {language === 'tr' ? 'Japonya' : 'Japan'} (#3)</li>
                <li>🇺🇸 ABD (#4)</li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Total Crops</div>
                      <div className="text-3xl font-bold text-gray-900">{CROPS_DATABASE.length}</div>
                    </div>
                    <Sprout className="w-12 h-12 text-green-500 opacity-20" />
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Pesticides</div>
                      <div className="text-3xl font-bold text-gray-900">{PESTICIDES_DATABASE.length}</div>
                    </div>
                    <Shield className="w-12 h-12 text-purple-500 opacity-20" />
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Data Sources</div>
                      <div className="text-3xl font-bold text-gray-900">{DATA_SOURCES.length}</div>
                    </div>
                    <Database className="w-12 h-12 text-blue-500 opacity-20" />
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Countries</div>
                      <div className="text-3xl font-bold text-gray-900">{GLOBAL_AGRI_LEADERS.length}</div>
                    </div>
                    <Globe className="w-12 h-12 text-orange-500 opacity-20" />
                  </div>
                </div>
              </div>

              {/* Map and Weather Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 h-[500px]">
                  <AgriMap onLocationSelect={handleLocationSelect} />
                </div>
                <div className="h-[500px] overflow-auto">
                  <WeatherWidget lat={selectedLocation.lat} lon={selectedLocation.lon} />
                </div>
              </div>

              {/* Yield Chart */}
              <div>
                <CropYieldChart />
              </div>
            </div>
          )}

          {activeTab === 'soil' && (
            <div className="space-y-6">
              <SoilAnalysis />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-[400px]">
                  <AgriMap onLocationSelect={handleLocationSelect} />
                </div>
                <div className="h-[400px] overflow-auto">
                  <WeatherWidget lat={selectedLocation.lat} lon={selectedLocation.lon} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'crops' && (
            <div>
              <CropCatalog />
            </div>
          )}

          {activeTab === 'matcher' && (
            <div>
              <PesticideMatcher />
            </div>
          )}

          {activeTab === 'pesticides' && (
            <div className="space-y-6">
              <PesticideTable />
            </div>
          )}

          {activeTab === 'global' && (
            <div>
              <GlobalComparison />
            </div>
          )}

          {activeTab === 'insights' && (
            <div>
              <PremiumInsights />
            </div>
          )}

          {activeTab === 'live-data' && (
            <div>
              <LiveDataStream />
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <AnalyticsDashboard />
            </div>
          )}

          {activeTab === 'about' && (
            <div>
              <AboutProject lang={language} />
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-full px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">About AgriTech Platform</h3>
              <p className="text-sm text-gray-600">
                World's most comprehensive agricultural intelligence platform powered by real-time data from USDA, NASA, EPA, and global sources.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Data Sources</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• USDA NASS QuickStats & CDL</li>
                <li>• NASA MODIS & SMAP Satellites</li>
                <li>• EPA Pesticide Database</li>
                <li>• Copernicus Sentinel-2</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Features</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 30+ Crop Database</li>
                <li>• 20+ Pesticide Solutions</li>
                <li>• Global Country Comparison</li>
                <li>• Real-time Weather & Satellite</li>
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-200 text-sm text-gray-600">
            <p>© 2025 AgriTech Platform Pro - Powered by Global Agricultural Big Data</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Live Data Streaming
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
