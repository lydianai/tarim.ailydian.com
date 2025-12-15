import type { Metadata, Viewport } from 'next'
import './globals.css'

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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
