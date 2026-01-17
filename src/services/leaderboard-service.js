import apiClient from "./api-client";

/**
 * Lädt die Top 10 Spieler (Global)
 *
 * @returns {Promise<Array>} Top 10 Spieler
 */
export const getTop10Players = async () => {
    try {
        console.log("🏆 Lade Top 10 Spieler (Global)...");

        const response = await apiClient.get("/leaderboard/top10");

        console.log("✅ Top 10 geladen:", response.data.length);
        return response.data;
    } catch (error) {
        console.error("❌ Fehler beim Laden des Leaderboards:", error);
        throw error;
    }
};

/**
 * Lädt die Top 10 Spieler einer Kategorie
 *
 * @param {string} category - Kategorie (z.B. "sports")
 * @returns {Promise<Array>} Top 10 Spieler der Kategorie
 */
export const getTop10ByCategory = async (category) => {
    try {
        console.log(`🏆 Lade Top 10 für Kategorie: ${category}...`);

        const response = await apiClient.get(`/leaderboard/top10/${category}`);

        console.log("✅ Top 10 geladen:", response.data.length);
        return response.data;
    } catch (error) {
        console.error("❌ Fehler beim Laden des Kategorie-Leaderboards:", error);
        throw error;
    }
};