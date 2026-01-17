import { useState } from "react";
import LoginForm from "../components/login-form";

const Login = () => {
    const handleLogin = (loginData) => {
        console.log("Login Daten:", loginData);
        // TODO: Später mit AuthContext und API verbinden (Nachmittag!)
        alert(`Login-Versuch mit: ${loginData.usernameOrEmail}`);
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <LoginForm onLogin={handleLogin} />

                <div className="auth-links">
                    <p>Noch kein Account?</p>
                    <p>Registrierung kommt später!</p>
                </div>

                {/* Test Credentials Hinweis */}
                <div style={{
                    marginTop: '20px',
                    padding: '15px',
                    backgroundColor: '#e7f3ff',
                    borderRadius: '4px',
                    fontSize: '14px'
                }}>
                    <strong>Test-Accounts:</strong><br />
                    <br />
                    <strong>Admin:</strong><br />
                    Username: admin<br />
                    Email: admin@quiz.com<br />
                    Passwort: admin123<br />
                    <br />
                    <strong>Normaler User:</strong><br />
                    Username: user<br />
                    Email: user@quiz.com<br />
                    Passwort: user123
                </div>
            </div>
        </div>
    );
};

export default Login;