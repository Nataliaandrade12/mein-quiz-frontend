// src/components/navigation.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // ✅ useAuth verwenden

const Navigation = () => {
    const { isAuthenticated, user, logout } = useAuth();

    // ✅ Logout Handler (wie im Auftrag)
    const handleLogout = () => {
        console.log("🚪 Logout-Button geklickt");
        logout();
    };

    return (
        <nav className="layout-header-nav" style={{ display: "flex", alignItems: "center" }}>
            {/* ===================================
          ÖFFENTLICHE LINKS (immer sichtbar)
          =================================== */}
            <Link to="/">Home</Link>
            <Link to="/regeln">Regeln</Link>
            <Link to="/blabli">Impressum</Link>

            {/* ===================================
          GESCHÜTZTE LINKS (nur wenn eingeloggt)
          =================================== */}
            {isAuthenticated && (
                <>
                    <Link to="/quiz">Quiz</Link>

                    {/* Admin Link - nur für ADMIN Rolle */}
                    {user?.role === "ADMIN" && <Link to="/admin">Fragen verwalten</Link>}
                </>
            )}

            {/* ===================================
          AUTH BUTTONS (rechts)
          =================================== */}
            <div
                style={{
                    marginLeft: "auto",
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                }}
            >
                {isAuthenticated ? (
                    <>
            <span
                style={{
                    color: "#28a745",
                    fontWeight: "bold",
                    padding: "5px 10px",
                    backgroundColor: "rgba(40, 167, 69, 0.1)",
                    borderRadius: "4px",
                }}
            >
              👤 {user?.username || "User"}
            </span>

                        <button
                            onClick={handleLogout}
                            style={{
                                padding: "8px 16px",
                                backgroundColor: "#dc3545",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontWeight: "bold",
                            }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navigation;
