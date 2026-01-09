// i18n Configuration for Turkish/English Support

export const locales = ['tr', 'en'] as const;
export type Locale = typeof locales[number];

// Backward compatibility for old codebase
export type Language = Locale;

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  tr: 'Türkçe',
  en: 'English'
};

export const localeFlags: Record<Locale, string> = {
  tr: '🇹🇷',
  en: '🇬🇧'
};

// Backward compatibility functions for old i18n system
export function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'en';

  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('tr')) return 'tr';
  if (browserLang.startsWith('en')) return 'en';
  return 'en'; // Default to English
}

const trTranslations = {
  // Landing Page - Buttons & Actions
  login: 'Giriş Yap',
  dashboard: 'Panel',
  liveDemo: 'Canlı Demo',
  goToDashboard: 'Panele Git',
  getStarted: 'Başlayın',
  learnMore: 'Daha Fazla',

  // Landing Page - Hero Section
  'hero.title': 'Tarımda Yapay Zeka Devrimi',
  'hero.subtitle': '30+ Ürün, 20+ EPA İlaç, USDA/NASA/EPA Canlı Veri Entegrasyonu',
  'hero.description': 'Hassas tarım, drone yönetimi, ESG uyumluluğu ve gerçek zamanlı tarımsal istihbarat platformu',
  'hero.badge': 'Ürün | İlaç',

  // Landing Page - Stats
  'stats.cropTypes': 'Ürün Çeşidi',
  'stats.epaProducts': 'EPA Ürünü',
  'stats.dataSources': 'Veri Kaynağı',
  'stats.countries': 'Ülke',

  // Landing Page - Roadmap
  'roadmap.title': 'Ürün Yol Haritamız',
  'roadmap.subtitle': 'Küresel tarımda devrim yaratma yolculuğumuz',
  'roadmap.phase1': '1. Aşama',
  'roadmap.phase1Title': 'Temel & MVP',
  'roadmap.phase1Period': '2025 Ç1-Ç2',
  'roadmap.phase2': '2. Aşama',
  'roadmap.phase2Title': 'Kurumsal Özellikler',
  'roadmap.phase2Period': '2025 Ç3',
  'roadmap.phase3': '3. Aşama',
  'roadmap.phase3Title': 'Küresel Ölçek',
  'roadmap.phase3Period': '2025-2026',
  'roadmap.completed': 'Tamamlandı',
  'roadmap.inProgress': 'Devam Ediyor',
  'roadmap.planned': 'Planlandı',

  // Dashboard Header
  headerSubtitle: 'Global Tarım İstihbaratı',
  devBannerTitle: 'CANLI DEV MOD',
  devBannerMessage: 'Gerçek zamanlı veri akışı aktif',

  // Core Platform
  overview: 'Genel Bakış',
  analytics: 'Analitik',
  aiInsights: 'Yapay Zeka',
  liveData: 'Canlı Veri',

  // Agriculture Tools
  soilAnalysis: 'Toprak Analizi',
  cropCatalog: 'Ürün Kataloğu',
  oliveCultivation: 'Zeytin Yetiştiriciliği',
  pesticideMatcher: 'İlaç Eşleştirici',
  droneManagement: 'Drone Yönetimi',
  pesticidesDB: 'İlaç Veritabanı',
  globalInsights: 'Global Görünüm',

  // Enterprise
  supplyChain: 'Tedarik Zinciri',
  esgMetrics: 'ESG Metrikleri',
  bigData: 'Büyük Veri',

  // E-Commerce
  b2bMarketplace: 'B2B Pazar Yeri',
  livePricing: 'Canlı Fiyatlar',
  apiPlatform: 'API Platformu',

  // Investor
  roadmap: 'Yol Haritası',
  investorDeck: 'Yatırımcı Sunumu',

  // Info & Legal
  aboutProject: 'Hakkında',
  apiDocumentation: 'API Dokümantasyonu',
  privacyPolicy: 'Gizlilik Politikası',
  termsOfService: 'Kullanım Şartları',
  contact: 'İletişim',

  // Platform Stats
  platformStatus: 'Platform Durumu',
  activeUsers: 'Aktif Kullanıcılar',
  dataPoints: 'Veri Noktaları',
  dataSourcesTitle: 'Veri Kaynakları',
  dataSources: 'Entegre Kaynak',
  coverageTitle: 'Global Kapsama',
  countries: 'Ülke'
};

