import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AgriTech Platform - Smart Agriculture Analytics',
  description: 'Advanced agricultural platform with real-time soil analysis, crop yield prediction, and pesticide optimization',
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
