'use client';

import { useEffect } from 'react';

/**
 * Page de login du frontend-central
 * Redirige automatiquement vers le backend-central qui gère l'authentification
 */
export default function LoginPage() {
  useEffect(() => {
    // Rediriger vers la page de login du backend-central
    window.location.href = 'http://localhost:4000/login';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-hearst-green to-hearst-green-dark p-4 shadow-glow-green animate-pulse">
          <svg className="w-full h-full text-hearst-black" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">HEARST CONTROL</h1>
        <p className="text-white/40">Redirection vers la page de connexion...</p>
      </div>
    </div>
  );
}
