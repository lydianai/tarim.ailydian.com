'use client';

import { useState, useEffect } from 'react';
import ProductTour from '@/components/ProductTour';
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
import {
  Sprout, Globe, Menu, X, Database, Shield, Sparkles, BookOpen, AlertCircle, CheckCircle,
  LayoutDashboard, Plane, BarChart3, LineChart, Activity, Leaf, TreePine, Package, Award,
  ShoppingCart, DollarSign, Code, Rocket, TrendingUp, Scale, MessageSquare, Zap
} from 'lucide-react';
import { CROPS_DATABASE } from '@/lib/crops-database';
import { PESTICIDES_DATABASE } from '@/lib/pesticides-database';
import { DATA_SOURCES } from '@/lib/bigdata-collector';
import { GLOBAL_AGRI_LEADERS } from '@/lib/global-agri-insights';
import type { Language } from '@/lib/i18n';
import { detectBrowserLanguage, getTranslation } from '@/lib/i18n';

type TabType = 'overview' | 'soil' | 'pesticides' | 'crops' | 'global' | 'matcher' | 'insights' | 'live-data' | 'analytics' | 'supply-chain' | 'esg' | 'big-data' | 'roadmap' | 'investor-deck' | 'api-docs' | 'advanced-api' | 'marketplace' | 'commodity-pricing' | 'privacy' | 'terms' | 'contact' | 'about' | 'drones' | 'olive';

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState({ lat: 41.8781, lon: -93.0977 });
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('tr');
  const [showDevBanner, setShowDevBanner] = useState(true);

  useEffect(() => {
    // Detect browser language on mount
    const detected = detectBrowserLanguage();
    setLanguage(detected);
  }, []);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [sidebarOpen]);

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
    { key: 'olive', label: t.oliveCultivation, icon: TreePine, section: 'agri' },
    { key: 'matcher', label: t.pesticideMatcher, icon: Shield, section: 'agri' },
    { key: 'drones', label: t.droneManagement, icon: Plane, section: 'agri' },
    { key: 'pesticides', label: t.pesticidesDB, icon: Database, section: 'agri' },
    { key: 'global', label: t.globalInsights, icon: Globe, section: 'agri' },

    // Enterprise
    { key: 'supply-chain', label: t.supplyChain, icon: Package, section: 'enterprise' },
    { key: 'esg', label: t.esgMetrics, icon: Award, section: 'enterprise' },
    { key: 'big-data', label: t.bigData, icon: Database, section: 'enterprise' },

    // E-Commerce & Marketplace
    { key: 'marketplace', label: t.b2bMarketplace, icon: ShoppingCart, section: 'ecommerce' },
    { key: 'commodity-pricing', label: t.livePricing, icon: DollarSign, section: 'ecommerce' },
    { key: 'advanced-api', label: t.apiPlatform, icon: Code, section: 'ecommerce' },

    // Investor & Business
    { key: 'roadmap', label: t.roadmap, icon: Rocket, section: 'investor' },
    { key: 'investor-deck', label: t.investorDeck, icon: TrendingUp, section: 'investor' },

    // Info & Legal
    { key: 'about', label: t.aboutProject, icon: BookOpen, section: 'info' },
    { key: 'api-docs', label: t.apiDocumentation, icon: Code, section: 'info' },
    { key: 'privacy', label: t.privacyPolicy, icon: Shield, section: 'info' },
    { key: 'terms', label: t.termsOfService, icon: Scale, section: 'info' },
    { key: 'contact', label: t.contact, icon: MessageSquare, section: 'info' },
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

      {/* Header - Premium Design */}
      <header className="bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b-2 border-white/10 sticky top-0 z-[100]" data-tour="main-header">
        <div className="max-w-full px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Brand */}
            <div className="flex items-center gap-2 sm:gap-3" data-tour="logo">
              {/* Mobile Menu Button - Left Side */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl active:scale-95"
                aria-label="Toggle menu"
                data-tour="menu-toggle"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 p-2 sm:p-3 rounded-xl shadow-lg">
                <Sprout className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg md:text-2xl font-bold text-white" style={{ textShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(147, 51, 234, 0.6)' }}>
                  Lydian AgriTech
                </h1>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-300 hidden sm:block" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}>{t.headerSubtitle}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Drone Button - Now Visible on Mobile */}
              <button
                onClick={() => setActiveTab('drones')}
                className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-bold px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:from-blue-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
                data-tour="drone-quick-access"
              >
                <Plane className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[10px] sm:text-xs md:text-sm">Drone</span>
              </button>

              {/* Dashboard Link - Hidden on small mobile */}
              <a
                href="/tarim-dashboard"
                className="hidden sm:flex items-center gap-1 sm:gap-2 bg-white/10 backdrop-blur-sm border-2 border-blue-400/50 text-blue-300 font-bold px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-white/20 transition-all shadow-md hover:shadow-lg active:scale-95"
                data-tour="dashboard-link"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="text-xs">Dashboard</span>
              </a>

              {/* Language Switcher */}
              <div className="flex items-center gap-0.5 bg-white/10 backdrop-blur-sm rounded-lg p-0.5 border border-white/20" data-tour="language-switcher">
                <button
                  onClick={() => setLanguage('tr')}
                  className={`px-2 py-1 rounded-md text-xs font-semibold transition-all ${
                    language === 'tr'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-700 text-white shadow-lg shadow-blue-500/50'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                  aria-label="Türkçe"
                >
                  🇹🇷
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-1 rounded-md text-xs font-semibold transition-all ${
                    language === 'en'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-700 text-white shadow-lg shadow-blue-500/50'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                  aria-label="English"
                >
                  🇬🇧
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Mobile Overlay - Premium Backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-gradient-to-br from-black/60 via-black/50 to-green-900/30 backdrop-blur-sm z-[90] lg:hidden animate-in fade-in duration-300"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          />
        )}

        {/* Premium Sidebar - Apple Vision Style */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed top-0 bottom-0 left-0 lg:static lg:translate-x-0 w-72 sm:w-80 lg:w-64 lg:h-auto
          bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900
          shadow-2xl lg:shadow-lg z-[150]
          transition-all duration-500 ease-out
          ${sidebarOpen ? 'shadow-blue-500/20' : ''}
          overflow-y-auto overflow-x-hidden
          border-r border-white/10
          pt-20 lg:pt-0 pb-4`}
        >
          <nav className="p-3 sm:p-4 space-y-1">
            {/* Close button for mobile */}
            <div className="lg:hidden flex justify-between items-center mb-4 pb-3 border-b-2 border-green-500/20">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg shadow-lg">
                  <Sprout className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-white">Menu</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Core Platform */}
            <div className="mb-4" data-tour="core-platform-section">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider px-3 mb-3 flex items-center gap-2" style={{ textShadow: '0 0 20px rgba(96, 165, 250, 1), 0 0 40px rgba(96, 165, 250, 0.5)' }}>
                <span>📊</span>
                <span>{language === 'tr' ? 'ANA PLATFORM' : 'CORE PLATFORM'}</span>
              </h3>
              {tabs.filter(tab => tab.section === 'core').map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  data-tour={`menu-${key}`}
                  onClick={() => {
                    setActiveTab(key);
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all duration-300 group ${
                    activeTab === key
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50 scale-105'
                      : 'bg-white/5 hover:bg-white/10 text-white hover:shadow-md active:scale-95 backdrop-blur-sm'
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${activeTab === key ? 'animate-pulse' : ''}`} />
                  <span className="font-semibold text-sm flex-1 text-left text-white" style={{ color: '#ffffff' }}>{label}</span>
                  {activeTab === key && <CheckCircle className="w-4 h-4" />}
                </button>
              ))}
            </div>

            {/* Agriculture Tools */}
            <div className="mb-4" data-tour="agri-tools-section">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider px-3 mb-3 flex items-center gap-2" style={{ textShadow: '0 0 20px rgba(129, 140, 248, 1), 0 0 40px rgba(129, 140, 248, 0.5)' }}>
                <span>🌱</span>
                <span>{language === 'tr' ? 'TARIM ARAÇLARI' : 'AGRICULTURE TOOLS'}</span>
              </h3>
              {tabs.filter(tab => tab.section === 'agri').map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  data-tour={`menu-${key}`}
                  onClick={() => {
                    setActiveTab(key);
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all duration-300 group ${
                    activeTab === key
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105'
                      : 'bg-white/5 hover:bg-white/10 text-white hover:shadow-md active:scale-95 backdrop-blur-sm'
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${activeTab === key ? 'animate-pulse' : ''}`} />
                  <span className="font-semibold text-sm flex-1 text-left text-white" style={{ color: '#ffffff' }}>{label}</span>
                  {activeTab === key && <CheckCircle className="w-4 h-4" />}
                </button>
              ))}
            </div>

            {/* Enterprise */}
            <div className="mb-4" data-tour="enterprise-section">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider px-3 mb-2" style={{ textShadow: '0 0 20px rgba(34, 211, 238, 1), 0 0 40px rgba(34, 211, 238, 0.5)' }}>
                {language === 'tr' ? '🏢 KURUMSAL' : '🏢 ENTERPRISE'}
              </h3>
              {tabs.filter(tab => tab.section === 'enterprise').map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  data-tour={`menu-${key}`}
                  onClick={() => {
                    setActiveTab(key);
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all duration-300 group ${
                    activeTab === key
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/50 scale-105'
                      : 'bg-white/5 hover:bg-white/10 text-white hover:shadow-md active:scale-95 backdrop-blur-sm'
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${activeTab === key ? 'animate-pulse' : ''}`} />
                  <span className="font-semibold text-sm flex-1 text-left text-white" style={{ color: '#ffffff' }}>{label}</span>
                  {activeTab === key && <CheckCircle className="w-4 h-4" />}
                </button>
              ))}
            </div>

            {/* E-Commerce */}
            <div className="mb-4" data-tour="ecommerce-section">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider px-3 mb-2" style={{ textShadow: '0 0 20px rgba(192, 132, 252, 1), 0 0 40px rgba(192, 132, 252, 0.5)' }}>
                {language === 'tr' ? '🛒 E-TİCARET' : '🛒 E-COMMERCE'}
              </h3>
              {tabs.filter(tab => tab.section === 'ecommerce').map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  data-tour={`menu-${key}`}
                  onClick={() => {
                    setActiveTab(key);
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all duration-300 group ${
                    activeTab === key
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50 scale-105'
                      : 'bg-white/5 hover:bg-white/10 text-white hover:shadow-md active:scale-95 backdrop-blur-sm'
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${activeTab === key ? 'animate-pulse' : ''}`} />
                  <span className="font-semibold text-sm flex-1 text-left text-white" style={{ color: '#ffffff' }}>{label}</span>
                  {activeTab === key && <CheckCircle className="w-4 h-4" />}
                </button>
              ))}
            </div>

            {/* Investor */}
            <div className="mb-4" data-tour="investor-section">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider px-3 mb-3 flex items-center gap-2" style={{ textShadow: '0 0 20px rgba(251, 146, 60, 1), 0 0 40px rgba(251, 146, 60, 0.5)' }}>
                <span>💼</span>
                <span>{language === 'tr' ? 'YATIRIMCI' : 'INVESTOR'}</span>
              </h3>
              {tabs.filter(tab => tab.section === 'investor').map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  data-tour={`menu-${key}`}
                  onClick={() => {
                    setActiveTab(key);
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all duration-300 group ${
                    activeTab === key
                      ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg shadow-orange-500/50 scale-105'
                      : 'bg-white/5 hover:bg-white/10 text-white hover:shadow-md active:scale-95 backdrop-blur-sm'
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${activeTab === key ? 'animate-pulse' : ''}`} />
                  <span className="font-semibold text-sm flex-1 text-left text-white" style={{ color: '#ffffff' }}>{label}</span>
                  {activeTab === key && <CheckCircle className="w-4 h-4" />}
                </button>
              ))}
            </div>

            {/* Info & Legal */}
            <div className="mb-4" data-tour="info-section">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider px-3 mb-3 flex items-center gap-2" style={{ textShadow: '0 0 20px rgba(156, 163, 175, 1), 0 0 40px rgba(156, 163, 175, 0.5)' }}>
                <span>📚</span>
                <span>{language === 'tr' ? 'BİLGİ & YASAL' : 'INFO & LEGAL'}</span>
              </h3>
              {tabs.filter(tab => tab.section === 'info').map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  data-tour={`menu-${key}`}
                  onClick={() => {
                    setActiveTab(key);
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all duration-300 group ${
                    activeTab === key
                      ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg shadow-gray-500/50 scale-105'
                      : 'bg-white/5 hover:bg-white/10 text-white hover:shadow-md active:scale-95 backdrop-blur-sm'
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${activeTab === key ? 'animate-pulse' : ''}`} />
                  <span className="font-semibold text-sm flex-1 text-left text-white" style={{ color: '#ffffff' }}>{label}</span>
                  {activeTab === key && <CheckCircle className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </nav>

          {/* Platform Stats */}
          <div className="p-4 space-y-3">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <h4 className="font-bold text-sm text-white" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>{t.platformStatus}</h4>
              </div>
              <div className="space-y-2 text-xs text-white">
                <div className="flex justify-between">
                  <span>{t.activeUsers}</span>
                  <span className="font-bold text-green-400" style={{ textShadow: '0 0 10px rgba(74, 222, 128, 0.8)' }}>2,847</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.dataPoints}</span>
                  <span className="font-bold text-green-400" style={{ textShadow: '0 0 10px rgba(74, 222, 128, 0.8)' }}>1.2M</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-4 h-4 text-blue-400" />
                <h4 className="font-bold text-sm text-white" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>{t.dataSources}</h4>
              </div>
              <p className="text-xs text-white">{DATA_SOURCES.length} <span className="text-blue-400 font-semibold" style={{ textShadow: '0 0 10px rgba(96, 165, 250, 0.8)' }}>active</span></p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4 text-purple-400" />
                <h4 className="font-bold text-sm text-white" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>{t.coverageTitle}</h4>
              </div>
              <p className="text-xs text-white">{GLOBAL_AGRI_LEADERS.length} <span className="text-purple-400 font-semibold" style={{ textShadow: '0 0 10px rgba(192, 132, 252, 0.8)' }}>{t.countries}</span></p>
            </div>
          </div>
        </aside>

        {/* Overlay - prevents main content interaction when sidebar is open on mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-[140] lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar overlay"
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto min-h-screen relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'overview' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl p-4 sm:p-6 border border-white/20">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-4" style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.6), 0 0 40px rgba(96, 165, 250, 0.4)' }}>{t.overview}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                    <div className="bg-white/5 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-green-400/30 hover:bg-white/10 transition-all">
                      <Database className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mb-2" />
                      <h3 className="font-bold text-sm sm:text-base text-white" style={{ textShadow: '0 0 10px rgba(74, 222, 128, 0.6)' }}>{CROPS_DATABASE.length} Crops</h3>
                      <p className="text-xs sm:text-sm text-white">Comprehensive Database</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-blue-400/30 hover:bg-white/10 transition-all">
                      <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mb-2" />
                      <h3 className="font-bold text-sm sm:text-base text-white" style={{ textShadow: '0 0 10px rgba(96, 165, 250, 0.6)' }}>{PESTICIDES_DATABASE.length} Pesticides</h3>
                      <p className="text-xs sm:text-sm text-white">Safety First</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-purple-400/30 hover:bg-white/10 transition-all">
                      <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 mb-2" />
                      <h3 className="font-bold text-sm sm:text-base text-white" style={{ textShadow: '0 0 10px rgba(192, 132, 252, 0.6)' }}>{GLOBAL_AGRI_LEADERS.length} {t.countries}</h3>
                      <p className="text-xs sm:text-sm text-white">Global Coverage</p>
                    </div>
                  </div>
                </div>
                <AgriMap onLocationSelect={handleLocationSelect} language={language} />
                <WeatherWidget lat={selectedLocation.lat} lon={selectedLocation.lon} language={language} />
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
              <span className="hidden sm:inline text-gray-400">•</span>
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
                <span className="text-gray-400">•</span>
                <button onClick={() => setActiveTab('terms')} className="text-gray-200 hover:text-white transition-colors">
                  <span className="text-xs">Terms of Service</span>
                </button>
                <span className="text-gray-400">•</span>
                <button onClick={() => setActiveTab('contact')} className="text-gray-200 hover:text-white transition-colors">
                  <span className="text-xs">Contact</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Bar */}
        <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      </footer>

      {/* Product Tour */}
      <ProductTour />
    </div>
  );
}
