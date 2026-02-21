import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { DroneProvider } from '@/contexts/DroneContext'
import { LocaleProvider } from '@/contexts/LocaleContext'
import ErrorBoundary from '@/components/ErrorBoundary'
import AilydianEcosystemFooter from '@/components/AilydianEcosystemFooter'
import { ThemeProvider } from '@/lib/theme-provider'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://tarim.ailydian.com'),
  title: {
    default: 'Lydian AgriTech - AI-Powered Agricultural Intelligence Platform | Smart Farming Solutions',
    template: '%s | Lydian AgriTech Platform'
  },
  description: 'Transform agriculture with AI-powered insights. 30+ crop database, 20+ EPA pesticides, real-time USDA/NASA/EPA data integration. Precision farming, drone management, ESG compliance. Trusted by farmers worldwide in 50+ countries.',
  keywords: [
    // English - Primary Keywords (USA, Global)
    'agricultural intelligence platform', 'smart farming software', 'precision agriculture technology',
    'AI crop management', 'farm data analytics', 'agricultural drone software', 'crop yield prediction',
    'USDA data integration', 'NASA satellite farming', 'EPA pesticide database',
    'soil analysis software', 'weather-based farming', 'agtech platform',

    // English - Secondary Keywords
    'sustainable agriculture solutions', 'ESG farming metrics', 'carbon farming credits',
    'farm supply chain management', 'agricultural IoT platform', 'digital farming solutions',
    'crop health monitoring', 'precision spraying technology', 'farm management software',

    // Turkish - Keywords (Turkey, Central Asia)
    'tarım teknolojisi platformu', 'akıllı tarım yazılımı', 'hassas tarım teknolojileri',
    'yapay zeka tarım yönetimi', 'tarımsal veri analizi', 'tarım drone yazılımı',
    'ürün verimi tahmini', 'toprak analiz yazılımı', 'tarımsal istihbarat',
    'sürdürülebilir tarım çözümleri', 'tarımda ESG', 'dijital tarım çözümleri',

    // German - Keywords (Germany, Austria, Switzerland)
    'Landwirtschaft Technologie', 'Smart Farming Software', 'Präzisionslandwirtschaft',
    'KI Landwirtschaft', 'Agrartechnologie Plattform',

    // French - Keywords (France, Belgium, Africa)
    'technologie agricole', 'agriculture intelligente', 'agriculture de précision',
    'plateforme agritech', 'gestion agricole IA',

    // Spanish - Keywords (Spain, Latin America)
    'tecnología agrícola', 'agricultura inteligente', 'agricultura de precisión',
    'plataforma agritech', 'gestión agrícola IA',

    // Italian - Keywords (Italy)
    'tecnologia agricola', 'agricoltura intelligente', 'agricoltura di precisione',

    // Portuguese - Keywords (Brazil, Portugal)
    'tecnologia agrícola', 'agricultura inteligente', 'agricultura de precisão',
    'plataforma agritech', 'gestão agrícola IA',

    // Russian - Keywords (Russia, Eastern Europe)
    'сельскохозяйственные технологии', 'умное фермерство', 'точное земледелие',

    // Chinese - Keywords (China, Asia)
    '农业技术', '智能农业', '精准农业', '农业物联网',

    // Japanese - Keywords (Japan)
    '農業技術', 'スマート農業', '精密農業',

    // Arabic - Keywords (Middle East, North Africa)
    'تكنولوجيا زراعية', 'زراعة ذكية', 'زراعة دقيقة',

    // Location-Based Keywords (Multi-region)
    'agriculture technology USA Canada Mexico', 'farming software Europe Turkey',
    'agtech solutions Asia China India', 'agricultural AI Latin America Brazil',
    'smart farming Africa Middle East', 'precision agriculture Australia',

    // Industry-Specific (Global)
    'enterprise agriculture platform', 'commercial farming software', 'agricultural big data',
    'farm-to-table technology', 'regenerative agriculture tech', 'vertical farming software',
    'hydroponic management', 'greenhouse automation', 'livestock monitoring',

    // Brands & Organizations
    'Lydian AgriTech', 'USDA NASS integration', 'NASA POWER data', 'EPA pesticide compliance'
  ],
  authors: [{ name: 'Lydian', url: 'https://tarim.ailydian.com' }],
  creator: 'Lydian',
  publisher: 'Lydian',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Lydian AgriTech - AI-Powered Agricultural Intelligence | Transform Your Farm',
    description: 'Join 2,847 farmers worldwide using AI-powered agriculture. Real-time USDA/NASA/EPA data, 30+ crops, drone integration, ESG compliance. Trusted in 50+ countries.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: [
      'tr_TR', 'en_GB', 'de_DE', 'fr_FR', 'es_ES', 'it_IT', 'pt_BR',
      'ru_RU', 'zh_CN', 'ja_JP', 'ar_SA', 'en_CA', 'en_AU', 'en_IN',
      'fr_CA', 'es_MX', 'pt_PT', 'de_AT', 'de_CH', 'fr_BE', 'nl_NL'
    ],
    siteName: 'Lydian AgriTech',
    url: 'https://tarim.ailydian.com',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Lydian AgriTech - Smart Farming Dashboard with AI Analytics',
        type: 'image/png',
      }
    ],
    countryName: 'Global',
    emails: ['info@ailydian.com', 'support@ailydian.com'],
    phoneNumbers: ['+1-415-555-0100', '+90-212-555-0100'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@LydianAgriTech',
    creator: '@LydianAgriTech',
    title: 'Lydian AgriTech - AI-Powered Agricultural Intelligence Platform',
    description: 'Smart farming solutions with 30+ crops, EPA pesticides, real-time USDA/NASA data. Precision agriculture made simple.',
    images: {
      url: '/og-image.png',
      alt: 'Lydian AgriTech Dashboard',
    },
  },
  alternates: {
    canonical: 'https://tarim.ailydian.com',
    languages: {
      // Primary Languages
      'en': 'https://tarim.ailydian.com?lang=en',
      'en-US': 'https://tarim.ailydian.com?lang=en',
      'tr': 'https://tarim.ailydian.com?lang=tr',
      'tr-TR': 'https://tarim.ailydian.com?lang=tr',

      // European Languages
      'de': 'https://tarim.ailydian.com?lang=de',
      'de-DE': 'https://tarim.ailydian.com?lang=de',
      'fr': 'https://tarim.ailydian.com?lang=fr',
      'fr-FR': 'https://tarim.ailydian.com?lang=fr',
      'es': 'https://tarim.ailydian.com?lang=es',
      'es-ES': 'https://tarim.ailydian.com?lang=es',
      'it': 'https://tarim.ailydian.com?lang=it',
      'it-IT': 'https://tarim.ailydian.com?lang=it',
      'pt': 'https://tarim.ailydian.com?lang=pt',
      'pt-BR': 'https://tarim.ailydian.com?lang=pt',

      // Eastern European & Russian
      'ru': 'https://tarim.ailydian.com?lang=ru',
      'ru-RU': 'https://tarim.ailydian.com?lang=ru',

      // Asian Languages
      'zh': 'https://tarim.ailydian.com?lang=zh',
      'zh-CN': 'https://tarim.ailydian.com?lang=zh',
      'zh-Hans': 'https://tarim.ailydian.com?lang=zh',
      'ja': 'https://tarim.ailydian.com?lang=ja',
      'ja-JP': 'https://tarim.ailydian.com?lang=ja',

      // Middle Eastern
      'ar': 'https://tarim.ailydian.com?lang=ar',
      'ar-SA': 'https://tarim.ailydian.com?lang=ar',

      // Default fallback
      'x-default': 'https://tarim.ailydian.com',
    },
  },
  other: {
    // ===== GEO-TARGETING - TOP 50 AGRICULTURAL REGIONS =====
    'geo.region': 'US-CA;US-IA;US-TX;TR-34;TR-06;TR-35;BR-SP;BR-MT;AR-BA;CN-HEB;CN-SD;IN-PB;DE-BY;FR-IDF;ES-AN;IT-EM;RU-MOW;AU-NSW;CA-SK;MX-SON',
    'geo.placename': 'California;Iowa;Texas;Istanbul;Ankara;Izmir;Sao Paulo;Mato Grosso;Buenos Aires;Hebei;Shandong;Punjab;Bavaria;Paris;Andalusia;Emilia-Romagna;Moscow;New South Wales;Saskatchewan;Sonora',
    'geo.position': '36.7783,-119.4179;42.0046,-93.2140;31.9686,-99.9018;41.0082,28.9784;39.9334,32.8597;38.4192,27.1287;-23.5505,-46.6333;-12.6819,-56.9211;-34.6037,-58.3816;39.9042,116.4074;36.6512,117.1200;30.7333,76.7794',
    'ICBM': '36.7783, -119.4179', // Primary location (California)

    // ===== SEARCH ENGINE VERIFICATIONS =====
    // Google
    'google-site-verification': process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || 'pending',
    'google': 'notranslate',

    // Bing / Microsoft
    'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || 'pending',

    // Yandex (Russia, Turkey)
    'yandex-verification': process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || 'pending',
    'yandex': 'all',

    // Baidu (China)
    'baidu-site-verification': process.env.NEXT_PUBLIC_BAIDU_VERIFICATION || 'pending',
    'applicable-device': 'pc,mobile',

    // Naver (South Korea)
    'naver-site-verification': process.env.NEXT_PUBLIC_NAVER_VERIFICATION || 'pending',

    // Pinterest
    'p:domain_verify': process.env.NEXT_PUBLIC_PINTEREST_VERIFICATION || 'pending',

    // Facebook / Meta
    'facebook-domain-verification': process.env.NEXT_PUBLIC_FACEBOOK_VERIFICATION || 'pending',

    // ===== MOBILE APP =====
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Lydian AgriTech',
    'mobile-agent': 'format=html5; url=https://tarim.ailydian.com',

    // ===== CONTENT CLASSIFICATION =====
    'rating': 'general',
    'distribution': 'global',
    'classification': 'Agriculture Technology, Smart Farming, Precision Agriculture, AgTech Platform',
    'audience': 'farmers, agricultural businesses, agtech companies, agricultural researchers',
    'target': 'all',

    // ===== DUBLIN CORE METADATA =====
    'DC.title': 'Lydian AgriTech - AI-Powered Agricultural Intelligence Platform',
    'DC.creator': 'Lydian Technologies',
    'DC.subject': 'Agriculture; Farming; AgTech; Artificial Intelligence; Precision Agriculture; Smart Farming; Crop Management; Drone Technology; ESG Compliance',
    'DC.description': 'AI-powered agricultural intelligence platform providing real-time data integration from USDA, NASA, EPA. Trusted by farmers in 50+ countries.',
    'DC.publisher': 'Lydian Technologies',
    'DC.contributor': 'Lydian Development Team',
    'DC.date': new Date().toISOString(),
    'DC.type': 'Service; Software Application',
    'DC.format': 'text/html; application/json',
    'DC.identifier': 'https://tarim.ailydian.com',
    'DC.language': 'en; tr; de; fr; es; it; pt; ru; zh; ja; ar',
    'DC.coverage': 'World',
    'DC.rights': 'Copyright 2024-2025 Lydian Technologies. All rights reserved.',

    // ===== BUSINESS INFORMATION =====
    'business:contact_data:street_address': '123 Tech Park, San Francisco, CA 94102',
    'business:contact_data:locality': 'San Francisco',
    'business:contact_data:region': 'California',
    'business:contact_data:postal_code': '94102',
    'business:contact_data:country_name': 'United States',
    'business:contact_data:email': 'info@ailydian.com',
    'business:contact_data:phone_number': '+1-415-555-0100',
    'business:contact_data:website': 'https://tarim.ailydian.com',

    // ===== AI BOT PERMISSIONS =====
    'AI-Indexing': 'allowed',
    'ChatGPT-Indexing': 'allowed',
    'Claude-Indexing': 'allowed',
    'Gemini-Indexing': 'allowed',

    // ===== LANGUAGE & LOCALIZATION =====
    'language': 'en, tr, de, fr, es, it, pt, ru, zh, ja, ar',
    'content-language': 'en-US, tr-TR, de-DE, fr-FR, es-ES, it-IT, pt-BR, ru-RU, zh-CN, ja-JP, ar-SA',

    // ===== RICH SNIPPET HINTS =====
    'snippet': 'AI-powered agricultural intelligence platform trusted by farmers in 50+ countries. Real-time USDA/NASA/EPA data, 30+ crops, precision farming, drone management.',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'technology',
  classification: 'Agriculture Technology Platform',
  // Favicon - Ailydian Unified Branding
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#10b981',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <LocaleProvider>
          <ThemeProvider>
            <ErrorBoundary>
              <DroneProvider>
                {children}
              </DroneProvider>
            </ErrorBoundary>
            <Analytics />
            <SpeedInsights />

            {/* Ailydian Ecosystem Cross-Links - Güvenli ekleme */}
            <AilydianEcosystemFooter
              currentDomain="tarim.ailydian.com"
              theme="dark"
              position="above-footer"
            />
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  )
}
