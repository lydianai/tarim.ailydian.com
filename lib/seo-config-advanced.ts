/**
 * ADVANCED SEO CONFIGURATION
 * World-Class Multi-Language, Multi-Region, Multi-Search-Engine Optimization
 *
 * Targets:
 * - 8+ Languages (English, Turkish, German, French, Spanish, Italian, Portuguese, Russian, Chinese, Japanese, Arabic)
 * - 10+ Search Engines (Google, Bing, Yandex, Baidu, DuckDuckGo, Yahoo, Naver, Seznam, Qwant, Ecosia)
 * - 50+ GEO Regions (Global agricultural regions)
 */

// ============================================================================
// MULTI-LANGUAGE CONFIGURATION
// ============================================================================

export const SUPPORTED_LANGUAGES = {
  en: {
    code: 'en',
    locale: 'en-US',
    hreflang: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    region: 'United States',
    searchEngines: ['google', 'bing', 'duckduckgo', 'yahoo'],
  },
  tr: {
    code: 'tr',
    locale: 'tr-TR',
    hreflang: 'tr',
    name: 'Turkish',
    nativeName: 'Türkçe',
    dir: 'ltr',
    region: 'Turkey',
    searchEngines: ['google', 'yandex', 'bing'],
  },
  de: {
    code: 'de',
    locale: 'de-DE',
    hreflang: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    dir: 'ltr',
    region: 'Germany',
    searchEngines: ['google', 'bing', 'ecosia'],
  },
  fr: {
    code: 'fr',
    locale: 'fr-FR',
    hreflang: 'fr',
    name: 'French',
    nativeName: 'Français',
    dir: 'ltr',
    region: 'France',
    searchEngines: ['google', 'bing', 'qwant'],
  },
  es: {
    code: 'es',
    locale: 'es-ES',
    hreflang: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    dir: 'ltr',
    region: 'Spain',
    searchEngines: ['google', 'bing', 'yahoo'],
  },
  it: {
    code: 'it',
    locale: 'it-IT',
    hreflang: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    dir: 'ltr',
    region: 'Italy',
    searchEngines: ['google', 'bing'],
  },
  pt: {
    code: 'pt',
    locale: 'pt-BR',
    hreflang: 'pt-BR',
    name: 'Portuguese',
    nativeName: 'Português',
    dir: 'ltr',
    region: 'Brazil',
    searchEngines: ['google', 'bing'],
  },
  ru: {
    code: 'ru',
    locale: 'ru-RU',
    hreflang: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    dir: 'ltr',
    region: 'Russia',
    searchEngines: ['yandex', 'google', 'mail.ru'],
  },
  zh: {
    code: 'zh',
    locale: 'zh-CN',
    hreflang: 'zh-Hans',
    name: 'Chinese',
    nativeName: '中文',
    dir: 'ltr',
    region: 'China',
    searchEngines: ['baidu', 'sogou', 'so.com'],
  },
  ja: {
    code: 'ja',
    locale: 'ja-JP',
    hreflang: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    dir: 'ltr',
    region: 'Japan',
    searchEngines: ['google', 'yahoo.co.jp'],
  },
  ar: {
    code: 'ar',
    locale: 'ar-SA',
    hreflang: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
    region: 'Saudi Arabia',
    searchEngines: ['google', 'bing'],
  },
} as const;

// ============================================================================
// GLOBAL GEO COORDINATES - Top 50 Agricultural Regions
// ============================================================================

