import { useState, useEffect } from "react";
import { getTop10Players, getTop10ByCategory } from "../services/leaderboard-service";

const Leaderboard = () => {
    // ==========================================
    // STATES
    // ==========================================
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("global");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Verfügbare Kategorien
    const categories = [
        { id: "global", label: "🌍 Global" },
        { id: "sports", label: "⚽ Sport" },
        { id: "movies", label: "🎬 Filme" },
        { id: "geography", label: "🗺️ Geographie" },
    ];

    // ==========================================
    // EFFECTS
    // ==========================================

    /**
     * Lädt Leaderboard-Daten wenn sich die Kategorie ändert
     */
    useEffect(() => {
        loadLeaderboard();
    }, [selectedCategory]); // ← Läuft jedes Mal wenn selectedCategory sich ändert

    // ==========================================
    // FUNKTIONEN
    // ==========================================

    /**
     * Lädt die Leaderboard-Daten vom Backend
     */
    const loadLeaderboard = async () => {
        setIsLoading(true);
        setError(null);

        try {
            let data;

            if (selectedCategory === "global") {
                // Global Leaderboard laden
                data = await getTop10Players();
            } else {
                // Kategorie-Leaderboard laden
                data = await getTop10ByCategory(selectedCategory);
            }

            setLeaderboardData(data);
            console.log("✅ Leaderboard geladen:", data.length, "Einträge");
        } catch (err) {
            console.error("❌ Fehler beim Laden:", err);
            setError("Fehler beim Laden des Leaderboards");
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Handler für Kategorie-Wechsel
     */
    const handleCategoryChange = (categoryId) => {
        console.log("📊 Kategorie gewechselt:", categoryId);
        setSelectedCategory(categoryId);
    };

    // ==========================================
    // HELPER: Medaille für Top 3
    // ==========================================
    const getMedal = (rank) => {
        if (rank === 1) return "🥇";
        if (rank === 2) return "🥈";
        if (rank === 3) return "🥉";
        return rank;
    };

    // ==========================================
    // RENDER
    // ==========================================
    return (
        <div className="leaderboard-container">
            <h1>Leaderboard</h1>

            {/* KATEGORIE-TABS */}
            <div className="leaderboard-tabs">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat.id)}
                        className={`tab-button ${
                            selectedCategory === cat.id ? "tab-button--active" : ""
                        }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* LOADING STATE */}
            {isLoading && (
                <div className="loading">
                    <h3>Lädt Leaderboard...</h3>
                </div>
            )}

            {/* ERROR STATE */}
            {error && (
                <div className="error">
                    <h3>{error}</h3>
                    <button onClick={loadLeaderboard} className="button">
                        Erneut versuchen
                    </button>
                </div>
            )}

            {/* LEADERBOARD TABELLE */}
            {!isLoading && !error && leaderboardData.length > 0 && (
                <table className="leaderboard-table">
                    <thead>
                    <tr>
                        <th>Rang</th>
                        <th>Spieler</th>
                        <th>Spiele</th>
                        <th>Punkte</th>
                    </tr>
                    </thead>
                    <tbody>
                    {leaderboardData.map((player, index) => (
                        <tr key={player.userId} className="leaderboard-row">
                            <td className="rank-cell">
                                {getMedal(index + 1)}
                            </td>
                            <td className="username-cell">{player.username}</td>
                            <td className="games-cell">{player.gamesPlayed}</td>
                            <td className="score-cell">{player.totalScore}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {/* KEINE DATEN */}
            {!isLoading && !error && leaderboardData.length === 0 && (
                <div className="no-data">
                    <h3>Noch keine Spieler im Leaderboard</h3>
                    <p>Spiele ein Quiz, um auf dem Leaderboard zu erscheinen!</p>
                </div>
            )}
        </div>
    );
};

export default Leaderboard;