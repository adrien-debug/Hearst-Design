'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  role: string
  tenant_id: string
}

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      router.push('/login')
      return
    }

    setUser(JSON.parse(userData))
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-hearst-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-hearst-green"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-hearst-dark via-hearst-gray to-hearst-dark">
      {/* Header */}
      <header className="bg-hearst-gray/50 backdrop-blur-sm border-b border-hearst-green/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-hearst-green/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎨</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Hearst Design</h1>
                <p className="text-sm text-gray-400">Design Management Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-white">{user?.email}</p>
                <p className="text-xs text-gray-400">{user?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-hearst-green/10 hover:bg-hearst-green/20 text-hearst-green rounded-lg transition-colors text-sm font-medium"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Bienvenue sur Hearst Design
          </h2>
          <p className="text-gray-400">
            Plateforme de gestion de design et prototypage
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-hearst-gray/50 backdrop-blur-sm rounded-xl p-6 border border-hearst-green/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Projets</h3>
              <span className="text-2xl">📁</span>
            </div>
            <p className="text-3xl font-bold text-hearst-green">0</p>
            <p className="text-sm text-gray-400 mt-2">Projets actifs</p>
          </div>

          <div className="bg-hearst-gray/50 backdrop-blur-sm rounded-xl p-6 border border-hearst-green/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Prototypes</h3>
              <span className="text-2xl">🎨</span>
            </div>
            <p className="text-3xl font-bold text-hearst-green">0</p>
            <p className="text-sm text-gray-400 mt-2">En développement</p>
          </div>

          <div className="bg-hearst-gray/50 backdrop-blur-sm rounded-xl p-6 border border-hearst-green/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Assets</h3>
              <span className="text-2xl">🖼️</span>
            </div>
            <p className="text-3xl font-bold text-hearst-green">0</p>
            <p className="text-sm text-gray-400 mt-2">Fichiers design</p>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-hearst-gray/50 backdrop-blur-sm rounded-xl p-8 border border-hearst-green/20">
          <div className="text-center">
            <div className="mb-6">
              <span className="text-6xl">🚀</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Plateforme en développement
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Le dashboard Hearst Design est en cours de développement. 
              Les fonctionnalités de gestion de projets, prototypes et assets 
              seront bientôt disponibles.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

