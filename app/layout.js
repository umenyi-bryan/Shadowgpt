import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ShadowGPT v6.0 - Ultimate Pentesting AI',
  description: 'Advanced multilingual cybersecurity AI platform by bedusec',
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
