'use client';

import { useState, useEffect } from 'react';
import { Sprout, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import DashboardWidgets from '@/components/DashboardWidgets';

export default function LandingPage() {
  const { t } = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Lydian AgriTech Platform Pro",
    "description": "Global Agricultural Intelligence & Big Data Analytics Platform with 30+ crops, 20+ pesticides, real-time data from USDA, NASA, EPA.",
    "url": "https://tarim.ailydian.com",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "category": "Agriculture Technology"
    },
    "featureList": [
      "30+ Crop Database",
      "20+ EPA Pesticides",
      "18+ Data Sources (USDA, NASA, EPA)",
      "AI-Powered Insights",
      "Drone Management",
      "Blockchain Supply Chain",
      "ESG Metrics",
      "B2B Marketplace"
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "Farmers, Agricultural Businesses, Researchers"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-green-500 to-green-700 p-2 rounded-xl">
                <Sprout className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white dark:text-white">Lydian AgriTech</h1>
                <p className="text-xs text-gray-400 dark:text-gray-400 hidden sm:block">Global Agricultural Intelligence</p>
              </div>
            </Link>

            <div className="flex items-center gap-2 sm:gap-3">
              <LanguageSwitcher />
              <Link
                href="/login"
                className="px-3 sm:px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-lg transition-all text-sm sm:text-base"
              >
                Login
              </Link>
              <Link
                href="/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full mb-6 text-sm font-semibold">
            <CheckCircle className="w-4 h-4" />
            <span>30+ {t('dashboard.tabs.crops')} | 20+ EPA {t('dashboard.title')}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white dark:text-white mb-6 leading-tight">
            {t('hero.title')}
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 dark:text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>

          <p className="text-base sm:text-lg text-gray-400 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
            {t('hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-xl transition-all shadow-2xl hover:shadow-green-500/50 hover:scale-105 text-lg"
            >
              Dashboard'a Git
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-2 border-white/30 text-white font-bold rounded-xl transition-all hover:scale-105 text-lg"
            >
              Canlı Demo
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all shadow-2xl hover:shadow-blue-500/50 hover:scale-105 text-lg"
            >
              Giriş Yap
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
              { number: '30+', label: t('features.widgets.analytics.stats') || 'Crop Types' },
              { number: '20+', label: 'EPA Products' },
              { number: '18+', label: 'Data Sources' },
              { number: '8', label: 'Countries' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">{stat.number}</div>
                <div className="text-green-100 text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
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
              Şimdi Başla
              <ArrowRight className="w-6 h-6" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-2 border-white/30 text-white font-bold rounded-xl transition-all hover:scale-105 text-xl"
            >
              Giriş Yap
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
