import './globals.css'

export const metadata = {
  title: 'BEDUSEC AI NEXUS | ShadowGPT',
  description: 'Securing the digital frontier while lurking in darkness. Advanced AI with neural networks and cybersecurity intelligence.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
