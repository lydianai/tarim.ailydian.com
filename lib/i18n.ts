// Internationalization (i18n) Configuration
// Turkish and English language support

export type Language = 'tr' | 'en';

export interface Translations {
  // Header
  headerTitle: string;
  headerSubtitle: string;
  liveStatus: string;
  dataSources: string;

  // Navigation Tabs
  overview: string;
  analytics: string;
  aiInsights: string;
  liveData: string;
  soilAnalysis: string;
  cropCatalog: string;
  pesticideMatcher: string;
  pesticidesDB: string;
  globalInsights: string;
  supplyChain: string;
  esgMetrics: string;
  aboutProject: string;

  // Development Banner
  devBannerTitle: string;
  devBannerMessage: string;

  // KPI Cards
  totalRevenue: string;
  waterEfficiency: string;
  cropYield: string;
  qualityScore: string;
  saved: string;

  // Stats
  totalCrops: string;
  pesticides: string;
  countries: string;

  // About Page
  aboutTitle: string;
  aboutSubtitle: string;
  projectGoalTitle: string;
  projectGoalText: string;
  keyFeaturesTitle: string;
  benefitsTitle: string;
  targetAudienceTitle: string;
  dataSourcesTitle: string;
  technologyStackTitle: string;
  futureVisionTitle: string;

  // Sidebar Stats
  platformStatistics: string;
  crops: string;
  liveDataSources: string;
  agriTechLeaders: string;

  // Common
  readMore: string;
  learnMore: string;
  backToDashboard: string;
  language: string;
}

export const translations: Record<Language, Translations> = {
  tr: {
    // Header
    headerTitle: 'AgriTech Platform Pro',
    headerSubtitle: 'Küresel Tarım Zekası ve Büyük Veri Analitiği',
    liveStatus: 'CANLI',
    dataSources: 'Kaynak',

    // Navigation Tabs
    overview: 'Genel Bakış',
    analytics: 'Analitik',
    aiInsights: 'Yapay Zeka Öngörüleri',
    liveData: 'Canlı Veri',
    soilAnalysis: 'Toprak Analizi',
    cropCatalog: 'Ürün Kataloğu',
    pesticideMatcher: 'İlaç Eşleştirici',
    pesticidesDB: 'İlaç Veritabanı',
    globalInsights: 'Küresel İçgörüler',
    supplyChain: 'Tedarik Zinciri',
    esgMetrics: 'ESG Metrikleri',
    aboutProject: 'Proje Hakkında',

    // Development Banner
    devBannerTitle: 'GELİŞTİRME AŞAMASINDA',
    devBannerMessage: 'Bu platform aktif geliştirme aşamasındadır. Bazı özellikler henüz tamamlanmamış olabilir.',

    // KPI Cards
    totalRevenue: 'Toplam Gelir',
    waterEfficiency: 'Su Verimliliği',
    cropYield: 'Ürün Verimi',
    qualityScore: 'Kalite Puanı',
    saved: 'Tasarruf',

    // Stats
    totalCrops: 'Toplam Ürün',
    pesticides: 'İlaçlar',
    countries: 'Ülkeler',

    // About Page
    aboutTitle: 'AgriTech Platform Pro Hakkında',
    aboutSubtitle: 'Dünya\'nın En Kapsamlı Tarım Zekası Platformu',
    projectGoalTitle: 'Proje Amacı',
    projectGoalText: 'AgriTech Platform Pro, küresel tarım verilerini birleştirerek çiftçilere, araştırmacılara ve tarım danışmanlarına gerçek zamanlı içgörüler sunan kapsamlı bir platformdur. USDA, NASA, EPA ve diğer güvenilir kaynaklardan 18+ veri kaynağı ile desteklenmektedir.',
    keyFeaturesTitle: 'Temel Özellikler',
    benefitsTitle: 'Faydalar',
    targetAudienceTitle: 'Hedef Kitle',
    dataSourcesTitle: 'Veri Kaynakları',
    technologyStackTitle: 'Teknoloji Altyapısı',
    futureVisionTitle: 'Gelecek Vizyonu',

    // Sidebar Stats
    platformStatistics: 'Platform İstatistikleri',
    crops: 'Ürünler',
    liveDataSources: 'Canlı Veri Kaynakları',
    agriTechLeaders: 'Tarım Teknolojisi Liderleri',

    // Common
    readMore: 'Devamını Oku',
    learnMore: 'Daha Fazla Bilgi',
    backToDashboard: 'Dashboard\'a Dön',
    language: 'Dil',
  },

  en: {
    // Header
    headerTitle: 'AgriTech Platform Pro',
    headerSubtitle: 'Global Agricultural Intelligence & Big Data Analytics',
    liveStatus: 'LIVE',
    dataSources: 'Sources',

    // Navigation Tabs
    overview: 'Overview',
    analytics: 'Analytics',
    aiInsights: 'AI Insights',
    liveData: 'Live Data',
    soilAnalysis: 'Soil Analysis',
    cropCatalog: 'Crop Catalog',
    pesticideMatcher: 'Pesticide Matcher',
    pesticidesDB: 'Pesticides DB',
    globalInsights: 'Global Insights',
    supplyChain: 'Supply Chain',
    esgMetrics: 'ESG Metrics',
    aboutProject: 'About Project',

    // Development Banner
    devBannerTitle: 'UNDER DEVELOPMENT',
    devBannerMessage: 'This platform is actively under development. Some features may not be fully completed yet.',

    // KPI Cards
    totalRevenue: 'Total Revenue',
    waterEfficiency: 'Water Efficiency',
    cropYield: 'Crop Yield',
    qualityScore: 'Quality Score',
    saved: 'Saved',

    // Stats
    totalCrops: 'Total Crops',
    pesticides: 'Pesticides',
    countries: 'Countries',

    // About Page
    aboutTitle: 'About AgriTech Platform Pro',
    aboutSubtitle: 'World\'s Most Comprehensive Agricultural Intelligence Platform',
    projectGoalTitle: 'Project Goal',
    projectGoalText: 'AgriTech Platform Pro is a comprehensive platform that combines global agricultural data to provide real-time insights to farmers, researchers, and agricultural consultants. Powered by 18+ data sources including USDA, NASA, EPA, and other trusted organizations.',
    keyFeaturesTitle: 'Key Features',
    benefitsTitle: 'Benefits',
    targetAudienceTitle: 'Target Audience',
    dataSourcesTitle: 'Data Sources',
    technologyStackTitle: 'Technology Stack',
    futureVisionTitle: 'Future Vision',

    // Sidebar Stats
    platformStatistics: 'Platform Statistics',
    crops: 'Crops',
    liveDataSources: 'Live Data Sources',
    agriTechLeaders: 'Agri Tech Leaders',

    // Common
    readMore: 'Read More',
    learnMore: 'Learn More',
    backToDashboard: 'Back to Dashboard',
    language: 'Language',
  }
};

export function getTranslation(lang: Language): Translations {
  return translations[lang];
}

// Browser language detection
export function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'tr'; // Default to Turkish on server

  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('tr')) return 'tr';
  return 'en';
}
