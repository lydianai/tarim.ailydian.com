import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

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
  title: 'AgriTech Platform Pro by Lydian',
  description: 'World\'s most comprehensive agricultural intelligence platform. 30+ crops, 20+ pesticides, real-time data from USDA, NASA, EPA. AI-powered insights for modern farming.',
  keywords: ['agriculture', 'farming', 'agritech', 'crop management', 'soil analysis', 'pesticides', 'USDA', 'NASA', 'precision agriculture', 'Lydian'],
  authors: [{ name: 'Lydian' }],
  creator: 'Lydian',
  publisher: 'Lydian',
  robots: 'index, follow',
  openGraph: {
    title: 'AgriTech Platform Pro by Lydian',
    description: 'Global Agricultural Intelligence & Big Data Analytics',
    type: 'website',
  },
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
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
