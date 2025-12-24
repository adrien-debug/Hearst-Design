// API Client pour communiquer avec backend-central

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// Dé-doublonnage des requêtes GET "in-flight" (utile en dev avec React StrictMode)
// Objectif: éviter que le serveur voie 2 fois les mêmes appels lors des remounts simulés.
const inFlightGetRequests = new Map<string, Promise<any>>();

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Ajouter le token si présent
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('hearst_token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const method = (options.method || 'GET').toUpperCase();

    // Construire une clé stable pour dé-doublonner les GET
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('hearst_token') : null;
    const dedupeKey = `GET:${url}:auth=${token || 'none'}`;

    if (method === 'GET') {
      const existing = inFlightGetRequests.get(dedupeKey);
      if (existing) {
        return existing as Promise<T>;
      }
    }
    
    const requestPromise = (async () => {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
      });

      if (!response.ok) {
        const error = await response
          .json()
          .catch(() => ({ error: 'Network error' }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }

      return response.json();
    })();

    if (method === 'GET') {
      inFlightGetRequests.set(dedupeKey, requestPromise);
      requestPromise.finally(() => {
        inFlightGetRequests.delete(dedupeKey);
      });
    }

    return requestPromise;
  }

  // Auth
  async login(email: string, password: string) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async verify() {
    return this.request('/api/auth/verify', {
      method: 'GET',
    });
  }

  // Projects
  async getProjects() {
    return this.request('/api/projects', {
      method: 'GET',
    });
  }

  async getProject(id: string) {
    return this.request(`/api/projects/${id}`, {
      method: 'GET',
    });
  }

  async getProjectStats(id: string) {
    return this.request(`/api/projects/${id}/stats`, {
      method: 'GET',
    });
  }

  // Dashboard
  async getDashboardOverview() {
    return this.request('/api/dashboard/overview', {
      method: 'GET',
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

