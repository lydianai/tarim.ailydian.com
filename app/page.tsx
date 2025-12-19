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
import SupplyChainTracker from '@/components/SupplyChainTracker';
import ESGDashboard from '@/components/ESGDashboard';
import BigDataDashboard from '@/components/BigDataDashboard';
import Roadmap from '@/components/Roadmap';
import InvestorDeck from '@/components/InvestorDeck';
import ApiDocumentation from '@/components/ApiDocumentation';
import AdvancedApiDocs from '@/components/AdvancedApiDocs';
import AgriMarketplace from '@/components/AgriMarketplace';
import LiveCommodityPricing from '@/components/LiveCommodityPricing';
import PrivacyPolicy from '@/components/PrivacyPolicy';
import TermsOfService from '@/components/TermsOfService';
import ContactPage from '@/components/ContactPage';
import DroneManagement from '@/components/DroneManagement';
import OliveCultivation from '@/components/OliveCultivation';
import { Sprout, MapPin, Globe, BarChart3, Leaf, Menu, X, Database, Shield, Sparkles, Activity, LineChart, Languages, BookOpen, AlertCircle, Package, Award, Rocket, TrendingUp, CheckCircle, Zap, Code, Scale, MessageSquare, ShoppingCart, DollarSign, LayoutDashboard, Plane, TreePine } from 'lucide-react';
import { CROPS_DATABASE } from '@/lib/crops-database';
import { PESTICIDES_DATABASE } from '@/lib/pesticides-database';
import { DATA_SOURCES } from '@/lib/bigdata-collector';
import { GLOBAL_AGRI_LEADERS } from '@/lib/global-agri-insights';
import { Language, getTranslation, detectBrowserLanguage } from '@/lib/i18n';

