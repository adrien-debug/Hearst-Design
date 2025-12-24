'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@hearstmining.com');
  const [password, setPassword] = useState('SecureQatar2024!');
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
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Hearst Control</h1>
          <p className="text-gray-600 mt-2">Mining Operations Dashboard</p>
          <p className="text-sm text-gray-500 mt-1">
            58 Containers | 17,864 Miners | 8.45 EH/s
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="admin@hearstmining.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed font-medium transition-colors"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 space-y-4">
          <div className="text-center text-xs text-gray-400">
            <p className="font-semibold mb-2">🚀 DÉVELOPPEMENT - COMPTES PRÉ-REMPLIS</p>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => {
                setEmail('admin@hearstmining.com');
                setPassword('SecureQatar2024!');
                setError('');
              }}
              className="px-3 py-2 text-xs bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors font-medium"
            >
              👑 Admin
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail('manager@hearstmining.com');
                setPassword('ManagerQatar2024!');
                setError('');
              }}
              className="px-3 py-2 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors font-medium"
            >
              👔 Manager
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail('operator@hearstmining.com');
                setPassword('OperatorQatar2024!');
                setError('');
              }}
              className="px-3 py-2 text-xs bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors font-medium"
            >
              ⚙️ Operator
            </button>
          </div>
          
          <p className="text-center text-xs text-gray-400">
            Cliquez sur un rôle pour charger les identifiants
          </p>
        </div>
      </div>
    </div>
  );
}
