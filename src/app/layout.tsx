import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fittar IA - Seu Personal Trainer com Inteligência Artificial',
  description: 'Seu personal trainer com inteligência artificial - treinos personalizados, nutrição inteligente, comunidade fitness e desafios motivadores.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Fittar IA',
  },
  formatDetection: {
    telephone: false,
  },
}

export const viewport: Viewport = {
  themeColor: '#6366F1',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Fittar IA" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#6366F1" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className="font-inter antialiased">
        {children}
      </body>
    </html>
  )
}