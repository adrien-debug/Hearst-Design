import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Strategic Reserve Qatar - Hearst Mining',
  description: '30 Containers | 9,240 Miners | 4.37 EH/s - Mining Operations Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  )
}
