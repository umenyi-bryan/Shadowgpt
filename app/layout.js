import './globals.css'

export const metadata = {
  title: 'ShadowGPT v6.0 - Ultimate Pentesting AI',
  description: 'Created by bedusec - The most advanced multilingual pentesting AI platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-100 text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
