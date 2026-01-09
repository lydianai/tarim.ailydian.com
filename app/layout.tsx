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
  description: 'Transform agriculture with AI-powered insights. 30+ crop database, 20+ EPA pesticides, real-time USDA/NASA/EPA data integration. Precision farming, drone management, ESG compliance. Trusted by farmers in Turkey & USA.',
  keywords: [
    // English - Primary Keywords (USA)
    'agricultural intelligence platform', 'smart farming software', 'precision agriculture technology',
    'AI crop management', 'farm data analytics', 'agricultural drone software', 'crop yield prediction',
    'USDA data integration', 'NASA satellite farming', 'EPA pesticide database',
    'soil analysis software', 'weather-based farming', 'agtech platform',

    // English - Secondary Keywords
    'sustainable agriculture solutions', 'ESG farming metrics', 'carbon farming credits',
    'farm supply chain management', 'agricultural IoT platform', 'digital farming solutions',
    'crop health monitoring', 'precision spraying technology', 'farm management software',

    // Turkish - Primary Keywords (Turkey)
    'tarım teknolojisi platformu', 'akıllı tarım yazılımı', 'hassas tarım teknolojileri',
    'yapay zeka tarım yönetimi', 'tarımsal veri analizi', 'tarım drone yazılımı',
    'ürün verimi tahmini', 'toprak analiz yazılımı', 'tarımsal istihbarat',

    // Turkish - Secondary Keywords
    'sürdürülebilir tarım çözümleri', 'tarımda ESG', 'karbon kredisi tarım',
    'tarımsal tedarik zinciri', 'dijital tarım çözümleri', 'tarım IoT platformu',
    'ürün sağlığı izleme', 'hassas ilaçlama teknolojisi', 'çiftlik yönetim yazılımı',

    // Location-Based Keywords
    'agriculture technology USA', 'farming software Turkey', 'agtech solutions United States',
    'tarım teknolojisi Türkiye', 'agricultural AI America', 'akıllı tarım Türkiye',

    // Industry-Specific
    'enterprise agriculture platform', 'commercial farming software', 'agricultural big data',
    'farm-to-table technology', 'regenerative agriculture tech', 'vertical farming software',

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
    description: 'Join 1000+ farmers using AI-powered agriculture. Real-time USDA/NASA/EPA data, 30+ crops, drone integration, ESG compliance. Free trial available for Turkey & USA farms.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['tr_TR', 'en_GB'],
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
      'en-US': 'https://tarim.ailydian.com',
      'tr-TR': 'https://tarim.ailydian.com',
      'en': 'https://tarim.ailydian.com',
      'tr': 'https://tarim.ailydian.com',
    },
  },
  other: {
    // Geo-targeting
    'geo.region': 'US-CA;TR-34', // California, USA & Istanbul, Turkey
    'geo.placename': 'United States;Turkey',
    'geo.position': '37.7749;-122.4194;41.0082;28.9784', // San Francisco & Istanbul coordinates

    // Mobile App
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Lydian AgriTech',

    // Google Site Verification
    'google-site-verification': 'your-google-verification-code',

    // Facebook Domain Verification
    'facebook-domain-verification': 'your-facebook-verification-code',

    // Rating
    'rating': 'general',
    'distribution': 'global',

    // Business/Organization
    'DC.title': 'Lydian AgriTech - Agricultural Intelligence Platform',
    'DC.creator': 'Lydian Technologies',
    'DC.subject': 'Agriculture, Farming, AgTech, AI, Precision Agriculture',
    'DC.description': 'AI-powered agricultural intelligence platform for smart farming',
    'DC.publisher': 'Lydian Technologies',
    'DC.contributor': 'Lydian Development Team',
    'DC.type': 'Service',
    'DC.format': 'text/html',
    'DC.language': 'en',
    'DC.coverage': 'World',
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
