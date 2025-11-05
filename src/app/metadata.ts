import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Fittar IA - Seu Personal Trainer com Inteligência Artificial',
  description: 'Seu personal trainer com inteligência artificial - treinos personalizados, nutrição inteligente, comunidade fitness e desafios motivadores.',
  keywords: [
    'fitness',
    'emagrecimento', 
    'hipertrofia',
    'inteligência artificial',
    'treino personalizado',
    'nutrição',
    'comunidade fitness',
    'desafios',
    'personal trainer',
    'dieta',
    'exercícios',
    'saúde',
    'fittar',
    'ai fitness'
  ],
  authors: [{ name: 'Fittar Team' }],
  creator: 'Fittar IA',
  publisher: 'Fittar IA',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://fittar-ia.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/pt-BR',
      'en-US': '/en-US',
      'es-ES': '/es-ES',
      'fr-FR': '/fr-FR',
      'de-DE': '/de-DE',
      'it-IT': '/it-IT',
      'ja-JP': '/ja-JP',
      'ko-KR': '/ko-KR',
      'zh-CN': '/zh-CN',
    },
  },
  openGraph: {
    title: 'Fittar IA - Seu Personal Trainer com IA',
    description: 'Transforme seu corpo com IA: treinos personalizados, nutrição inteligente e comunidade motivadora. Disponível para iOS e Android.',
    url: 'https://fittar-ia.vercel.app',
    siteName: 'Fittar IA',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fittar IA - App de Fitness com Inteligência Artificial',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fittar IA - Personal Trainer com IA',
    description: 'App completo de fitness: treinos IA, nutrição personalizada, comunidade e desafios. Baixe grátis!',
    images: ['/twitter-image.png'],
    creator: '@fittaria',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.svg',
    shortcut: '/shortcut-icon.png',
    apple: '/apple-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  appleWebApp: {
    title: 'Fittar IA',
    statusBarStyle: 'default',
    capable: true,
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
    yahoo: 'yahoo-site-verification-code',
  },
  category: 'health',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#6366F1' },
    { media: '(prefers-color-scheme: dark)', color: '#4F46E5' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}