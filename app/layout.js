import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BEDUSEC AI NEXUS | ShadowGPT - Advanced NeuroEvolutionary Intelligence',
  description: 'Securing the digital frontier while lurking in darkness. Advanced AI with neural networks, self-learning algorithms, and real-time threat intelligence.',
  keywords: ['cybersecurity', 'AI', 'neural networks', 'BEDUSEC', 'threat intelligence', 'self-learning AI'],
  authors: [{ name: 'BEDUSEC Team' }],
  creator: 'BEDUSEC',
  publisher: 'BEDUSEC',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shadowgpt-eight.vercel.app',
    title: 'BEDUSEC AI NEXUS | Advanced NeuroEvolutionary Intelligence',
    description: 'Securing the digital frontier while lurking in darkness',
    siteName: 'ShadowGPT',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BEDUSEC AI NEXUS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BEDUSEC AI NEXUS | ShadowGPT',
    description: 'Advanced NeuroEvolutionary Intelligence Platform',
    images: ['/og-image.png'],
    creator: '@bedusec',
  },
  verification: {
    google: 'verification_token',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0a0a0f" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        <div className="fixed inset-0 bg-gradient-to-br from-dark-100 via-dark-200 to-dark-300 -z-10"></div>
        {children}
      </body>
    </html>
  )
}
