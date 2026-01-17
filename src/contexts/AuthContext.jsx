import { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, logout as apiLogout, getUserData } from '../services/auth-service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Beim Start: Prüfe ob Token + User-Daten vorhanden
    useEffect(() => {
        checkAuth();
    }, []);

    /**
     * Prüft ob User eingeloggt ist (Token + User-Daten in localStorage?)
     */
    const checkAuth = () => {
        console.log('🔍 Prüfe Auth-Status...');

        const storedToken = localStorage.getItem('authToken');
        const storedUserData = getUserData();  // Aus localStorage!

        if (storedToken && storedUserData) {
            console.log('✅ Token + User-Daten gefunden - User ist eingeloggt');
            setToken(storedToken);
            setUser(storedUserData);
            setIsAuthenticated(true);
        } else {
            console.log('❌ Kein Token oder User-Daten - User nicht eingeloggt');
            setIsAuthenticated(false);
        }

        setIsLoading(false);
    };

    /**
     * Login
     * @param {string} usernameOrEmail - Username oder Email
     * @param {string} password - Passwort
     */
    const login = async (usernameOrEmail, password) => {
        try {
            console.log('📧 AuthContext: Login für', usernameOrEmail);

            // API Call (speichert Token + User-Daten in localStorage)
            const response = await apiLogin(usernameOrEmail, password);

            // Response enthält: { token, userId, username, email, role, expiresIn }
            setToken(response.token);
            setUser({
                id: response.userId,
                username: response.username,
                email: response.email,
                role: response.role
            });
            setIsAuthenticated(true);

            console.log('✅ AuthContext: Login erfolgreich');
            return response;

        } catch (error) {
            console.error('❌ AuthContext: Login fehlgeschlagen', error);
            throw error;
        }
    };

    /**
     * Logout
     */
    const logout = () => {
        console.log('🚪 AuthContext: Logout');
        apiLogout();  // Löscht localStorage
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        window.location.href = '/';
    };

    const value = {
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        logout,
        checkAuth
    };

    // Loading State während checkAuth läuft
    if (isLoading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <h2>Lädt...</h2>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth muss innerhalb von AuthProvider verwendet werden!');
    }
    return context;
};