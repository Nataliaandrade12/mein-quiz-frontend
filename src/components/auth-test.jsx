// src/components/auth-test.jsx
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

/**
 * Test Component für den AuthContext
 * Wird später durch echte Login/Register Forms ersetzt
 */
function AuthTest() {
    // ==========================================
    // CONTEXT
    // ==========================================
    const { user, login, logout, isAuthenticated, isLoading } =
        useContext(AuthContext);

    // ==========================================
    // LOCAL STATE (für Formular)
    // ==========================================
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');

    // ==========================================
    // HANDLER
    // ==========================================
    const handleLogin = (e) => {
        e.preventDefault();

        if (!usernameOrEmail.trim() || !password.trim()) {
            alert('Bitte Username/Email und Password eingeben!');
            return;
        }

        login(usernameOrEmail, password);

        // Formular zurücksetzen
        setUsernameOrEmail('');
        setPassword('');
    };

    // ==========================================
    // RENDER
    // ==========================================
    return (
        <div style={{
            border: '2px solid #888',
            padding: '20px',
            margin: '20px',
            borderRadius: '8px',
            background: '#f8f9fa'
        }}>
            <h2>AuthContext Test</h2>
            <p style={{ fontSize: '14px', color: '#666' }}>
                Diese Component testet den AuthContext. Wird später gelöscht!
            </p>

            {/* Status Anzeige */}
            <div style={{
                background: isAuthenticated ? '#d4edda' : '#f8d7da',
                padding: '10px',
                borderRadius: '4px',
                marginBottom: '15px'
            }}>
                <strong>Status:</strong> {isAuthenticated
                ? 'Eingeloggt' : 'Nicht eingeloggt'}
            </div>

            {!isAuthenticated ? (
                // ==========================================
                // NICHT EINGELOGGT: Login Form zeigen
                // ==========================================
                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '10px', paddingRight: "20px" }}>
                        <input
                            type="text"
                            placeholder="Username oder Email"
                            value={usernameOrEmail}
                            onChange={(e) => setUsernameOrEmail(e.target.value)}
                            disabled={isLoading}
                            style={{
                                padding: '10px',
                                width: '100%',
                                fontSize: '16px',
                                border: '1px solid #ccc',
                                borderRadius: '4px'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '10px', paddingRight: "20px" }}>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            style={{
                                padding: '10px',
                                width: '100%',
                                fontSize: '16px',
                                border: '1px solid #ccc',
                                borderRadius: '4px'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            padding: '10px 20px',
                            background: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        {isLoading ? 'Loading...' : 'Test Login'}
                    </button>

                    <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
                        Tipp: "admin" oder "admin@quiz.com" → ADMIN, andere → USER
                    </p>
                </form>
            ) : (
                // ==========================================
                // EINGELOGGT: User-Daten anzeigen
                // ==========================================
                <div>
                    <div style={{
                        background: 'white',
                        padding: '15px',
                        borderRadius: '8px',
                        marginBottom: '15px'
                    }}>
                        <h3>Userdaten:</h3>
                        <p><strong>ID:</strong> {user.id}</p>
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p>
                            <strong>Rolle:</strong>
                            <span style={{
                                background: user.role === 'ADMIN' ? '#dc3545' : '#007bff',
                                color: 'white',
                                padding: '3px 10px',
                                borderRadius: '4px',
                                marginLeft: '10px'
                            }}>
                {user.role}
              </span>
                        </p>
                    </div>

                    <button
                        onClick={logout}
                        style={{
                            padding: '10px 20px',
                            background: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        Test Logout
                    </button>
                </div>
            )}
        </div>
    );
}

export default AuthTest;