'use client';

import { BookOpen, Target, Users, Database, Code, Rocket, CheckCircle, Globe, Zap, TrendingUp } from 'lucide-react';
import { Language, getTranslation } from '@/lib/i18n';

interface AboutProjectProps {
  lang: Language;
}

export default function AboutProject({ lang }: AboutProjectProps) {
  const t = getTranslation(lang);

  const features = lang === 'tr' ? [
    {
      icon: Database,
      title: '30+ Tarım Ürünü',
      description: 'Tahıllar, yağlı tohumlar, sebzeler, meyveler ve daha fazlası için kapsamlı veritabanı',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'Gerçek Zamanlı Veri',
      description: '18+ resmi kaynak (USDA, NASA, EPA) ile canlı veri akışı',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Globe,
      title: 'Küresel Analiz',
      description: '8 ülkenin tarım teknolojisi karşılaştırması ve en iyi uygulamalar',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      title: 'Yapay Zeka Öngörüleri',
      description: 'Makine öğrenmesi ile verim tahmini ve akıllı öneriler',
      color: 'from-orange-500 to-red-500'
    }
  ] : [
    {
      icon: Database,
      title: '30+ Agricultural Products',
      description: 'Comprehensive database for grains, oilseeds, vegetables, fruits, and more',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'Real-Time Data',
      description: 'Live data streaming from 18+ official sources (USDA, NASA, EPA)',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Globe,
      title: 'Global Analysis',
      description: 'Agricultural technology comparison of 8 countries and best practices',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      title: 'AI Insights',
      description: 'Yield prediction and smart recommendations with machine learning',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const benefits = lang === 'tr' ? [
    'Veri odaklı karar alma süreçleri',
    'Su ve kaynak kullanımında %70\'e varan tasarruf',
    'Verim artışı için akıllı öneriler',
    'Küresel en iyi uygulamalara erişim',
    'EPA onaylı pestisit veritabanı',
    'Gerçek zamanlı hava durumu ve uydu verileri',
    'ROI analizi ve performans karşılaştırması',
    'Sürdürülebilir tarım uygulamaları'
  ] : [
    'Data-driven decision making processes',
    'Up to 70% savings in water and resource usage',
    'Smart recommendations for yield improvement',
    'Access to global best practices',
    'EPA-approved pesticide database',
    'Real-time weather and satellite data',
    'ROI analysis and performance benchmarking',
    'Sustainable farming practices'
  ];

  const targetAudience = lang === 'tr' ? [
    {
      title: 'Çiftçiler ve Yetiştiriciler',
      description: 'Ürün seçimi, ilaç önerileri, verim takibi',
      icon: Users
    },
    {
      title: 'Tarım Araştırmacıları',
      description: 'Veri analizi, küresel trendler, ML veri setleri',
      icon: BookOpen
    },
    {
      title: 'Tarım Danışmanları',
      description: 'ROI raporları, teknoloji önerileri, benchmarking',
      icon: Target
    }
  ] : [
    {
      title: 'Farmers & Growers',
      description: 'Crop selection, pesticide recommendations, yield tracking',
      icon: Users
    },
    {
      title: 'Agricultural Researchers',
      description: 'Data analysis, global trends, ML datasets',
      icon: BookOpen
    },
    {
      title: 'Agricultural Consultants',
      description: 'ROI reports, technology recommendations, benchmarking',
      icon: Target
    }
  ];

  const dataSources = [
    'USDA NASS QuickStats',
    'NASA MODIS & SMAP',
    'EPA PPLS Database',
    'Copernicus Sentinel-2',
    'OpenWeather Agro API',
    'SSURGO Soil Database',
    'FAO FAOSTAT',
    'World Bank Agriculture Data'
  ];

  const techStack = lang === 'tr' ? [
    { name: 'Modern Framework', desc: 'Hızlı build sistemi' },
    { name: 'Tip Güvenli', desc: 'Güvenli programlama' },
    { name: 'Modern UI', desc: 'Duyarlı tasarım' },
    { name: 'Haritalar', desc: 'Uydu haritaları' },
    { name: 'Görselleştirme', desc: 'Veri grafikleri' },
    { name: 'Cloud Platform', desc: 'Cloud barındırma' }
  ] : [
    { name: 'Modern Framework', desc: 'Fast build system' },
    { name: 'Type Safety', desc: 'Secure programming' },
    { name: 'Modern UI', desc: 'Responsive design' },
    { name: 'Mapping', desc: 'Satellite maps' },
    { name: 'Visualization', desc: 'Data charts' },
    { name: 'Cloud Platform', desc: 'Cloud hosting' }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-xl p-8 shadow-2xl text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-neon-100/20 backdrop-blur-sm p-4 rounded-xl">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">{t.aboutTitle}</h1>
            <p className="text-xl text-white/90">{t.aboutSubtitle}</p>
          </div>
        </div>
      </div>

      {/* Project Goal */}
      <div className="bg-earth-900 rounded-xl p-6 shadow-lg border border-earth-700">
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-bold text-earth-100">{t.projectGoalTitle}</h2>
        </div>
        <p className="text-earth-300 leading-relaxed text-lg">
          {t.projectGoalText}
        </p>
      </div>

      {/* Key Features */}
      <div>
        <h2 className="text-2xl font-bold text-earth-100 mb-6">{t.keyFeaturesTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-earth-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-earth-700 group hover:scale-105 duration-300"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-earth-100 mb-2">{feature.title}</h3>
              <p className="text-earth-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-earth-900 rounded-xl p-6 shadow-lg border border-earth-700">
        <h2 className="text-2xl font-bold text-earth-100 mb-6 flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-green-600" />
          {t.benefitsTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-earth-300">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Target Audience */}
      <div>
        <h2 className="text-2xl font-bold text-earth-100 mb-6">{t.targetAudienceTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {targetAudience.map((audience, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-earth-900 to-earth-800 rounded-xl p-6 shadow-lg border border-earth-700"
            >
              <audience.icon className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="text-lg font-bold text-earth-100 mb-2">{audience.title}</h3>
              <p className="text-earth-300 text-sm">{audience.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Data Sources & Tech Stack Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Sources */}
        <div className="bg-earth-900 rounded-xl p-6 shadow-lg border border-earth-700">
          <h2 className="text-xl font-bold text-earth-100 mb-4 flex items-center gap-3">
            <Database className="w-6 h-6 text-blue-600" />
            {t.dataSourcesTitle}
          </h2>
          <div className="space-y-2">
            {dataSources.map((source, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-earth-300">{source}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Capabilities */}
        <div className="bg-earth-900 rounded-xl p-6 shadow-lg border border-earth-700">
          <h2 className="text-xl font-bold text-earth-100 mb-4 flex items-center gap-3">
            <Code className="w-6 h-6 text-purple-600" />
            {lang === 'tr' ? 'Platform Yetenekleri' : 'Platform Capabilities'}
          </h2>
          <div className="space-y-3">
            {techStack.map((tech, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="font-semibold text-earth-100">{tech.name}</span>
                <span className="text-sm text-earth-300">{tech.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Future Vision */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-xl p-8 shadow-2xl text-white">
        <div className="flex items-center gap-3 mb-4">
          <Rocket className="w-8 h-8" />
          <h2 className="text-2xl font-bold">{t.futureVisionTitle}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(lang === 'tr' ? [
            { title: 'Mobil Uygulama', desc: 'iOS ve Android desteği' },
            { title: 'IoT Entegrasyonu', desc: 'Gerçek tarla sensörleri' },
            { title: 'Blockchain', desc: 'Şeffaf tedarik zinciri' }
          ] : [
            { title: 'Mobile App', desc: 'iOS and Android support' },
            { title: 'IoT Integration', desc: 'Real farm sensors' },
            { title: 'Blockchain', desc: 'Transparent supply chain' }
          ]).map((vision, idx) => (
            <div key={idx} className="bg-earth-950/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="font-bold text-lg mb-1">{vision.title}</h3>
              <p className="text-sm text-white/80">{vision.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
