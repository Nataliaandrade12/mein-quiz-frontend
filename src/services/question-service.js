// src/services/question-service.js
import apiClient from "./api-client";

/**
 * Holt zufällige Quiz-Fragen
 * @param {number} amount - Anzahl Fragen
 * @param {string|null} category - Kategorie (optional)
 * @returns {Promise<Array>} Liste von Fragen
 */
export const getQuizQuestions = async (amount = 5, category = null) => {
    try {
        console.log(`🎯 Lade ${amount} Quiz-Fragen, Kategorie:`, category);

        let url = `/questions/random?limit=${amount}`;

        if (category) {
            url = `/questions/random?category=${encodeURIComponent(
                category
            )}&limit=${amount}`;
        }

        const response = await apiClient.get(url);

        console.log("✅ Quiz-Fragen geladen:", response.data.length);
        return response.data;
    } catch (error) {
        console.error("❌ Fehler beim Laden der Quiz-Fragen:", error);
        return [];
    }
};

/**
 * Holt ALLE Quiz-Fragen (z. B. Admin / Verwaltung)
 * @returns {Promise<Array>}
 */
export const getAllQuizQuestions = async () => {
    try {
        const response = await apiClient.get("/questions");
        return response.data;
    } catch (error) {
        console.error("❌ Fehler beim Laden aller Fragen:", error);
        return [];
    }
};

/**
 * Erstellt eine neue Quiz-Frage
 * @param {Object} question - Question DTO
 * @returns {Promise<Object>}
 */
export const createQuizQuestion = async (question) => {
    try {
        const response = await apiClient.post("/questions", question);
        return response.data;
    } catch (error) {
        console.error("❌ Fehler beim Erstellen der Frage:", error);
        throw error;
    }
};

/**
 * Aktualisiert eine bestehende Quiz-Frage
 * @param {string|number} id - Question ID
 * @param {Object} question - Updated Question DTO
 * @returns {Promise<Object>}
 */
export const updateQuizQuestion = async (id, question) => {
    try {
        const response = await apiClient.put(`/questions/${id}`, question);
        return response.data;
    } catch (error) {
        console.error("❌ Fehler beim Aktualisieren der Frage:", error);
        throw error;
    }
};

/**
 * Löscht eine Quiz-Frage
 * @param {string|number} id - Question ID
 * @returns {Promise<void>}
 */
export const deleteQuizQuestion = async (id) => {
    try {
        await apiClient.delete(`/questions/${id}`);
    } catch (error) {
        console.error("❌ Fehler beim Löschen der Frage:", error);
        throw error;
    }
};
