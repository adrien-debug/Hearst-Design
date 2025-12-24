const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/design'

export interface LoginCredentials {
  email: string
  password: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

class ApiClient {
  private baseUrl: string
  private token: string | null = null

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token')
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token)
    }
  }

  clearToken() {
    this.token = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Une erreur est survenue',
        }
      }

      return {
        success: true,
        data,
      }
    } catch (error) {
      console.error('API Error:', error)
      return {
        success: false,
        error: 'Erreur de connexion au serveur',
      }
    }
  }

  // Auth endpoints
  async login(credentials: LoginCredentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  }

  async logout() {
    this.clearToken()
    return { success: true }
  }

  // Projects endpoints
  async getProjects() {
    return this.request('/projects', {
      method: 'GET',
    })
  }

  async getProject(id: string) {
    return this.request(`/projects/${id}`, {
      method: 'GET',
    })
  }

  // Add more endpoints as needed
}

export const apiClient = new ApiClient(API_URL)
export default apiClient

