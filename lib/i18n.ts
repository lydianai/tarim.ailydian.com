// i18n Configuration for Turkish/English Support

export const locales = ['tr', 'en'] as const;
export type Locale = typeof locales[number];

// Backward compatibility for old codebase
export type Language = Locale;

export const defaultLocale: Locale = 'tr';

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
  if (typeof window === 'undefined') return 'tr';

  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('tr')) return 'tr';
  if (browserLang.startsWith('en')) return 'en';
  return 'tr';
}

const trTranslations = {
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

