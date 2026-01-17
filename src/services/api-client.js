import axios from 'axios';

// Base URL für dein Spring Boot Backend
const API_BASE_URL = 'http://localhost:8080/api';

// Axios Instance mit Basis-Konfiguration
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 Sekunden Timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

// ===================================
// REQUEST INTERCEPTOR
// ===================================
// Wird AUTOMATISCH vor JEDEM Request ausgeführt
apiClient.interceptors.request.use(
    (config) => {
        // Token aus localStorage holen
        const token = localStorage.getItem('authToken');

        // Wenn Token existiert, zum Authorization Header hinzufügen
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('🔑 Token wird mitgeschickt');
        }

        return config;
    },
    (error) => {
        console.error('❌ Request Interceptor Error:', error);
        return Promise.reject(error);
    }
);

// ===================================
// RESPONSE INTERCEPTOR
// ===================================
// Wird AUTOMATISCH nach JEDER Response ausgeführt
apiClient.interceptors.response.use(
    (response) => {
        // Success Response - einfach durchreichen
        return response;
    },
    (error) => {
        // Error Response behandeln
        if (error.response) {
            const status = error.response.status;

            // 401 = Unauthorized (Token ungültig oder abgelaufen)
            if (status === 401) {
                console.log('🚪 Token ungültig - Logout erforderlich');

                // Token aus localStorage löschen
                localStorage.removeItem('authToken');

                // Zu Login-Page redirecten (wird später mit React Router gemacht)
                window.location.href = '/login';
            }

            // 403 = Forbidden (keine Berechtigung)
            if (status === 403) {
                console.log('⛔ Keine Berechtigung für diese Aktion');
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;