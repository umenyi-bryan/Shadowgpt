import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ShadowGPT v6.0 - Hybrid AI Cybersecurity Assistant',
  description: 'Online + Offline AI for cybersecurity. 100% free, no API keys needed.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-dark-100 text-white`}>
        {children}
      </body>
    </html>
  )
}