type TabType = 'overview' | 'soil' | 'pesticides' | 'crops' | 'global' | 'matcher' | 'insights' | 'live-data' | 'analytics' | 'supply-chain' | 'esg' | 'big-data' | 'roadmap' | 'investor-deck' | 'api-docs' | 'advanced-api' | 'marketplace' | 'commodity-pricing' | 'privacy' | 'terms' | 'contact' | 'about' | 'drones' | 'olive';

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

  const tabs: Array<{key: TabType, label: string, icon: any, section?: string}> = [
    // Core Platform
    { key: 'overview', label: t.overview, icon: BarChart3, section: 'core' },
    { key: 'analytics', label: t.analytics, icon: LineChart, section: 'core' },
    { key: 'insights', label: t.aiInsights, icon: Sparkles, section: 'core' },
    { key: 'live-data', label: t.liveData, icon: Activity, section: 'core' },

    // Agriculture Tools
    { key: 'soil', label: t.soilAnalysis, icon: Leaf, section: 'agri' },
    { key: 'crops', label: t.cropCatalog, icon: Sprout, section: 'agri' },
    { key: 'olive', label: language === 'tr' ? 'Zeytincilik' : 'Olive Cultivation', icon: TreePine, section: 'agri' },
    { key: 'matcher', label: t.pesticideMatcher, icon: Shield, section: 'agri' },
    { key: 'drones', label: language === 'tr' ? 'Drone Yönetimi' : 'Drone Management', icon: Plane, section: 'agri' },
    { key: 'pesticides', label: t.pesticidesDB, icon: Database, section: 'agri' },
    { key: 'global', label: t.globalInsights, icon: Globe, section: 'agri' },

    // Enterprise
    { key: 'supply-chain', label: t.supplyChain, icon: Package, section: 'enterprise' },
    { key: 'esg', label: t.esgMetrics, icon: Award, section: 'enterprise' },
    { key: 'big-data', label: t.bigData, icon: Database, section: 'enterprise' },

    // E-Commerce & Marketplace
    { key: 'marketplace', label: language === 'tr' ? 'B2B Pazar Yeri' : 'B2B Marketplace', icon: ShoppingCart, section: 'ecommerce' },
    { key: 'commodity-pricing', label: language === 'tr' ? 'Canlı Fiyatlar' : 'Live Pricing', icon: DollarSign, section: 'ecommerce' },
    { key: 'advanced-api', label: language === 'tr' ? 'API Platform' : 'API Platform', icon: Code, section: 'ecommerce' },

    // Investor & Business
    { key: 'roadmap', label: t.roadmap, icon: Rocket, section: 'investor' },
    { key: 'investor-deck', label: t.investorDeck, icon: TrendingUp, section: 'investor' },

    // Info & Legal
    { key: 'about', label: t.aboutProject, icon: BookOpen, section: 'info' },
    { key: 'api-docs', label: language === 'tr' ? 'API Dokümantasyonu' : 'API Documentation', icon: Code, section: 'info' },
    { key: 'privacy', label: language === 'tr' ? 'Gizlilik Politikası' : 'Privacy Policy', icon: Shield, section: 'info' },
    { key: 'terms', label: language === 'tr' ? 'Kullanım Koşulları' : 'Terms of Service', icon: Scale, section: 'info' },
    { key: 'contact', label: language === 'tr' ? 'İletişim' : 'Contact', icon: MessageSquare, section: 'info' },
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
              <div className="bg-gradient-to-br from-green-500 to-green-700 p-2 sm:p-3 rounded-xl shadow-lg">
                <Sprout className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  Lydian AgriTech
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">{t.headerSubtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-3">
              {/* Drone Management Button */}
              <button
                onClick={() => setActiveTab('drones')}
                className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-600 text-white font-bold px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:from-green-700 hover:to-green-700 transition-all shadow-lg"
              >
                <Plane className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
                <span className="text-xs sm:text-sm">Drone</span>
              </button>

              {/* Dashboard Link */}
              <a
                href="/tarim-dashboard"
                className="hidden sm:flex items-center gap-1.5 sm:gap-2 bg-gray-50 border-2 border-green-600 text-green-700 font-bold px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-green-50 transition-all shadow-md"
              >
                <LayoutDashboard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-[10px] sm:text-xs">Dashboard</span>
              </a>

              {/* Language Switcher */}
              <div className="flex items-center gap-0.5 sm:gap-1 bg-gray-50 rounded-lg p-0.5 sm:p-1 border border-gray-200">
                <button
                  onClick={() => setLanguage('tr')}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs font-semibold transition-all ${
                    language === 'tr'
                      ? 'bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  🇹🇷
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs font-semibold transition-all ${
                    language === 'en'
                      ? 'bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  🇬🇧
                </button>
              </div>

              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-1.5 sm:p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                {sidebarOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed lg:static lg:translate-x-0 w-64 sm:w-72 lg:w-64 h-screen lg:h-auto bg-white shadow-2xl lg:shadow-lg z-40 transition-transform duration-300 overflow-y-auto`}
        >
          <nav className="p-4 space-y-1">
            {/* Core Platform */}
            <div className="mb-4">
              <h3 className="text-xs font-bold text-green-700 uppercase tracking-wider px-3 mb-2">
                {language === 'tr' ? '📊 Ana Platform' : '📊 Core Platform'}
              </h3>
              {tabs.filter(tab => tab.section === 'core').map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveTab(key);
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                    activeTab === key
                      ? 'bg-gradient-to-r from-green-600 to-green-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{label}</span>
                </button>
              ))}
            </div>

            {/* Agriculture Tools */}
            <div className="mb-4">
              <h3 className="text-xs font-bold text-green-700 uppercase tracking-wider px-3 mb-2">
                {language === 'tr' ? '🌱 Tarım Araçları' : '🌱 Agriculture Tools'}
              </h3>
              {tabs.filter(tab => tab.section === 'agri').map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveTab(key);
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                    activeTab === key
                      ? 'bg-gradient-to-r from-green-600 to-green-600 text-white shadow-lg'
                      : 'bg-green-50 text-green-900 hover:bg-green-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{label}</span>
                </button>
              ))}
            </div>

            {/* Enterprise */}
            <div className="mb-4">
              <h3 className="text-xs font-bold text-blue-700 uppercase tracking-wider px-3 mb-2">
                {language === 'tr' ? '🏢 Kurumsal' : '🏢 Enterprise'}
              </h3>
              {tabs.filter(tab => tab.section === 'enterprise').map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveTab(key);
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                    activeTab === key
                      ? 'bg-gradient-to-r from-blue-600 to-blue-600 text-white shadow-lg'
                      : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{label}</span>
                </button>
              ))}
            </div>

            {/* E-Commerce */}
            <div className="mb-4">
              <h3 className="text-xs font-bold text-purple-700 uppercase tracking-wider px-3 mb-2">
                {language === 'tr' ? '🛒 E-Ticaret' : '🛒 E-Commerce'}
              </h3>
              {tabs.filter(tab => tab.section === 'ecommerce').map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveTab(key);
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                    activeTab === key
                      ? 'bg-gradient-to-r from-purple-600 to-purple-600 text-white shadow-lg'
                      : 'bg-purple-50 text-purple-900 hover:bg-purple-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{label}</span>
                </button>
              ))}
            </div>

            {/* Investor */}
            <div className="mb-4">
              <h3 className="text-xs font-bold text-orange-700 uppercase tracking-wider px-3 mb-2">
                {language === 'tr' ? '💼 Yatırımcı' : '💼 Investor'}
              </h3>
              {tabs.filter(tab => tab.section === 'investor').map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveTab(key);
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                    activeTab === key
                      ? 'bg-gradient-to-r from-orange-600 to-orange-600 text-white shadow-lg'
                      : 'bg-orange-50 text-orange-900 hover:bg-orange-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{label}</span>
                </button>
              ))}
            </div>

            {/* Info & Legal */}
            <div className="mb-4">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider px-3 mb-2">
                {language === 'tr' ? '📚 Bilgi & Yasal' : '📚 Info & Legal'}
              </h3>
              {tabs.filter(tab => tab.section === 'info').map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveTab(key);
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                    activeTab === key
                      ? 'bg-gradient-to-r from-gray-600 to-gray-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Platform Stats */}
          <div className="p-4 space-y-3">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <h4 className="font-bold text-sm text-green-900">{t.platformStats}</h4>
              </div>
              <div className="space-y-2 text-xs text-green-800">
                <div className="flex justify-between">
                  <span>{t.activeUsers}</span>
                  <span className="font-bold">2,847</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.dataPoints}</span>
                  <span className="font-bold">1.2M</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-4 h-4 text-blue-600" />
                <h4 className="font-bold text-sm text-blue-900">{t.dataSources}</h4>
              </div>
              <p className="text-xs text-blue-800">{DATA_SOURCES.length} {t.activeIntegrations}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4 text-purple-600" />
                <h4 className="font-bold text-sm text-purple-900">{t.globalLeaders}</h4>
              </div>
              <p className="text-xs text-purple-800">{GLOBAL_AGRI_LEADERS.length} {t.countries}</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto min-h-screen">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'overview' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border-l-4 border-green-500">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{t.platformOverview}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                    <div className="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200">
                      <Database className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mb-2" />
                      <h3 className="font-bold text-sm sm:text-base text-green-900">{CROPS_DATABASE.length} {t.cropTypes}</h3>
                      <p className="text-xs sm:text-sm text-green-700">{t.comprehensiveDatabase}</p>
                    </div>
                    <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
                      <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mb-2" />
                      <h3 className="font-bold text-sm sm:text-base text-blue-900">{PESTICIDES_DATABASE.length} {t.pesticides}</h3>
                      <p className="text-xs sm:text-sm text-blue-700">{t.safetyFirst}</p>
                    </div>
                    <div className="bg-purple-50 p-3 sm:p-4 rounded-lg border border-purple-200">
                      <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 mb-2" />
                      <h3 className="font-bold text-sm sm:text-base text-purple-900">{GLOBAL_AGRI_LEADERS.length} {t.countries}</h3>
                      <p className="text-xs sm:text-sm text-purple-700">{t.globalCoverage}</p>
                    </div>
                  </div>
                </div>
                <AgriMap onLocationSelect={handleLocationSelect} />
                <WeatherWidget lat={selectedLocation.lat} lon={selectedLocation.lon} />
                <CropYieldChart />
              </div>
            )}

            {activeTab === 'soil' && <SoilAnalysis />}
            {activeTab === 'crops' && <CropCatalog />}
            {activeTab === 'pesticides' && <PesticideTable />}
            {activeTab === 'global' && <GlobalComparison />}
            {activeTab === 'matcher' && <PesticideMatcher />}
            {activeTab === 'insights' && <PremiumInsights />}
            {activeTab === 'live-data' && <LiveDataStream />}
            {activeTab === 'analytics' && <AnalyticsDashboard />}
            {activeTab === 'supply-chain' && <SupplyChainTracker />}
            {activeTab === 'esg' && <ESGDashboard />}
            {activeTab === 'big-data' && <BigDataDashboard />}
            {activeTab === 'roadmap' && <Roadmap />}
            {activeTab === 'investor-deck' && <InvestorDeck />}
            {activeTab === 'api-docs' && <ApiDocumentation />}
            {activeTab === 'advanced-api' && <AdvancedApiDocs />}
            {activeTab === 'marketplace' && <AgriMarketplace />}
            {activeTab === 'commodity-pricing' && <LiveCommodityPricing />}
            {activeTab === 'privacy' && <PrivacyPolicy />}
            {activeTab === 'terms' && <TermsOfService />}
            {activeTab === 'contact' && <ContactPage />}
            {activeTab === 'drones' && <DroneManagement />}
            {activeTab === 'olive' && <OliveCultivation />}
            {activeTab === 'about' && <AboutProject lang={language} />}
          </div>
        </main>
      </div>

      {/* Premium Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 mt-12 text-white border-t-4 border-green-600">
        {/* Main Footer Content */}
        <div className="max-w-full px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-green-500 to-green-700 p-3 rounded-xl shadow-lg">
                  <Sprout className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Lydian AgriTech
                  </h3>
                  <p className="text-xs text-gray-300">Agricultural Intelligence</p>
                </div>
              </div>
              <p className="text-sm text-gray-200 mb-4 leading-relaxed">
                World's most comprehensive agricultural intelligence platform powered by real-time data from USDA, NASA, EPA, and 18+ global sources. Transforming agriculture through blockchain transparency, ESG metrics, and big data analytics.
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-green-900/30 px-3 py-2 rounded-lg border border-green-700/50">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                  <span className="text-xs font-semibold text-green-400">Live Streaming</span>
                </div>
                <div className="bg-yellow-900/30 px-3 py-2 rounded-lg border border-yellow-700/50">
                  <span className="text-xs font-semibold text-yellow-400">AAA ESG Rating</span>
                </div>
              </div>
            </div>

            {/* Platform Features */}
            <div>
              <h3 className="font-bold text-white mb-4 text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-green-400" />
                Platform Features
              </h3>
              <ul className="text-sm text-gray-200 space-y-2">
                <li onClick={() => setActiveTab('crops')} className="hover:text-green-400 transition-colors cursor-pointer">→ 30+ Crop Database</li>
                <li onClick={() => setActiveTab('pesticides')} className="hover:text-green-400 transition-colors cursor-pointer">→ 20+ Pesticide Solutions</li>
                <li onClick={() => setActiveTab('supply-chain')} className="hover:text-green-400 transition-colors cursor-pointer">→ Blockchain Supply Chain</li>
                <li onClick={() => setActiveTab('esg')} className="hover:text-green-400 transition-colors cursor-pointer">→ Carbon Credit Marketplace</li>
                <li onClick={() => setActiveTab('analytics')} className="hover:text-green-400 transition-colors cursor-pointer">→ Real-time Analytics</li>
                <li onClick={() => setActiveTab('global')} className="hover:text-green-400 transition-colors cursor-pointer">→ Global Insights (8 Countries)</li>
              </ul>
            </div>

            {/* Data Sources */}
            <div>
              <h3 className="font-bold text-white mb-4 text-base flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-400" />
                Data Sources
              </h3>
              <ul className="text-sm text-gray-200 space-y-2">
                <li onClick={() => setActiveTab('big-data')} className="hover:text-blue-400 transition-colors cursor-pointer">→ USDA NASS QuickStats</li>
                <li onClick={() => setActiveTab('big-data')} className="hover:text-blue-400 transition-colors cursor-pointer">→ NASA POWER Weather</li>
                <li onClick={() => setActiveTab('big-data')} className="hover:text-blue-400 transition-colors cursor-pointer">→ EPA PPLS Database</li>
                <li onClick={() => setActiveTab('big-data')} className="hover:text-blue-400 transition-colors cursor-pointer">→ Sentinel-2 Satellite</li>
                <li onClick={() => setActiveTab('big-data')} className="hover:text-blue-400 transition-colors cursor-pointer">→ OpenWeather Agro API</li>
                <li onClick={() => setActiveTab('big-data')} className="hover:text-blue-400 transition-colors cursor-pointer">→ SoilGrids REST API</li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-bold text-white mb-4 text-base flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-yellow-400" />
                Resources
              </h3>
              <ul className="text-sm text-gray-200 space-y-2">
                <li onClick={() => setActiveTab('api-docs')} className="hover:text-yellow-400 transition-colors cursor-pointer">→ API Documentation</li>
                <li onClick={() => setActiveTab('investor-deck')} className="hover:text-yellow-400 transition-colors cursor-pointer">→ Investor Deck</li>
                <li onClick={() => setActiveTab('roadmap')} className="hover:text-yellow-400 transition-colors cursor-pointer">→ Product Roadmap</li>
                <li onClick={() => setActiveTab('esg')} className="hover:text-yellow-400 transition-colors cursor-pointer">→ ESG Report 2025</li>
                <li onClick={() => setActiveTab('about')} className="hover:text-yellow-400 transition-colors cursor-pointer">→ Technical Blog</li>
                <li onClick={() => setActiveTab('supply-chain')} className="hover:text-yellow-400 transition-colors cursor-pointer">→ Case Studies</li>
              </ul>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-gradient-to-r from-green-900/50 via-blue-900/50 to-yellow-900/50 rounded-xl p-6 mb-8 border border-green-600/70">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { label: 'Data Records', value: '2.8M+', icon: Database },
                { label: 'API Sources', value: '18+', icon: Globe },
                { label: 'Countries', value: '8', icon: Globe },
                { label: 'Uptime', value: '99.9%', icon: CheckCircle },
                { label: 'Response Time', value: '<100ms', icon: Zap },
                { label: 'ESG Score', value: 'AAA', icon: Award },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <stat.icon className="w-3 h-3 text-gray-300" />
                    <div className="text-xs text-gray-300">{stat.label}</div>
                  </div>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-700">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-200">
              <p className="text-center sm:text-left">© 2025 Lydian AgriTech</p>
              <span className="hidden sm:inline text-gray-600">•</span>
              <a href="https://tarim.ailydian.com" className="text-green-400 hover:text-green-300 transition-colors font-semibold">
                tarim.ailydian.com
              </a>
            </div>

            {/* Social & Links */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <button onClick={() => setActiveTab('privacy')} className="text-gray-200 hover:text-white transition-colors">
                  <span className="text-xs">Privacy Policy</span>
                </button>
                <span className="text-gray-600">•</span>
                <button onClick={() => setActiveTab('terms')} className="text-gray-200 hover:text-white transition-colors">
                  <span className="text-xs">Terms of Service</span>
                </button>
                <span className="text-gray-600">•</span>
                <button onClick={() => setActiveTab('contact')} className="text-gray-200 hover:text-white transition-colors">
                  <span className="text-xs">Contact</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Bar */}
        <div className="h-1 bg-gradient-to-r from-green-500 via-blue-500 to-yellow-500"></div>
      </footer>
    </div>
  );
}