const enTranslations = {
  // Landing Page - Buttons & Actions
  login: 'Login',
  dashboard: 'Dashboard',
  liveDemo: 'Live Demo',
  goToDashboard: 'Go to Dashboard',
  getStarted: 'Get Started',
  learnMore: 'Learn More',

  // Landing Page - Hero Section
  'hero.title': 'AI Revolution in Agriculture',
  'hero.subtitle': '30+ Crops, 20+ EPA Pesticides, USDA/NASA/EPA Live Data Integration',
  'hero.description': 'Precision farming, drone management, ESG compliance, and real-time agricultural intelligence platform',
  'hero.badge': 'Crops | Pesticides',

  // Landing Page - Stats
  'stats.cropTypes': 'Crop Types',
  'stats.epaProducts': 'EPA Products',
  'stats.dataSources': 'Data Sources',
  'stats.countries': 'Countries',

  // Landing Page - Roadmap
  'roadmap.title': 'Product Roadmap',
  'roadmap.subtitle': 'Our journey to revolutionize global agriculture',
  'roadmap.phase1': 'Phase 1',
  'roadmap.phase1Title': 'Foundation & MVP',
  'roadmap.phase1Period': 'Q1-Q2 2025',
  'roadmap.phase2': 'Phase 2',
  'roadmap.phase2Title': 'Enterprise Features',
  'roadmap.phase2Period': 'Q3 2025',
  'roadmap.phase3': 'Phase 3',
  'roadmap.phase3Title': 'Global Scale',
  'roadmap.phase3Period': '2025-2026',
  'roadmap.completed': 'Completed',
  'roadmap.inProgress': 'In Progress',
  'roadmap.planned': 'Planned',

  // Dashboard Header
  headerSubtitle: 'Global Agricultural Intelligence',
  devBannerTitle: 'LIVE DEV MODE',
  devBannerMessage: 'Real-time data streaming active',

  // Core Platform
  overview: 'Overview',
  analytics: 'Analytics',
  aiInsights: 'AI Insights',
  liveData: 'Live Data',

  // Agriculture Tools
  soilAnalysis: 'Soil Analysis',
  cropCatalog: 'Crop Catalog',
  oliveCultivation: 'Olive Cultivation',
  pesticideMatcher: 'Pesticide Matcher',
  droneManagement: 'Drone Management',
  pesticidesDB: 'Pesticides Database',
  globalInsights: 'Global Insights',

  // Enterprise
  supplyChain: 'Supply Chain',
  esgMetrics: 'ESG Metrics',
  bigData: 'Big Data',

  // E-Commerce
  b2bMarketplace: 'B2B Marketplace',
  livePricing: 'Live Pricing',
  apiPlatform: 'API Platform',

  // Investor
  roadmap: 'Roadmap',
  investorDeck: 'Investor Deck',

  // Info & Legal
  aboutProject: 'About',
  apiDocumentation: 'API Documentation',
  privacyPolicy: 'Privacy Policy',
  termsOfService: 'Terms of Service',
  contact: 'Contact',

  // Platform Stats
  platformStatus: 'Platform Status',
  activeUsers: 'Active Users',
  dataPoints: 'Data Points',
  dataSourcesTitle: 'Data Sources',
  dataSources: 'Integrated Sources',
  coverageTitle: 'Global Coverage',
  countries: 'Countries'
};

export function getTranslation(lang: Language) {
  return lang === 'tr' ? trTranslations : enTranslations;
}

