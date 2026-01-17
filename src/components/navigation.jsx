// src/components/navigation.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // ✅ CHANGED: useAuth statt useContext/AuthContext

const Navigation = () => {
    // ✅ CHANGED: AuthContext über useAuth verwenden
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <nav className="layout-header-nav">
            <Link to="/">Home</Link>
            <Link to="/quiz">Quiz</Link>
            <Link to="/admin">Fragen verwalten</Link>
            <Link to="/regeln">Regeln</Link>
            <Link to="/blabli">Impressum</Link>

            {/* ✅ CHANGED: Login / Logout abhängig vom Auth-Status */}
            {!isAuthenticated && <Link to="/login">Login</Link>}

            {isAuthenticated && (
                <>
                    <button
                        onClick={logout}
                        style={{ marginLeft: "10px" }}
                    >
                        Logout
                    </button>

                    {/* User-Anzeige */}
                    <span
                        style={{
                            marginLeft: "20px",
                            padding: "5px 10px",
                            background:
                                user.role === "ADMIN" ? "#dc3545" : "#007bff",
                            color: "white",
                            borderRadius: "4px",
                            fontSize: "14px",
                        }}
                    >
                        👤 {user.username} ({user.role})
                    </span>
                </>
            )}
        </nav>
    );
};

export default Navigation;
