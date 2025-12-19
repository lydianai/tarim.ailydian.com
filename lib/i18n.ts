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
  medicalDashboard: string;
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
  bigData: string;
  roadmap: string;
  investorDeck: string;
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
  platformStats: string;
  activeUsers: string;
  dataPoints: string;
  activeIntegrations: string;
  globalLeaders: string;
  crops: string;
  liveDataSources: string;
  agriTechLeaders: string;
  cropTypes: string;
  comprehensiveDatabase: string;
  safetyFirst: string;
  globalCoverage: string;
  platformOverview: string;

  // Common
  readMore: string;
  learnMore: string;
  backToDashboard: string;
  language: string;

  // Additional tabs and pages
  oliveCultivation: string;
  droneManagement: string;
  b2bMarketplace: string;
  livePricing: string;
  apiPlatform: string;
  apiDocumentation: string;
  privacyPolicy: string;
  termsOfService: string;
  contact: string;

  // Weather Widget
  currentWeather: string;
  temperature: string;
  humidity: string;
  windSpeed: string;
  forecast5Day: string;
  loading: string;
}

export const translations: Record<Language, Translations> = {
  tr: {
    // Header
    headerTitle: 'AgriTech Platform Pro',
    headerSubtitle: 'Küresel Tarım Zekası ve Büyük Veri Analitiği',
    liveStatus: 'CANLI',
    dataSources: 'Kaynak',

    // Navigation Tabs
    medicalDashboard: 'Tıbbi Dashboard',
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
    bigData: 'Big Data Altyapısı',
    roadmap: 'Yol Haritası',
    investorDeck: 'Yatırımcı Sunumu',
    aboutProject: 'Proje Hakkında',

    // Development Banner
    devBannerTitle: 'PRO VERSİYON GELİŞTİRİLİYOR',
    devBannerMessage: 'Platform sürekli güncelleniyor. Yeni özellikler ve iyileştirmeler her gün ekleniyor.',

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
    platformStats: 'Platform İstatistikleri',
    activeUsers: 'Aktif Kullanıcı',
    dataPoints: 'Veri Noktası',
    activeIntegrations: 'Aktif Entegrasyon',
    globalLeaders: 'Küresel Liderler',
    crops: 'Ürünler',
    liveDataSources: 'Canlı Veri Kaynakları',
    agriTechLeaders: 'Tarım Teknolojisi Liderleri',
    cropTypes: 'Ürün Çeşidi',
    comprehensiveDatabase: 'Kapsamlı Veritabanı',
    safetyFirst: 'Güvenlik Önceliği',
    globalCoverage: 'Küresel Kapsama',
    platformOverview: 'Platform Genel Bakışı',

    // Common
    readMore: 'Devamını Oku',
    learnMore: 'Daha Fazla Bilgi',
    backToDashboard: 'Dashboard\'a Dön',
    language: 'Dil',

    // Additional tabs and pages
    oliveCultivation: 'Zeytincilik',
    droneManagement: 'Drone Yönetimi',
    b2bMarketplace: 'B2B Pazar Yeri',
    livePricing: 'Canlı Fiyatlar',
    apiPlatform: 'API Platform',
    apiDocumentation: 'API Dokümantasyonu',
    privacyPolicy: 'Gizlilik Politikası',
    termsOfService: 'Kullanım Koşulları',
    contact: 'İletişim',

    // Weather Widget
    currentWeather: 'Güncel Hava Durumu',
    temperature: 'Sıcaklık',
    humidity: 'Nem',
    windSpeed: 'Rüzgar Hızı',
    forecast5Day: '5 Günlük Tahmin',
    loading: 'Yükleniyor',
  },

  en: {
    // Header
    headerTitle: 'AgriTech Platform Pro',
    headerSubtitle: 'Global Agricultural Intelligence & Big Data Analytics',
    liveStatus: 'LIVE',
    dataSources: 'Sources',

    // Navigation Tabs
    medicalDashboard: 'Medical Dashboard',
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
    bigData: 'Big Data Infrastructure',
    roadmap: 'Roadmap',
    investorDeck: 'Investor Deck',
    aboutProject: 'About Project',

    // Development Banner
    devBannerTitle: 'PRO VERSION IN DEVELOPMENT',
    devBannerMessage: 'Platform is continuously evolving. New features and improvements are added daily.',

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
    platformStats: 'Platform Statistics',
    activeUsers: 'Active Users',
    dataPoints: 'Data Points',
    activeIntegrations: 'Active Integrations',
    globalLeaders: 'Global Leaders',
    crops: 'Crops',
    liveDataSources: 'Live Data Sources',
    agriTechLeaders: 'Agri Tech Leaders',
    cropTypes: 'Crop Types',
    comprehensiveDatabase: 'Comprehensive Database',
    safetyFirst: 'Safety First',
    globalCoverage: 'Global Coverage',
    platformOverview: 'Platform Overview',

    // Common
    readMore: 'Read More',
    learnMore: 'Learn More',
    backToDashboard: 'Back to Dashboard',
    language: 'Language',

    // Additional tabs and pages
    oliveCultivation: 'Olive Cultivation',
    droneManagement: 'Drone Management',
    b2bMarketplace: 'B2B Marketplace',
    livePricing: 'Live Pricing',
    apiPlatform: 'API Platform',
    apiDocumentation: 'API Documentation',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    contact: 'Contact',

    // Weather Widget
    currentWeather: 'Current Weather',
    temperature: 'Temperature',
    humidity: 'Humidity',
    windSpeed: 'Wind Speed',
    forecast5Day: '5-Day Forecast',
    loading: 'Loading',
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
