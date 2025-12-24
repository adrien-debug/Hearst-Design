'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';
import Image from 'next/image';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@srq.qa');
  const [password, setPassword] = useState('SecureSRQ2024!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(email, password);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Échec de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-hearst-green/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-hearst-green/3 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(138, 253, 129, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(138, 253, 129, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-fade-in">
        <div className="card p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-hearst-green rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-xl">H</span>
              </div>
              <span className="text-xl font-semibold tracking-wide text-white uppercase">
                HEARST
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Strategic Reserve Qatar
            </h1>
            <p className="text-grey-500 text-sm">
              Mining Operations Dashboard
            </p>
          </div>

          {/* Stats Preview */}
          <div className="grid grid-cols-3 gap-3 mb-8 p-4 bg-dark-600 rounded-xl border border-grey-100">
            <div className="text-center">
              <p className="text-hearst-green font-mono font-bold text-lg">30</p>
              <p className="text-grey-500 text-xs uppercase tracking-wider">Containers</p>
            </div>
            <div className="text-center border-x border-grey-100">
              <p className="text-hearst-green font-mono font-bold text-lg">9,240</p>
              <p className="text-grey-500 text-xs uppercase tracking-wider">Miners</p>
            </div>
            <div className="text-center">
              <p className="text-hearst-green font-mono font-bold text-lg">4.37</p>
              <p className="text-grey-500 text-xs uppercase tracking-wider">EH/s</p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-grey-500 mb-2 uppercase tracking-wider">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="votre@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-grey-500 mb-2 uppercase tracking-wider">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-error/10 border border-error/30 rounded-lg text-error text-sm">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-base"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Connexion...
                </span>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          {/* Quick Login Buttons */}
          <div className="mt-6 space-y-3">
            <div className="text-center text-xs text-grey-500 uppercase tracking-wider">
              🚀 Développement - Comptes rapides
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@srq.qa');
                  setPassword('SecureSRQ2024!');
                  setError('');
                }}
                className="px-3 py-2 text-xs bg-hearst-green/10 text-hearst-green rounded-lg hover:bg-hearst-green/20 transition-all border border-hearst-green/30 font-medium"
              >
                👑 Admin
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('manager@srq.qa');
                  setPassword('ManagerSRQ2024!');
                  setError('');
                }}
                className="px-3 py-2 text-xs bg-grey-700 text-grey-300 rounded-lg hover:bg-grey-600 transition-all border border-grey-600 font-medium"
              >
                👔 Manager
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('operator@srq.qa');
                  setPassword('OperatorSRQ2024!');
                  setError('');
                }}
                className="px-3 py-2 text-xs bg-grey-700 text-grey-300 rounded-lg hover:bg-grey-600 transition-all border border-grey-600 font-medium"
              >
                ⚙️ Operator
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-grey-100 text-center">
            <p className="text-grey-500 text-xs">
              © 2025 Hearst Mining · SRQ-001
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
