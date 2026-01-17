import apiClient from "./api-client";

/**
 * Startet ein neues Quiz-Game im Backend
 *
 * @param {number} userId - User-ID des Spielers
 * @param {string} category - Kategorie (z.B. "sports")
 * @param {number} totalQuestions - Anzahl Fragen
 * @returns {Promise<Object>} Game Session mit ID
 */
export const startGame = async (userId, category, totalQuestions = 10) => {
    try {
        console.log("🎮 Starte neues Game:", { userId, category, totalQuestions });

        const response = await apiClient.post("/game/start", null, {
            params: {
                userId,
                category,
                totalQuestions
            }
        });

        console.log("✅ Game Session erstellt:", response.data);
        return response.data; // Enthält: { id, userId, category, ... }
    } catch (error) {
        console.error("❌ Fehler beim Starten des Games:", error);
        throw error;
    }
};

/**
 * Beendet ein Game und speichert das Resultat
 *
 * @param {number} sessionId - Game Session ID
 * @param {number} correctAnswers - Anzahl richtige Antworten
 * @returns {Promise<Object>} Finales Game Result mit Score
 */
export const finishGame = async (sessionId, correctAnswers) => {
    try {
        console.log("🏁 Beende Game:", { sessionId, correctAnswers });

        const response = await apiClient.put(`/game/${sessionId}/finish`, null, {
            params: {
                correctAnswers
            }
        });

        console.log("✅ Game beendet - Score:", response.data.totalScore);
        return response.data;
    } catch (error) {
        console.error("❌ Fehler beim Beenden des Games:", error);
        throw error;
    }
};