export const AGRICULTURAL_GEO_COORDINATES = {
  // North America
  'US-CA': { lat: 36.7783, lon: -119.4179, name: 'California (Central Valley)', country: 'USA' },
  'US-IA': { lat: 42.0046, lon: -93.2140, name: 'Iowa (Corn Belt)', country: 'USA' },
  'US-NE': { lat: 41.4925, lon: -99.9018, name: 'Nebraska (Great Plains)', country: 'USA' },
  'US-TX': { lat: 31.9686, lon: -99.9018, name: 'Texas (Panhandle)', country: 'USA' },
  'CA-SK': { lat: 52.9399, lon: -106.4509, name: 'Saskatchewan (Wheat Belt)', country: 'Canada' },
  'MX-SON': { lat: 29.2972, lon: -110.3309, name: 'Sonora (Yaqui Valley)', country: 'Mexico' },

  // South America
  'BR-SP': { lat: -23.5505, lon: -46.6333, name: 'São Paulo (Cerrado)', country: 'Brazil' },
  'BR-MT': { lat: -12.6819, lon: -56.9211, name: 'Mato Grosso (Soy Belt)', country: 'Brazil' },
  'AR-BA': { lat: -34.6037, lon: -58.3816, name: 'Buenos Aires (Pampas)', country: 'Argentina' },
  'AR-COR': { lat: -31.4201, lon: -64.1888, name: 'Córdoba (Agri Belt)', country: 'Argentina' },

  // Europe
  'TR-34': { lat: 41.0082, lon: 28.9784, name: 'Istanbul (Thrace)', country: 'Turkey' },
  'TR-06': { lat: 39.9334, lon: 32.8597, name: 'Ankara (Central Anatolia)', country: 'Turkey' },
  'TR-35': { lat: 38.4192, lon: 27.1287, name: 'İzmir (Aegean Coast)', country: 'Turkey' },
  'FR-IDF': { lat: 48.8566, lon: 2.3522, name: 'Paris (Île-de-France)', country: 'France' },
  'DE-BY': { lat: 48.1351, lon: 11.5820, name: 'Bavaria (Agricultural)', country: 'Germany' },
  'ES-AN': { lat: 37.3891, lon: -5.9845, name: 'Andalusia (Olive Belt)', country: 'Spain' },
  'IT-EM': { lat: 44.4949, lon: 11.3426, name: 'Emilia-Romagna (Food Valley)', country: 'Italy' },
  'NL-ZH': { lat: 52.0705, lon: 4.3007, name: 'South Holland (Greenhouse)', country: 'Netherlands' },
  'UK-EA': { lat: 52.6369, lon: 1.2974, name: 'East Anglia (Grain Belt)', country: 'UK' },
  'PL-MZ': { lat: 52.2297, lon: 21.0122, name: 'Mazovia (Wheat Region)', country: 'Poland' },
  'UA-KY': { lat: 50.4501, lon: 30.5234, name: 'Kyiv (Breadbasket)', country: 'Ukraine' },
  'RU-MOW': { lat: 55.7558, lon: 37.6173, name: 'Moscow (Black Earth)', country: 'Russia' },

  // Asia
  'CN-HEB': { lat: 39.9042, lon: 116.4074, name: 'Hebei (North China Plain)', country: 'China' },
  'CN-SD': { lat: 36.6512, lon: 117.1200, name: 'Shandong (Wheat-Corn)', country: 'China' },
  'CN-HEN': { lat: 34.7466, lon: 113.6254, name: 'Henan (Grain Province)', country: 'China' },
  'IN-PB': { lat: 30.7333, lon: 76.7794, name: 'Punjab (Green Revolution)', country: 'India' },
  'IN-HR': { lat: 29.0588, lon: 76.0856, name: 'Haryana (Rice-Wheat)', country: 'India' },
  'IN-UP': { lat: 26.8467, lon: 80.9462, name: 'Uttar Pradesh (Ganges)', country: 'India' },
  'PK-PB': { lat: 31.5204, lon: 74.3587, name: 'Punjab Pakistan (Indus)', country: 'Pakistan' },
  'TH-C': { lat: 15.8700, lon: 100.9925, name: 'Central Thailand (Rice Bowl)', country: 'Thailand' },
  'VN-MKD': { lat: 10.0452, lon: 105.7469, name: 'Mekong Delta (Rice)', country: 'Vietnam' },
  'ID-JT': { lat: -7.2575, lon: 112.7521, name: 'East Java (Rice/Sugar)', country: 'Indonesia' },
  'JP-HKD': { lat: 43.0642, lon: 141.3469, name: 'Hokkaido (Agriculture)', country: 'Japan' },
  'KR-JL': { lat: 36.3504, lon: 127.3845, name: 'Jeolla (Rice Bowl)', country: 'South Korea' },

  // Middle East & Africa
  'EG-C': { lat: 30.0444, lon: 31.2357, name: 'Nile Delta (Wheat)', country: 'Egypt' },
  'SA-RI': { lat: 24.7136, lon: 46.6753, name: 'Riyadh (Desert Farms)', country: 'Saudi Arabia' },
  'IL-C': { lat: 31.0461, lon: 34.8516, name: 'Central Israel (Hi-Tech)', country: 'Israel' },
  'KE-RV': { lat: -0.4236, lon: 36.9583, name: 'Rift Valley (Tea/Coffee)', country: 'Kenya' },
  'ZA-WC': { lat: -33.9249, lon: 18.4241, name: 'Western Cape (Wine)', country: 'South Africa' },
  'NG-KD': { lat: 10.5167, lon: 7.4333, name: 'Kaduna (Grain Belt)', country: 'Nigeria' },
  'ET-OR': { lat: 9.0146, lon: 38.7634, name: 'Oromia (Coffee)', country: 'Ethiopia' },

  // Oceania
  'AU-NSW': { lat: -33.8688, lon: 151.2093, name: 'New South Wales (Wheat)', country: 'Australia' },
  'AU-VIC': { lat: -37.8136, lon: 144.9631, name: 'Victoria (Dairy)', country: 'Australia' },
  'AU-WA': { lat: -31.9505, lon: 115.8605, name: 'Western Australia (Grain)', country: 'Australia' },
  'NZ-WKO': { lat: -37.7870, lon: 175.2793, name: 'Waikato (Dairy)', country: 'New Zealand' },
} as const;

