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
import { LydianAgriLogoWithText } from '@/components/LydianAgriLogo';
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
  const [sidebarOpen, setSidebarOpen] = useState(false); // Start closed on mobile
  const [language, setLanguage] = useState<Language>('tr');
  const [showDevBanner, setShowDevBanner] = useState(false);

  useEffect(() => {
    // Detect browser language on mount
    const detected = detectBrowserLanguage();
    setLanguage(detected);

    // Open sidebar on desktop
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
    <div className="min-h-screen bg-gradient-to-br from-agri-50 via-sky-50 to-harvest-50">
      {/* Development Banner */}
      {showDevBanner && (
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="font-bold text-xs sm:text-base">{t.devBannerTitle}</span>
              <span className="mx-1 sm:mx-2 hidden sm:inline">•</span>
              <span className="text-xs sm:text-sm block sm:inline mt-0.5 sm:mt-0">{t.devBannerMessage}</span>
            </div>
          </div>
          <button
            onClick={() => setShowDevBanner(false)}
            className="p-1 hover:bg-neon-200/20 rounded transition-colors flex-shrink-0"
            aria-label="Close banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <header className="bg-neon-100 shadow-agri-lg border-b-4 border-agri-500 sticky top-0 z-50 backdrop-blur-sm bg-neon-100/95">
        <div className="max-w-full px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <circle cx="100" cy="100" r="95" fill="url(#earthGradient)" />
                  <g transform="translate(100, 40)">
                    <path d="M0 0 L0 60" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                    <ellipse cx="-8" cy="15" rx="6" ry="10" fill="#fff" opacity="0.9" />
                    <ellipse cx="-10" cy="30" rx="6" ry="10" fill="#fff" opacity="0.9" />
                    <ellipse cx="-8" cy="45" rx="6" ry="10" fill="#fff" opacity="0.9" />
                    <ellipse cx="8" cy="15" rx="6" ry="10" fill="#fff" opacity="0.9" />
                    <ellipse cx="10" cy="30" rx="6" ry="10" fill="#fff" opacity="0.9" />
                    <ellipse cx="8" cy="45" rx="6" ry="10" fill="#fff" opacity="0.9" />
                  </g>
                  <g transform="translate(100, 110)">
                    <path d="M-5 0 Q-30 -10 -35 -25 Q-30 -15 -5 -5 Z" fill="url(#leafGradient)" opacity="0.95" />
                    <path d="M5 0 Q30 -10 35 -25 Q30 -15 5 -5 Z" fill="url(#leafGradient)" opacity="0.95" />
                  </g>
                  <path d="M30 140 Q50 145 70 140 T110 140 T150 140 T170 140" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
                  <circle cx="60" cy="100" r="3" fill="#fff" opacity="0.6" />
                  <circle cx="140" cy="100" r="3" fill="#fff" opacity="0.6" />
                  <circle cx="75" cy="85" r="2" fill="#fff" opacity="0.5" />
                  <circle cx="125" cy="85" r="2" fill="#fff" opacity="0.5" />
                  <defs>
                    <linearGradient id="earthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="50%" stopColor="#16a34a" />
                      <stop offset="100%" stopColor="#15803d" />
                    </linearGradient>
                    <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-agri-800 tracking-tight">
                Lydian
              </h1>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
              {/* Drone Icon with Animation */}
              <button
                onClick={() => setActiveTab('drones')}
                className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-agri-600 to-forest-600 text-white font-bold px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:from-agri-700 hover:to-forest-700 transition-all shadow-lg hover:shadow-xl group relative overflow-hidden"
                title={language === 'tr' ? 'Drone Yönetimi' : 'Drone Management'}
              >
                <div className="relative">
                  <Plane className="w-4 sm:w-5 h-4 sm:h-5 animate-bounce group-hover:animate-pulse text-white" />
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-300 border-2 border-white rounded-full animate-ping shadow-lg" />
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-400 border-2 border-white rounded-full shadow-lg" />
                </div>
                <span className="text-xs sm:text-sm font-bold hidden xs:inline">{language === 'tr' ? 'Drone' : 'Drone'}</span>
              </button>

              {/* Dashboard Link */}
              <a
                href="/tarim-dashboard"
                className="flex items-center gap-1 sm:gap-2 bg-neon-50 border-2 border-agri-600 text-agri-700 font-bold px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-agri-50 transition-all shadow-md"
              >
                <LayoutDashboard className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                <span className="text-[10px] sm:text-xs hidden xs:inline">Dashboard</span>
              </a>

              {/* Language Switcher */}
              <div className="flex items-center gap-0.5 sm:gap-1 bg-earth-50 rounded-lg p-0.5 sm:p-1 border border-earth-200">
                <button
                  onClick={() => setLanguage('tr')}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs font-semibold transition-all ${
                    language === 'tr'
                      ? 'bg-gradient-agri text-white shadow-agri'
                      : 'text-earth-600 hover:bg-earth-100'
                  }`}
                >
                  🇹🇷
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs font-semibold transition-all ${
                    language === 'en'
                      ? 'bg-gradient-agri text-white shadow-agri'
                      : 'text-earth-600 hover:bg-earth-100'
                  }`}
                >
                  🇬🇧
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-agri-50 to-forest-50 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-agri-200">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-agri-500 rounded-full animate-pulse shadow-agri"></div>
                <span className="text-xs font-bold text-agri-700 hidden md:inline">{t.liveStatus}</span>
              </div>
              <div className="hidden xl:flex items-center gap-2 bg-sky-50 px-3 py-2 rounded-lg border border-sky-200">
                <Database className="w-3 h-3 text-sky-700" />
                <span className="text-xs font-semibold text-sky-900">{DATA_SOURCES.length} {t.dataSources}</span>
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 bg-gradient-to-br from-agri-500 to-forest-600 hover:from-agri-600 hover:to-forest-700 rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-95 relative group"
                aria-label="Toggle menu"
              >
                {sidebarOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                ) : (
                  <div className="relative">
                    <Sprout className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:rotate-12 transition-transform" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar Navigation */}
        <aside className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          fixed lg:sticky
          top-0 lg:top-[88px]
          left-0
          w-64 sm:w-72 lg:w-64
          h-screen lg:h-[calc(100vh-88px)]
          bg-neon-100
          shadow-2xl lg:shadow-lg
          z-50 lg:z-auto
          transition-transform duration-300 ease-in-out
          overflow-y-auto
          scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
        `}>
          <div className="min-h-full pb-6">
            <nav className="p-4 space-y-1">
              {/* Core Platform */}
              <div className="mb-4">
                <div className="px-3 mb-2">
                  <h3 className="text-xs font-bold text-agri-700 uppercase tracking-wider">
                    {language === 'tr' ? 'Ana Platform' : 'Core Platform'}
                  </h3>
                </div>
                {tabs.filter(tab => tab.section === 'core').map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveTab(key);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                      activeTab === key
                        ? 'bg-gradient-to-r from-agri-600 to-forest-600 text-white shadow-lg shadow-agri-500/50'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${activeTab === key ? 'text-white' : 'text-agri-700'}`} />
                    <span className={`font-bold text-sm ${activeTab === key ? 'text-white' : 'text-gray-800'}`}>{label}</span>
                  </button>
                ))}
              </div>

              {/* Agriculture Tools */}
              <div className="mb-4">
                <div className="px-3 mb-2">
                  <h3 className="text-xs font-bold text-forest-700 uppercase tracking-wider">
                    {language === 'tr' ? 'Tarım Araçları' : 'Agriculture Tools'}
                  </h3>
                </div>
                {tabs.filter(tab => tab.section === 'agri').map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveTab(key);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                      activeTab === key
                        ? 'bg-gradient-to-r from-forest-600 to-agri-600 text-white shadow-agri'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${activeTab === key ? 'text-white' : 'text-earth-700'}`} />
                    <span className={`font-semibold text-xs ${activeTab === key ? 'text-white' : 'text-earth-800'}`}>{label}</span>
                  </button>
                ))}
              </div>

              {/* Enterprise */}
              <div className="mb-4">
                <div className="px-3 mb-2">
                  <h3 className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                    {language === 'tr' ? 'Kurumsal' : 'Enterprise'}
                  </h3>
                </div>
                {tabs.filter(tab => tab.section === 'enterprise').map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveTab(key);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                      activeTab === key
                        ? 'bg-gradient-to-r from-sky-600 to-sky-700 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${activeTab === key ? 'text-white' : 'text-earth-700'}`} />
                    <span className={`font-semibold text-xs ${activeTab === key ? 'text-white' : 'text-earth-800'}`}>{label}</span>
                  </button>
                ))}
              </div>

              {/* E-Commerce & Marketplace */}
              <div className="mb-4">
                <div className="px-3 mb-2">
                  <h3 className="text-xs font-bold text-harvest-700 uppercase tracking-wider">
                    {language === 'tr' ? 'E-Ticaret' : 'E-Commerce'}
                  </h3>
                </div>
                {tabs.filter(tab => tab.section === 'ecommerce').map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveTab(key);
                      setSidebarOpen(false); // Close sidebar on mobile after selection
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                      activeTab === key
                        ? 'bg-neon-50 border-2 border-gray-900 shadow-lg'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${activeTab === key ? 'text-gray-900' : 'text-earth-700'}`} />
                    <span className={`font-semibold text-xs ${activeTab === key ? 'text-gray-900' : 'text-earth-800'}`}>{label}</span>
                  </button>
                ))}
              </div>

              {/* Investor */}
              <div className="mb-4">
                <div className="px-3 mb-2">
                  <h3 className="text-xs font-bold text-purple-600 uppercase tracking-wider flex items-center gap-2">
                    <TrendingUp className="w-3 h-3" />
                    {language === 'tr' ? 'Yatırımcı' : 'Investor'}
                  </h3>
                </div>
                {tabs.filter(tab => tab.section === 'investor').map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveTab(key);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                      activeTab === key
                        ? key === 'investor-deck'
                          ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 text-white shadow-lg shadow-purple-500/50'
                          : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${activeTab === key ? 'text-white' : 'text-purple-700'}`} />
                    <span className={`font-semibold text-xs ${activeTab === key ? 'text-white' : 'text-gray-800'}`}>{label}</span>
                    {key === 'investor-deck' && (
                      <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full ${
                        activeTab === key ? 'bg-neon-50/20 text-white' : 'bg-purple-100 text-purple-700'
                      }`}>
                        PRO
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Info & Legal */}
              <div className="mb-2">
                <div className="px-3 mb-2">
                  <h3 className="text-xs font-bold text-earth-600 uppercase tracking-wider">
                    {language === 'tr' ? 'Bilgi & Yasal' : 'Info & Legal'}
                  </h3>
                </div>
                {tabs.filter(tab => tab.section === 'info').map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveTab(key);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                      activeTab === key
                        ? 'bg-gradient-earth text-white shadow-earth'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${activeTab === key ? 'text-white' : 'text-earth-700'}`} />
                    <span className={`font-semibold text-xs ${activeTab === key ? 'text-white' : 'text-earth-800'}`}>{label}</span>
                  </button>
                ))}
              </div>
            </nav>

            <div className="px-4 mt-6 space-y-4">
              {/* Platform Stats */}
              <div className="bg-gradient-to-br from-agri-50 to-forest-50 rounded-lg p-4 border border-agri-200">
                <h3 className="font-semibold text-agri-900 mb-3 text-sm">{t.platformStatistics}</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-agri-700">{t.crops}:</span>
                    <span className="font-bold text-agri-900">{CROPS_DATABASE.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-forest-700">{t.pesticides}:</span>
                    <span className="font-bold text-forest-900">{PESTICIDES_DATABASE.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-agri-700">{t.dataSources}:</span>
                    <span className="font-bold text-agri-900">{DATA_SOURCES.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-forest-700">{t.countries}:</span>
                    <span className="font-bold text-forest-900">{GLOBAL_AGRI_LEADERS.length}</span>
                  </div>
                </div>
              </div>

              {/* Data Sources */}
              <div className="bg-gradient-to-br from-sky-50 to-sky-100 rounded-lg p-4 border border-sky-200">
                <h3 className="font-semibold text-sky-900 mb-3 text-sm">{t.liveDataSources}</h3>
                <ul className="space-y-1.5 text-xs text-sky-800">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-sky-600 rounded-full"></span>
                    <span>USDA NASS API</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-sky-600 rounded-full"></span>
                    <span>EPA PPLS Database</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-sky-600 rounded-full"></span>
                    <span>OpenWeather Agro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-sky-600 rounded-full"></span>
                    <span>NASA MODIS/SMAP</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-sky-600 rounded-full"></span>
                    <span>Sentinel-2 Satellite</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-sky-600 rounded-full"></span>
                    <span>SSURGO Soil Data</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-sky-600 rounded-full"></span>
                    <span>FAO FAOSTAT</span>
                  </li>
                </ul>
              </div>

              {/* Global Leaders */}
              <div className="bg-gradient-to-br from-harvest-50 to-sunset-50 rounded-lg p-4 border border-harvest-200">
                <h3 className="font-semibold text-harvest-900 mb-3 text-sm">{t.agriTechLeaders}</h3>
                <ul className="space-y-1.5 text-xs text-harvest-800">
                  <li className="flex items-center gap-2">
                    <span className="text-base">🇳🇱</span>
                    <span>{language === 'tr' ? 'Hollanda' : 'Netherlands'} (#1)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-base">🇮🇱</span>
                    <span>{language === 'tr' ? 'İsrail' : 'Israel'} (#2)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-base">🇯🇵</span>
                    <span>{language === 'tr' ? 'Japonya' : 'Japan'} (#3)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-base">🇺🇸</span>
                    <span>ABD (#4)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-3 sm:p-6 overflow-x-hidden">
          {activeTab === 'overview' && (
            <div className="space-y-4 sm:space-y-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-gradient-to-br from-neon-50 to-agri-50 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-agri-lg border-l-4 border-agri-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs sm:text-sm text-earth-600 mb-1">Total Crops</div>
                      <div className="text-2xl sm:text-3xl font-bold text-agri-900">{CROPS_DATABASE.length}</div>
                    </div>
                    <Sprout className="w-10 h-10 sm:w-12 sm:h-12 text-agri-500 opacity-20" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-neon-50 to-forest-50 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-agri-lg border-l-4 border-forest-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs sm:text-sm text-earth-600 mb-1">Pesticides</div>
                      <div className="text-2xl sm:text-3xl font-bold text-forest-900">{PESTICIDES_DATABASE.length}</div>
                    </div>
                    <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-forest-500 opacity-20" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-neon-50 to-sky-50 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg border-l-4 border-sky-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs sm:text-sm text-earth-600 mb-1">Data Sources</div>
                      <div className="text-2xl sm:text-3xl font-bold text-sky-900">{DATA_SOURCES.length}</div>
                    </div>
                    <Database className="w-10 h-10 sm:w-12 sm:h-12 text-sky-500 opacity-20" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-neon-50 to-harvest-50 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg border-l-4 border-harvest-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs sm:text-sm text-earth-600 mb-1">Countries</div>
                      <div className="text-2xl sm:text-3xl font-bold text-harvest-900">{GLOBAL_AGRI_LEADERS.length}</div>
                    </div>
                    <Globe className="w-10 h-10 sm:w-12 sm:h-12 text-harvest-500 opacity-20" />
                  </div>
                </div>
              </div>

              {/* Map and Weather Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="lg:col-span-2 h-[300px] sm:h-[400px] lg:h-[500px]">
                  <AgriMap onLocationSelect={handleLocationSelect} />
                </div>
                <div className="h-[400px] sm:h-[400px] lg:h-[500px] overflow-auto">
                  <WeatherWidget lat={selectedLocation.lat} lon={selectedLocation.lon} />
                </div>
              </div>

              {/* Yield Chart */}
              <div className="overflow-x-auto -mx-3 sm:mx-0">
                <div className="min-w-[600px] sm:min-w-0">
                  <CropYieldChart />
                </div>
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

          {activeTab === 'supply-chain' && (
            <div>
              <SupplyChainTracker />
            </div>
          )}

          {activeTab === 'esg' && (
            <div>
              <ESGDashboard />
            </div>
          )}

          {activeTab === 'big-data' && (
            <div>
              <BigDataDashboard />
            </div>
          )}

          {activeTab === 'marketplace' && (
            <div>
              <AgriMarketplace language={language} />
            </div>
          )}

          {activeTab === 'drones' && (
            <div>
              <DroneManagement language={language} />
            </div>
          )}

          {activeTab === 'olive' && (
            <div>
              <OliveCultivation language={language} />
            </div>
          )}

          {activeTab === 'commodity-pricing' && (
            <div>
              <LiveCommodityPricing />
            </div>
          )}

          {activeTab === 'advanced-api' && (
            <div>
              <AdvancedApiDocs />
            </div>
          )}

          {activeTab === 'roadmap' && (
            <div>
              <Roadmap />
            </div>
          )}

          {activeTab === 'investor-deck' && (
            <div>
              <InvestorDeck />
            </div>
          )}

          {activeTab === 'about' && (
            <div>
              <AboutProject lang={language} />
            </div>
          )}

          {activeTab === 'api-docs' && (
            <div>
              <ApiDocumentation />
            </div>
          )}

          {activeTab === 'privacy' && (
            <div>
              <PrivacyPolicy />
            </div>
          )}

          {activeTab === 'terms' && (
            <div>
              <TermsOfService />
            </div>
          )}

          {activeTab === 'contact' && (
            <div>
              <ContactPage />
            </div>
          )}
        </main>
      </div>

      {/* Premium Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-earth-900 to-gray-950 mt-8 sm:mt-12 text-white border-t-4 border-agri-600" style={{backgroundColor: '#1a1410'}}>
        {/* Main Footer Content */}
        <div className="max-w-full px-3 sm:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 mb-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-agri p-3 rounded-xl shadow-agri-lg">
                  <Sprout className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display bg-gradient-to-r from-agri-400 to-harvest-400 bg-clip-text text-transparent">
                    Lydian AgriTech Platform Pro
                  </h3>
                  <p className="text-xs text-earth-300">Agricultural Intelligence</p>
                </div>
              </div>
              <p className="text-sm text-earth-200 mb-4 leading-relaxed">
                World's most comprehensive agricultural intelligence platform powered by real-time data from USDA, NASA, EPA, and 18+ global sources. Transforming agriculture through blockchain transparency, ESG metrics, and big data analytics.
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-agri-900/30 px-3 py-2 rounded-lg border border-agri-700/50">
                  <div className="w-2 h-2 bg-agri-500 rounded-full animate-pulse shadow-agri"></div>
                  <span className="text-xs font-semibold text-agri-400">Live Streaming</span>
                </div>
                <div className="bg-harvest-900/30 px-3 py-2 rounded-lg border border-harvest-700/50">
                  <span className="text-xs font-semibold text-harvest-400">AAA ESG Rating</span>
                </div>
              </div>
            </div>

            {/* Platform Features */}
            <div>
              <h3 className="font-bold text-white mb-4 text-sm sm:text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-agri-400" />
                Platform Features
              </h3>
              <ul className="text-xs sm:text-sm text-earth-200 space-y-2">
                <li onClick={() => setActiveTab('crops')} className="hover:text-agri-400 transition-colors cursor-pointer">→ 30+ Crop Database</li>
                <li onClick={() => setActiveTab('pesticides')} className="hover:text-agri-400 transition-colors cursor-pointer">→ 20+ Pesticide Solutions</li>
                <li onClick={() => setActiveTab('supply-chain')} className="hover:text-agri-400 transition-colors cursor-pointer">→ Blockchain Supply Chain</li>
                <li onClick={() => setActiveTab('esg')} className="hover:text-agri-400 transition-colors cursor-pointer">→ Carbon Credit Marketplace</li>
                <li onClick={() => setActiveTab('analytics')} className="hover:text-agri-400 transition-colors cursor-pointer">→ Real-time Analytics</li>
                <li onClick={() => setActiveTab('global')} className="hover:text-agri-400 transition-colors cursor-pointer">→ Global Insights (8 Countries)</li>
              </ul>
            </div>

            {/* Data Sources */}
            <div>
              <h3 className="font-bold text-white mb-4 text-sm sm:text-base flex items-center gap-2">
                <Database className="w-4 h-4 text-sky-400" />
                Data Sources
              </h3>
              <ul className="text-xs sm:text-sm text-earth-200 space-y-2">
                <li onClick={() => setActiveTab('big-data')} className="hover:text-sky-400 transition-colors cursor-pointer">→ USDA NASS QuickStats</li>
                <li onClick={() => setActiveTab('big-data')} className="hover:text-sky-400 transition-colors cursor-pointer">→ NASA POWER Weather</li>
                <li onClick={() => setActiveTab('big-data')} className="hover:text-sky-400 transition-colors cursor-pointer">→ EPA PPLS Database</li>
                <li onClick={() => setActiveTab('big-data')} className="hover:text-sky-400 transition-colors cursor-pointer">→ Sentinel-2 Satellite</li>
                <li onClick={() => setActiveTab('big-data')} className="hover:text-sky-400 transition-colors cursor-pointer">→ OpenWeather Agro API</li>
                <li onClick={() => setActiveTab('big-data')} className="hover:text-sky-400 transition-colors cursor-pointer">→ SoilGrids REST API</li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-bold text-white mb-4 text-sm sm:text-base flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-harvest-400" />
                Resources
              </h3>
              <ul className="text-xs sm:text-sm text-earth-200 space-y-2">
                <li onClick={() => setActiveTab('api-docs')} className="hover:text-harvest-400 transition-colors cursor-pointer">→ API Documentation</li>
                <li onClick={() => setActiveTab('investor-deck')} className="hover:text-harvest-400 transition-colors cursor-pointer">→ Investor Deck</li>
                <li onClick={() => setActiveTab('roadmap')} className="hover:text-harvest-400 transition-colors cursor-pointer">→ Product Roadmap</li>
                <li onClick={() => setActiveTab('esg')} className="hover:text-harvest-400 transition-colors cursor-pointer">→ ESG Report 2025</li>
                <li onClick={() => setActiveTab('about')} className="hover:text-harvest-400 transition-colors cursor-pointer">→ Technical Blog</li>
                <li onClick={() => setActiveTab('supply-chain')} className="hover:text-harvest-400 transition-colors cursor-pointer">→ Case Studies</li>
              </ul>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-gradient-to-r from-agri-900/50 via-sky-900/50 to-harvest-900/50 rounded-xl p-6 mb-8 border border-agri-600/70" style={{backgroundColor: 'rgba(26, 20, 16, 0.5)'}}>
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
                    <stat.icon className="w-3 h-3 text-earth-300" />
                    <div className="text-xs text-earth-300">{stat.label}</div>
                  </div>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-8 border-t border-earth-700">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-3 text-xs sm:text-sm text-earth-200">
              <p className="text-center sm:text-left">© 2025 Lydian AgriTech Platform Pro</p>
              <span className="hidden sm:inline text-earth-600">•</span>
              <p className="flex items-center gap-1">
                <span>Developed by</span>
                <span className="font-bold font-display bg-gradient-to-r from-harvest-400 to-agri-400 bg-clip-text text-transparent">
                  Lydian
                </span>
              </p>
              <span className="hidden sm:inline text-earth-600">•</span>
              <a href="https://tarim.ailydian.com" className="text-agri-400 hover:text-agri-300 transition-colors">
                tarim.ailydian.com
              </a>
            </div>

            {/* Social & Links */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <button onClick={() => setActiveTab('privacy')} className="text-earth-200 hover:text-white transition-colors">
                  <span className="text-xs">Privacy Policy</span>
                </button>
                <span className="text-earth-600">•</span>
                <button onClick={() => setActiveTab('terms')} className="text-earth-200 hover:text-white transition-colors">
                  <span className="text-xs">Terms of Service</span>
                </button>
                <span className="text-earth-600">•</span>
                <button onClick={() => setActiveTab('contact')} className="text-earth-200 hover:text-white transition-colors">
                  <span className="text-xs">Contact</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Bar */}
        <div className="h-1 bg-gradient-to-r from-agri-500 via-sky-500 to-harvest-500"></div>
      </footer>
    </div>
  );
}
