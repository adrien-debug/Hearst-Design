import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hearst Control - Plateforme Multi-Projets',
  description: 'Interface centralisée pour la gestion des projets Hearst',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {/* Background Pattern */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="bg-grid-pattern absolute inset-0" />
          <div className="glow-effect" />
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}