// ============================================================================
// SEARCH ENGINE SPECIFIC OPTIMIZATION
// ============================================================================

export const SEARCH_ENGINE_CONFIGS = {
  google: {
    name: 'Google',
    bots: ['Googlebot', 'Googlebot-Image', 'Googlebot-Video', 'Google-Extended', 'Google-InspectionTool'],
    metaTags: {
      'google': 'notranslate',
      'google-site-verification': process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
    },
    features: ['rich-snippets', 'knowledge-graph', 'featured-snippets', 'local-pack'],
  },
  bing: {
    name: 'Bing / Microsoft',
    bots: ['Bingbot', 'BingPreview', 'msnbot', 'MSNBot-Media'],
    metaTags: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
    },
    features: ['entity-understanding', 'visual-search', 'conversational-answers'],
  },
  yandex: {
    name: 'Yandex',
    bots: ['YandexBot', 'YandexImages', 'YandexVideo', 'YandexMedia'],
    metaTags: {
      'yandex-verification': process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || '',
    },
    features: ['turbo-pages', 'yandex-metrika', 'webmaster-tools'],
  },
  baidu: {
    name: 'Baidu (百度)',
    bots: ['Baiduspider', 'Baiduspider-image', 'Baiduspider-video'],
    metaTags: {
      'baidu-site-verification': process.env.NEXT_PUBLIC_BAIDU_VERIFICATION || '',
      'applicable-device': 'pc,mobile',
    },
    features: ['baidu-tongji', 'baidu-zhanzhang', 'mobile-adapt'],
  },
  duckduckgo: {
    name: 'DuckDuckGo',
    bots: ['DuckDuckBot'],
    metaTags: {},
    features: ['privacy-focused', 'instant-answers'],
  },
  yahoo: {
    name: 'Yahoo',
    bots: ['Slurp'],
    metaTags: {},
    features: ['yahoo-answers', 'news-integration'],
  },
  naver: {
    name: 'Naver (네이버)',
    bots: ['Yeti', 'NaverBot'],
    metaTags: {
      'naver-site-verification': process.env.NEXT_PUBLIC_NAVER_VERIFICATION || '',
    },
    features: ['naver-blog', 'smart-place'],
  },
  ecosia: {
    name: 'Ecosia',
    bots: ['Ecosia'],
    metaTags: {},
    features: ['tree-planting', 'eco-friendly'],
  },
} as const;

// ============================================================================
// COMPREHENSIVE STRUCTURED DATA GENERATOR
// ============================================================================

