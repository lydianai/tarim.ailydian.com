'use client';

import { useState, useEffect } from 'react';
import { Sprout, ArrowRight, CheckCircle, Rocket, Target, Clock } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import DashboardWidgets from '@/components/DashboardWidgets';

export default function LandingPage() {
  const { t } = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Agriculture & Nature Videos (Public Domain from Archive.org)
  const backgroundVideos = [
    'https://archive.org/download/FarmTractorFootage/FarmTractorFootage.mp4', // Farm tractor footage
    'https://archive.org/download/0529_Science_and_Agriculture_The_Soybean/0529_Science_and_Agriculture_The_Soybean_10_24_25_18_3mb.mp4', // Soybean farming (1939)
    'https://archive.org/download/87214-1960-industrial-equipment/87214%2B1960%2BIndustrial%2BEquipment.mp4', // John Deere equipment (1960)
    'https://archive.org/download/Agricult1955/Agricult1955.mp4', // Agricultural aviation (1955)
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-switch videos every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % backgroundVideos.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [backgroundVideos.length]);

  // Advanced Structured Data for SEO (Schema.org)
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://tarim.ailydian.com/#webapp",
        "name": "Lydian AgriTech Platform",
        "alternateName": "Lydian Agricultural Intelligence",
        "description": "AI-powered agricultural intelligence platform providing real-time data from USDA, NASA, EPA. 30+ crops, precision farming, drone integration, ESG compliance.",
        "url": "https://tarim.ailydian.com",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web Browser, iOS, Android",
        "browserRequirements": "HTML5, JavaScript, CSS3",
        "softwareVersion": "1.0.0",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "category": "Agriculture Technology",
          "seller": {
            "@type": "Organization",
            "name": "Lydian Technologies"
          }
        },
        "featureList": [
          "30+ Comprehensive Crop Database",
          "20+ EPA-Registered Pesticides Database",
          "Real-time USDA NASS Data Integration",
          "NASA Satellite Imagery & POWER Data",
          "EPA Environmental Data",
          "AI-Powered Yield Predictions",
          "Autonomous Drone Management",
          "Blockchain Supply Chain Tracking",
          "ESG Compliance Metrics",
          "B2B Agricultural Marketplace",
          "Live Weather & Soil Data",
          "Precision Agriculture Tools"
        ],
        "audience": [
          {
            "@type": "Audience",
            "audienceType": "Farmers",
            "geographicArea": {
              "@type": "Place",
              "name": "United States, Turkey, Global"
            }
          },
          {
            "@type": "Audience",
            "audienceType": "Agricultural Businesses"
          },
          {
            "@type": "Audience",
            "audienceType": "Agricultural Researchers"
          },
          {
            "@type": "Audience",
            "audienceType": "AgTech Companies"
          }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "127",
          "bestRating": "5",
          "worstRating": "1"
        },
        "provider": {
          "@type": "Organization",
          "@id": "https://tarim.ailydian.com/#organization"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://tarim.ailydian.com/#organization",
        "name": "Lydian Technologies",
        "alternateName": "Lydian AgriTech",
        "url": "https://tarim.ailydian.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://tarim.ailydian.com/apple-touch-icon.png",
          "width": 180,
          "height": 180
        },
        "description": "Leading agricultural technology company providing AI-powered farming solutions",
        "foundingDate": "2024",
        "areaServed": [
          {
            "@type": "Country",
            "name": "United States"
          },
          {
            "@type": "Country",
            "name": "Turkey"
          }
        ],
        "knowsAbout": [
          "Precision Agriculture",
          "Smart Farming",
          "Agricultural AI",
          "Crop Management",
          "Drone Technology",
          "Sustainable Farming",
          "ESG Compliance"
        ],
        "sameAs": [
          "https://twitter.com/LydianAgriTech",
          "https://linkedin.com/company/lydian-agritech",
          "https://github.com/lydian-agritech"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://tarim.ailydian.com/#website",
        "url": "https://tarim.ailydian.com",
        "name": "Lydian AgriTech",
        "description": "AI-Powered Agricultural Intelligence Platform",
        "publisher": {
          "@id": "https://tarim.ailydian.com/#organization"
        },
        "inLanguage": ["en-US", "tr-TR"],
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://tarim.ailydian.com/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://tarim.ailydian.com/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://tarim.ailydian.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Dashboard",
            "item": "https://tarim.ailydian.com/dashboard"
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Navigation - Premium Mobile-First Design */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            {/* Logo - Compact on Mobile */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="bg-gradient-to-br from-green-500 to-green-700 p-1.5 sm:p-2 rounded-lg sm:rounded-xl shadow-lg">
                <Sprout className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-sm xs:text-base sm:text-xl lg:text-2xl font-bold text-white dark:text-white whitespace-nowrap">Lydian AgriTech</h1>
                <p className="text-[9px] xs:text-[10px] sm:text-xs text-gray-300 dark:text-gray-300 hidden xs:block">Global Agricultural Intelligence</p>
              </div>
            </Link>

            {/* Actions - Responsive Sizing */}
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
              <div className="hidden xs:block">
                <LanguageSwitcher />
              </div>
              <Link
                href="/login"
                className="px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-lg transition-all text-xs sm:text-sm whitespace-nowrap"
              >
                {t('login')}
              </Link>
              <Link
                href="/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl text-xs sm:text-sm md:text-base whitespace-nowrap"
              >
                <span className="hidden xs:inline">{t('dashboard')}</span>
                <span className="xs:hidden">Go</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Video Slider Background */}
      <section className="relative pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8 min-h-[90vh] flex items-center overflow-hidden">
        {/* Video Slider Background */}
        <div className="absolute inset-0 z-0">
          {/* Multiple Videos with Fade Transition */}
          {backgroundVideos.map((videoUrl, index) => (
            <video
              key={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-2000 ${
                index === currentVideoIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDuration: '2s' }}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          ))}

          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>

          {/* Video Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {backgroundVideos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentVideoIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentVideoIndex
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Switch to video ${index + 1}`}
              />
            ))}
          </div>

          {/* Animated Particles Effect */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full mb-6 text-sm font-semibold">
            <CheckCircle className="w-4 h-4" />
            <span>{t('hero.subtitle')}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white dark:text-white mb-6 leading-tight">
            {t('hero.title')}
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 dark:text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-2xl mx-auto px-4 sm:px-0">
            <Link
              href="/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-xl transition-all shadow-2xl hover:shadow-green-500/50 active:scale-95 sm:hover:scale-105 text-base sm:text-lg whitespace-nowrap"
            >
              <span className="hidden xs:inline">{t('dashboard')}</span>
              <span className="xs:hidden">{t('goToDashboard')}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <Link
              href="/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-2 border-white/30 text-white font-bold rounded-xl transition-all active:scale-95 sm:hover:scale-105 text-base sm:text-lg text-center whitespace-nowrap"
            >
              {t('liveDemo')}
            </Link>
            <Link
              href="/login"
              className="flex-1 sm:flex-initial px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all shadow-2xl hover:shadow-blue-500/50 active:scale-95 sm:hover:scale-105 text-base sm:text-lg text-center whitespace-nowrap"
            >
              {t('login')}
            </Link>
          </div>
        </div>
      </section>

      {/* Dashboard Widgets Section */}
      <div id="features">
        <DashboardWidgets />
      </div>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
            {[
              { number: '30+', label: t('stats.cropTypes') },
              { number: '20+', label: t('stats.epaProducts') },
              { number: '18+', label: t('stats.dataSources') },
              { number: '8', label: t('stats.countries') }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">{stat.number}</div>
                <div className="text-green-100 text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Comprehensive Agricultural Intelligence Platform
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Real-time data integration from 18+ sources including USDA, NASA, EPA, and global agricultural databases
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Crop Database */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">30+ Crop Database</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Comprehensive database covering grain, vegetables, fruits, legumes, oilseeds, fiber crops, and specialty agriculture
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>✓ Growing conditions & climate data</li>
                <li>✓ Soil pH & nutrient requirements</li>
                <li>✓ Pest & disease management</li>
                <li>✓ Yield predictions & analytics</li>
              </ul>
            </div>

            {/* EPA Pesticides */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">20+ EPA Pesticides</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Complete EPA-registered pesticide database with safety data, application guidelines, and regulatory compliance
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>✓ Active ingredients & formulations</li>
                <li>✓ Safety data sheets (SDS)</li>
                <li>✓ Application rates & timing</li>
                <li>✓ Environmental impact data</li>
              </ul>
            </div>

            {/* AI-Powered Analytics */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">AI-Powered Insights</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Machine learning algorithms analyze patterns and provide actionable recommendations for optimal farming
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>✓ Predictive yield modeling</li>
                <li>✓ Disease outbreak detection</li>
                <li>✓ Resource optimization</li>
                <li>✓ Market trend analysis</li>
              </ul>
            </div>

            {/* Real-Time Data */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Live Data Streaming</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Real-time updates from weather stations, satellite imagery, soil sensors, and commodity markets
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>✓ Weather forecasts (5-day)</li>
                <li>✓ NASA satellite imagery</li>
                <li>✓ USDA market prices</li>
                <li>✓ Soil moisture data</li>
              </ul>
            </div>

            {/* Drone Management */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Drone Integration</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Advanced drone telemetry, flight planning, and aerial imagery analysis for precision agriculture
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>✓ Autonomous flight planning</li>
                <li>✓ Real-time telemetry</li>
                <li>✓ NDVI analysis</li>
                <li>✓ Field mapping</li>
              </ul>
            </div>

            {/* ESG & Sustainability */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">ESG Compliance</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Environmental, Social, and Governance metrics tracking for sustainable and responsible farming
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>✓ Carbon footprint tracking</li>
                <li>✓ Water usage optimization</li>
                <li>✓ Biodiversity monitoring</li>
                <li>✓ Supply chain transparency</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Roadmap Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-white/20">
              <Rocket className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">{t('roadmap.title')}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              {t('roadmap.subtitle')}
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Animated Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 via-blue-400 to-purple-400 transform -translate-x-1/2 hidden md:block"></div>

            {/* Phase 1 - Completed */}
            <div className="mb-12 md:mb-24 relative">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Left Content (Desktop) / Top Content (Mobile) */}
                <div className="flex-1 md:text-right">
                  <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-2xl p-6 sm:p-8 border-2 border-green-400/50 shadow-2xl hover:scale-105 transition-all duration-300">
                    <div className="inline-flex items-center gap-2 bg-green-500/30 px-4 py-2 rounded-full mb-4">
                      <CheckCircle className="w-4 h-4 text-green-300" />
                      <span className="text-green-300 font-semibold text-sm">{t('roadmap.completed')}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{t('roadmap.phase1Title')}</h3>
                    <p className="text-green-300 mb-4">{t('roadmap.phase1Period')}</p>
                    <ul className="space-y-2 text-white/90 text-sm sm:text-base">
                      <li className="flex items-center gap-2 md:justify-end"><span>✓</span> <span>Platform Architecture</span></li>
                      <li className="flex items-center gap-2 md:justify-end"><span>✓</span> <span>Core Dashboard (6 Tabs)</span></li>
                      <li className="flex items-center gap-2 md:justify-end"><span>✓</span> <span>Real-time Data APIs</span></li>
                      <li className="flex items-center gap-2 md:justify-end"><span>✓</span> <span>Production Deployment</span></li>
                    </ul>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse z-10 relative">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
                </div>

                {/* Right Content (Desktop) / Bottom Content (Mobile) */}
                <div className="flex-1 md:hidden"></div>
              </div>
            </div>

            {/* Phase 2 - In Progress */}
            <div className="mb-12 md:mb-24 relative">
              <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                {/* Right Content (Desktop) / Top Content (Mobile) */}
                <div className="flex-1 md:text-left">
                  <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-md rounded-2xl p-6 sm:p-8 border-2 border-blue-400/50 shadow-2xl hover:scale-105 transition-all duration-300">
                    <div className="inline-flex items-center gap-2 bg-blue-500/30 px-4 py-2 rounded-full mb-4 animate-pulse">
                      <Clock className="w-4 h-4 text-blue-300" />
                      <span className="text-blue-300 font-semibold text-sm">{t('roadmap.inProgress')}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{t('roadmap.phase2Title')}</h3>
                    <p className="text-blue-300 mb-4">{t('roadmap.phase2Period')}</p>
                    <ul className="space-y-2 text-white/90 text-sm sm:text-base">
                      <li className="flex items-center gap-2"><span>🔄</span> <span>AI-Powered Insights</span></li>
                      <li className="flex items-center gap-2"><span>🔄</span> <span>Live Data Streaming</span></li>
                      <li className="flex items-center gap-2"><span>🔄</span> <span>Premium Analytics</span></li>
                      <li className="flex items-center gap-2"><span>🔄</span> <span>Supply Chain Tracking</span></li>
                    </ul>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse z-10 relative">
                    <Clock className="w-8 h-8 text-white animate-spin" style={{ animationDuration: '3s' }} />
                  </div>
                  <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75"></div>
                </div>

                {/* Left Content (Desktop) / Bottom Content (Mobile) */}
                <div className="flex-1 md:hidden"></div>
              </div>
            </div>

            {/* Phase 3 - Planned */}
            <div className="relative">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Left Content (Desktop) / Top Content (Mobile) */}
                <div className="flex-1 md:text-right">
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl p-6 sm:p-8 border-2 border-purple-400/50 shadow-2xl hover:scale-105 transition-all duration-300">
                    <div className="inline-flex items-center gap-2 bg-purple-500/30 px-4 py-2 rounded-full mb-4">
                      <Target className="w-4 h-4 text-purple-300" />
                      <span className="text-purple-300 font-semibold text-sm">{t('roadmap.planned')}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{t('roadmap.phase3Title')}</h3>
                    <p className="text-purple-300 mb-4">{t('roadmap.phase3Period')}</p>
                    <ul className="space-y-2 text-white/90 text-sm sm:text-base">
                      <li className="flex items-center gap-2 md:justify-end"><span>📍</span> <span>Multi-Country Expansion</span></li>
                      <li className="flex items-center gap-2 md:justify-end"><span>📍</span> <span>B2B Marketplace Launch</span></li>
                      <li className="flex items-center gap-2 md:justify-end"><span>📍</span> <span>Blockchain Integration</span></li>
                      <li className="flex items-center gap-2 md:justify-end"><span>📍</span> <span>Mobile Apps (iOS/Android)</span></li>
                    </ul>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center shadow-2xl z-10 relative">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Right Content (Desktop) / Bottom Content (Mobile) */}
                <div className="flex-1 md:hidden"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white dark:text-white mb-6">
            {t('hero.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 dark:text-gray-300 mb-10">
            {t('hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-xl transition-all shadow-2xl hover:scale-105 text-xl"
            >
              {t('getStarted')}
              <ArrowRight className="w-6 h-6" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-2 border-white/30 text-white font-bold rounded-xl transition-all hover:scale-105 text-xl"
            >
              {t('login')}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 dark:bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-green-500 to-green-700 p-2 rounded-xl">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">Lydian AgriTech</span>
          </div>
          <p className="text-gray-400 mb-6">
            Global Agricultural Intelligence & Big Data Analytics Platform
          </p>
          <p className="text-gray-400 text-sm">
            © 2025 Lydian AgriTech. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
