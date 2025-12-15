import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Schnee Info - Premium Ski Resort Conditions',
  description: 'Real-time ski resort conditions, weather forecasts, and snow reports for top resorts worldwide',
  keywords: 'ski, snow, resort, weather, forecast, conditions, webcams',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