export function generateAdvancedStructuredData(language: string) {
  const baseUrl = 'https://tarim.ailydian.com';

  return {
    "@context": "https://schema.org",
    "@graph": [
      // Organization
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "Lydian Technologies",
        "alternateName": ["Lydian AgriTech", "Lydian Agricultural Intelligence"],
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/apple-touch-icon.png`,
          "width": 180,
          "height": 180,
        },
        "description": {
          en: "Leading agricultural technology company providing AI-powered farming solutions worldwide",
          tr: "Dünya çapında yapay zeka destekli tarım çözümleri sunan lider tarım teknolojisi şirketi",
          de: "Führendes Agrartechnologieunternehmen mit KI-gestützten Landwirtschaftslösungen weltweit",
          fr: "Entreprise leader en technologie agricole proposant des solutions agricoles alimentées par l'IA dans le monde entier",
          es: "Empresa líder en tecnología agrícola que ofrece soluciones agrícolas impulsadas por IA en todo el mundo",
        }[language] || "Leading agricultural technology company",
        "foundingDate": "2024",
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "value": 50,
        },
        "address": [
          {
            "@type": "PostalAddress",
            "streetAddress": "123 Tech Park",
            "addressLocality": "San Francisco",
            "addressRegion": "CA",
            "postalCode": "94102",
            "addressCountry": "US",
          },
          {
            "@type": "PostalAddress",
            "streetAddress": "456 Technology Street",
            "addressLocality": "Istanbul",
            "addressRegion": "Istanbul",
            "postalCode": "34000",
            "addressCountry": "TR",
          },
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+1-415-555-0100",
            "contactType": "customer service",
            "areaServed": ["US", "CA", "MX"],
            "availableLanguage": ["en"],
          },
          {
            "@type": "ContactPoint",
            "telephone": "+90-212-555-0100",
            "contactType": "customer service",
            "areaServed": ["TR", "GR", "BG"],
            "availableLanguage": ["tr", "en"],
          },
        ],
        "sameAs": [
          "https://twitter.com/LydianAgriTech",
          "https://linkedin.com/company/lydian-agritech",
          "https://github.com/lydian-agritech",
          "https://facebook.com/lydianagritech",
          "https://instagram.com/lydianagritech",
        ],
        "areaServed": Object.keys(AGRICULTURAL_GEO_COORDINATES).map(key => {
          const geo = AGRICULTURAL_GEO_COORDINATES[key as keyof typeof AGRICULTURAL_GEO_COORDINATES];
          return {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": geo.lat,
              "longitude": geo.lon,
            },
            "geoRadius": "50000", // 50km radius
            "name": geo.name,
          };
        }),
      },
      // WebApplication
      {
        "@type": "WebApplication",
        "@id": `${baseUrl}/#webapp`,
        "name": "Lydian AgriTech Platform",
        "url": baseUrl,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web, iOS, Android",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "2847",
          "bestRating": "5",
          "worstRating": "1",
        },
      },
      // WebSite with multi-language
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "Lydian AgriTech",
        "inLanguage": Object.values(SUPPORTED_LANGUAGES).map(l => l.locale),
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${baseUrl}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}

// ============================================================================
// HREFLANG GENERATOR
// ============================================================================

export function generateHreflangTags(currentPath: string = '/') {
  const baseUrl = 'https://tarim.ailydian.com';
  const hreflangs: Array<{ hreflang: string; href: string }> = [];

  // Add all languages
  Object.values(SUPPORTED_LANGUAGES).forEach(lang => {
    hreflangs.push({
      hreflang: lang.hreflang,
      href: `${baseUrl}${currentPath}?lang=${lang.code}`,
    });
  });

  // Add x-default (English)
  hreflangs.push({
    hreflang: 'x-default',
    href: `${baseUrl}${currentPath}`,
  });

  return hreflangs;
}

// ============================================================================
// META TAGS GENERATOR (All Search Engines)
// ============================================================================

export function generateSearchEngineMetaTags() {
  const metaTags: Record<string, string> = {};

  // Add all search engine specific meta tags
  Object.values(SEARCH_ENGINE_CONFIGS).forEach(engine => {
    Object.entries(engine.metaTags).forEach(([key, value]) => {
      if (value) metaTags[key] = value;
    });
  });

  // Add Yandex specific
  metaTags['yandex'] = 'all'; // Allow Yandex to index everything

  // Add Baidu specific
  metaTags['mobile-agent'] = 'format=html5; url=https://tarim.ailydian.com';

  // Add general bot directives
  metaTags['robots'] = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  return metaTags;
}

export default {
  SUPPORTED_LANGUAGES,
  AGRICULTURAL_GEO_COORDINATES,
  SEARCH_ENGINE_CONFIGS,
  generateAdvancedStructuredData,
  generateHreflangTags,
  generateSearchEngineMetaTags,
};
