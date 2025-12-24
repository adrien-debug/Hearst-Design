/* ============================================
   HEARST API MOCK - Données mockées
   Simule les réponses du backend port 3201
   ============================================ */

// Données du projet Hearst Design
const mockData = {
    project: {
        id: 'DESIGN-001',
        name: 'Hearst Design',
        status: 'active',
        total_containers: 20,
        total_miners: 6160,
        total_hashrate_ths: 2913680,
        total_hashrate_ehs: 2.91,
        total_power_kw: 34960,
        total_power_mw: 34.96,
        container_model: 'ANTSPACE HD5',
        miner_model: 'S21XP Hydro',
        miners_per_container: 308,
        hashrate_per_miner: 473,
        power_per_miner: 5676,
        location: 'USA'
    },

    users: [
        {
            id: 1,
            name: 'Admin Design',
            email: 'admin@design.hearst.com',
            password: 'Design2025!Admin',
            role: 'admin',
            project_id: 'DESIGN-001'
        },
        {
            id: 2,
            name: 'Manager Design',
            email: 'manager@design.hearst.com',
            password: 'Design2025!Manager',
            role: 'manager',
            project_id: 'DESIGN-001'
        },
        {
            id: 3,
            name: 'Operator Design',
            email: 'operator@design.hearst.com',
            password: 'Design2025!Operator',
            role: 'operator',
            project_id: 'DESIGN-001'
        }
    ],

    // Génération des 20 containers
    containers: [...Array(20)].map((_, i) => ({
        id: `DESIGN-C${String(i + 1).padStart(3, '0')}`,
        name: `Container ${i + 1}`,
        model: 'ANTSPACE HD5',
        status: 'operational',
        miners_count: 308,
        online_miners: 308,
        offline_miners: 0,
        total_hashrate_ths: 308 * 473,
        total_power_kw: (308 * 5676) / 1000,
        avg_temperature: 40 + Math.random() * 5,
        location: 'USA',
        miner_model: 'S21XP Hydro'
    })),

    // Génération des 6,160 miners
    get miners() {
        return [...Array(6160)].map((_, i) => {
            const containerIndex = Math.floor(i / 308);
            return {
                id: `DESIGN-M${String(i + 1).padStart(4, '0')}`,
                container_id: `DESIGN-C${String(containerIndex + 1).padStart(3, '0')}`,
                model: 'S21XP Hydro',
                status: 'online',
                hashrate_ths: 473,
                power_w: 5676,
                temperature: 40 + Math.random() * 5,
                uptime: 99.8,
                efficiency: 12
            };
        });
    },

    // Métriques en temps réel
    get metrics() {
        return {
            total_containers: 20,
            operational_containers: 20,
            maintenance_containers: 0,
            offline_containers: 0,
            total_miners: 6160,
            online_miners: 6160,
            offline_miners: 0,
            maintenance_miners: 0,
            total_hashrate_ths: 2913680,
            total_hashrate_ehs: 2.91,
            total_power_kw: 34960,
            total_power_mw: 34.96,
            average_temperature: 41.8,
            efficiency: 12,
            uptime_percentage: 99.8,
            timestamp: new Date().toISOString()
        };
    },

    // Historique hashrate (24h - 6 points)
    get hashrateHistory() {
        const now = Date.now();
        return [...Array(24)].map((_, i) => ({
            timestamp: new Date(now - (23 - i) * 3600000).toISOString(),
            hashrate_ths: 2913680 + (Math.random() - 0.5) * 50000,
            hashrate_ehs: 2.91 + (Math.random() - 0.5) * 0.05
        }));
    },

    // Historique power (24h)
    get powerHistory() {
        const now = Date.now();
        return [...Array(24)].map((_, i) => ({
            timestamp: new Date(now - (23 - i) * 3600000).toISOString(),
            power_kw: 34960 + (Math.random() - 0.5) * 500,
            power_mw: 34.96 + (Math.random() - 0.5) * 0.5
        }));
    },

    // Alertes
    alerts: [
        {
            id: 1,
            severity: 'warning',
            message: 'High temperature detected on Container C-012',
            source: 'DESIGN-C012',
            timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
            status: 'active'
        },
        {
            id: 2,
            severity: 'info',
            message: 'Scheduled maintenance completed',
            source: 'System',
            timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
            status: 'resolved'
        }
    ]
};

/* ============================================
   API MOCK FUNCTIONS
   ============================================ */

const API = {
    // Authentification
    login(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = mockData.users.find(u => u.email === email && u.password === password);
                if (user) {
                    const { password, ...userWithoutPassword } = user;
                    resolve({
                        success: true,
                        token: 'mock-jwt-token-' + Date.now(),
                        user: userWithoutPassword
                    });
                } else {
                    reject({ error: 'Invalid credentials' });
                }
            }, 500);
        });
    },

    // Projet
    getProject() {
        return new Promise(resolve => {
            setTimeout(() => resolve(mockData.project), 300);
        });
    },

    // Métriques
    getMetrics() {
        return new Promise(resolve => {
            setTimeout(() => resolve(mockData.metrics), 300);
        });
    },

    getHashrateHistory() {
        return new Promise(resolve => {
            setTimeout(() => resolve(mockData.hashrateHistory), 300);
        });
    },

    getPowerHistory() {
        return new Promise(resolve => {
            setTimeout(() => resolve(mockData.powerHistory), 300);
        });
    },

    // Containers
    getContainers(filters = {}) {
        return new Promise(resolve => {
            setTimeout(() => {
                let containers = [...mockData.containers];
                
                if (filters.status) {
                    containers = containers.filter(c => c.status === filters.status);
                }
                
                resolve({
                    total: containers.length,
                    containers: containers
                });
            }, 300);
        });
    },

    getContainer(id) {
        return new Promise(resolve => {
            setTimeout(() => {
                const container = mockData.containers.find(c => c.id === id);
                resolve(container);
            }, 300);
        });
    },

    // Miners
    getMiners(filters = {}) {
        return new Promise(resolve => {
            setTimeout(() => {
                let miners = mockData.miners;
                
                if (filters.status) {
                    miners = miners.filter(m => m.status === filters.status);
                }
                
                if (filters.container_id) {
                    miners = miners.filter(m => m.container_id === filters.container_id);
                }
                
                if (filters.search) {
                    miners = miners.filter(m => 
                        m.id.toLowerCase().includes(filters.search.toLowerCase())
                    );
                }
                
                // Pagination
                const page = filters.page || 1;
                const per_page = filters.per_page || 50;
                const start = (page - 1) * per_page;
                const end = start + per_page;
                
                resolve({
                    total: miners.length,
                    page: page,
                    per_page: per_page,
                    total_pages: Math.ceil(miners.length / per_page),
                    miners: miners.slice(start, end)
                });
            }, 300);
        });
    },

    getMiner(id) {
        return new Promise(resolve => {
            setTimeout(() => {
                const miner = mockData.miners.find(m => m.id === id);
                resolve(miner);
            }, 300);
        });
    },

    // Alertes
    getAlerts(filters = {}) {
        return new Promise(resolve => {
            setTimeout(() => {
                let alerts = [...mockData.alerts];
                
                if (filters.status) {
                    alerts = alerts.filter(a => a.status === filters.status);
                }
                
                if (filters.severity) {
                    alerts = alerts.filter(a => a.severity === filters.severity);
                }
                
                resolve({
                    total: alerts.length,
                    alerts: alerts
                });
            }, 300);
        });
    }
};

// Export pour utilisation globale
window.HearstAPI = API;
window.mockData = mockData;

