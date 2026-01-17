import { useState } from "react";
import Button from "./button";

const LoginForm = ({ onLogin }) => {
    // ==========================================
    // STATES: Formular-Daten
    // ==========================================
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");

    // ==========================================
    // STATES: Fehler-Messages
    // ==========================================
    const [usernameOrEmailError, setUsernameOrEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // ==========================================
    // STATE: Loading
    // ==========================================
    const [isLoading, setIsLoading] = useState(false);

    // ==========================================
    // VALIDATION FUNKTIONEN
    // ==========================================

    /**
     * Username oder Email validieren (flexible!)
     * Backend prüft ob Username oder Email - wir prüfen nur Grundsätzliches
     */
    const validateUsernameOrEmail = (value) => {
        if (!value.trim()) {
            setUsernameOrEmailError("Benutzername oder Email ist erforderlich");
            return false;
        }

        if (value.length < 3) {
            setUsernameOrEmailError("Mindestens 3 Zeichen erforderlich");
            return false;
        }

        setUsernameOrEmailError("");
        return true;
    };

    /**
     * Password validieren
     */
    const validatePassword = (value) => {
        if (!value) {
            setPasswordError("Passwort ist erforderlich");
            return false;
        }
        if (value.length < 6) {
            setPasswordError("Passwort muss mindestens 6 Zeichen haben");
            return false;
        }
        setPasswordError("");
        return true;
    };

    // ==========================================
    // HANDLER: onChange
    // ==========================================
    const handleUsernameOrEmailChange = (e) => {
        const value = e.target.value;
        setUsernameOrEmail(value);
        if (usernameOrEmailError) validateUsernameOrEmail(value);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        if (passwordError) validatePassword(value);
    };

    // ==========================================
    // HANDLER: Submit
    // ==========================================
    const handleSubmit = (e) => {
        e.preventDefault();

        // Alle Felder validieren
        const usernameOrEmailOk = validateUsernameOrEmail(usernameOrEmail);
        const passwordOk = validatePassword(password);

        // Bei Fehler abbrechen
        if (!usernameOrEmailOk || !passwordOk) {
            return;
        }

        setIsLoading(true);

        // Login-Daten an Parent weitergeben
        const loginData = {
            usernameOrEmail: usernameOrEmail,
            password: password,
        };

        // Parent-Funktion aufrufen (kommt später von AuthContext)
        if (onLogin) {
            onLogin(loginData);
        }

        setIsLoading(false);
    };

    // ==========================================
    // HELPER: CSS Klasse für Input
    // ==========================================
    const getInputClassName = (hasError, hasValue) => {
        let className = "form-input";
        if (!hasValue) return className;
        if (hasError) return `${className} form-input--error`;
        return `${className} form-input--success`;
    };

    // ==========================================
    // RENDER
    // ==========================================
    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2>Login</h2>

            {/* USERNAME OR EMAIL INPUT */}
            <div className="form-group">
                <label htmlFor="usernameOrEmail">
                    Benutzername oder Email <span className="required">*</span>
                </label>
                <input
                    type="text"
                    id="usernameOrEmail"
                    value={usernameOrEmail}
                    onChange={handleUsernameOrEmailChange}
                    placeholder="admin oder admin@quiz.com"
                    className={getInputClassName(usernameOrEmailError, usernameOrEmail)}
                    disabled={isLoading}
                />
                {usernameOrEmailError && (
                    <span className="error-message">{usernameOrEmailError}</span>
                )}
            </div>

            {/* PASSWORD INPUT */}
            <div className="form-group">
                <label htmlFor="password">
                    Passwort <span className="required">*</span>
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Mindestens 6 Zeichen"
                    className={getInputClassName(passwordError, password)}
                    disabled={isLoading}
                />
                {passwordError && (
                    <span className="error-message">{passwordError}</span>
                )}
            </div>

            {/* SUBMIT BUTTON */}
            <div className="form-submit">
                <Button
                    text={isLoading ? "Lädt..." : "Einloggen"}
                    onAnswerClick={handleSubmit}
                    disabled={isLoading}
                    className="submit-button"
                />
            </div>
        </form>
    );
};

export default LoginForm;