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
    default: 'Lydian AgriTech Platform Pro - Global Agricultural Intelligence',
    template: '%s | Lydian AgriTech'
  },
  description: 'World\'s most comprehensive agricultural intelligence platform. 30+ crops, 20+ pesticides, real-time data from USDA, NASA, EPA. AI-powered insights, drone management, blockchain supply chain, ESG metrics for modern farming.',
  keywords: [
    'agriculture', 'farming', 'agritech', 'crop management', 'soil analysis',
    'pesticides', 'USDA', 'NASA', 'EPA', 'precision agriculture', 'Lydian',
    'tarım', 'tarım teknolojisi', 'akıllı tarım', 'drone tarım',
    'agricultural intelligence', 'smart farming', 'sustainable agriculture',
    'ESG agriculture', 'blockchain supply chain', 'carbon credits',
    'AI farming', 'satellite imagery', 'crop yield prediction'
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
    title: 'Lydian AgriTech Platform Pro - Global Agricultural Intelligence',
    description: 'Transform your farming with AI-powered insights, real-time data from 18+ sources, drone management, and blockchain transparency. 30+ crops, ESG metrics, B2B marketplace.',
    type: 'website',
    locale: 'tr_TR',
    alternateLocale: ['en_US'],
    siteName: 'Lydian AgriTech Platform Pro',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Lydian AgriTech Platform Pro'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lydian AgriTech Platform Pro',
    description: 'Global Agricultural Intelligence & Big Data Analytics Platform',
    images: ['/og-image.png'],
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
