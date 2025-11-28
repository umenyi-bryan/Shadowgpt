import './globals.css'

export const metadata = {
  title: 'ShadowGPT - Advanced Pentesting AI',
  description: 'Created by bedusec - Your ultimate ethical hacking assistant',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-200 text-white">{children}</body>
    </html>
  )
}
