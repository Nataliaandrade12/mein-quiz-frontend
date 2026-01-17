import { useState } from "react";

// ✅ NEU
import { useAuth } from "../contexts/AuthContext";
// ✅ NEU
import { startGame, finishGame } from "../services/game-service";

import { getQuizQuestions } from "../services/question-service";
import { getDemoQuizQuestions } from "../utils/demo-api";

import Button from "../components/button";
import GameSession from "../components/game-session";

const Game = () => {
  // ✅ NEU: AUTH CONTEXT
  const { user, isAuthenticated } = useAuth();

  // ✅ NEU: Game Session ID
  const [gameSessionId, setGameSessionId] = useState(null);

  // Bestehende States
  const [showCategorySelector, setShowCategorySelector] = useState(true);
  const [apiQuestions, setApiQuestions] = useState([]);

  // Neue States für Ladezustand und Fehler
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJavaQuestions = async (category) => {
    setIsLoading(true);
    setError(null);

    // Fragen von der Java API laden
    try {
      await getDemoQuizQuestions();
      const questions = await getQuizQuestions(5, category);
      console.log("Java API Questions:", questions);
      setApiQuestions(questions);
      return questions; // ✅ NEU: damit handleCategoryClick die Fragen weiterverwenden kann
    } catch (err) {
      console.error("Backend Error:", err);
      if (err.response?.status === 404) {
        setError(
            "Kategorie nicht gefunden. Bitte versuche eine andere Kategorie."
        );
      } else if (err.response?.status >= 500) {
        setError("Server-Fehler. Bitte versuche es später erneut.");
      } else {
        setError("Fehler beim Laden der Fragen. Bitte versuche es erneut.");
      }
      return []; // ✅ NEU: konsistentes return
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ CHANGED: komplette Funktion ersetzt (wie im Auftrag)
  const handleCategoryClick = async (category) => {
    // 1. Prüfen ob eingeloggt
    if (!isAuthenticated || !user?.id) {
      setError("Du musst eingeloggt sein, um zu spielen!");
      setShowCategorySelector(true);
      return;
    }

    setShowCategorySelector(false);
    setIsLoading(true);
    setError(null);

    try {
      // 2. Fragen vom Backend laden
      const questions = await getQuizQuestions(5, category);

      if (questions.length === 0) {
        setError("Keine Fragen für diese Kategorie verfügbar");
        setShowCategorySelector(true);
        return;
      }

      // 3. Game Session im Backend starten
      console.log("🎮 Starte Game Session für User:", user.id);
      const gameSession = await startGame(user.id, category, questions.length);

      // 4. Session-ID speichern
      setGameSessionId(gameSession.id);
      console.log("✅ Game Session ID:", gameSession.id);

      // 5. Quiz-Fragen setzen → Quiz startet
      setApiQuestions(questions);
    } catch (err) {
      console.error("❌ Backend Error:", err);
      if (err.response?.status === 401) {
        setError("Bitte logge dich erneut ein.");
      } else {
        setError("Fehler beim Laden der Fragen. Bitte versuche es erneut.");
      }
      setShowCategorySelector(true);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ CHANGED: Reset Handler angepasst
  const handleResetGame = () => {
    setShowCategorySelector(true);
    setApiQuestions([]);
    setGameSessionId(null); // ✅ NEU
  };

  return (
      <div className="game">
        {/* Loading-Zustand anzeigen */}
        {isLoading && (
            <div className="loading">
              <h2>🔄 Fragen werden geladen...</h2>
              <p>Bitte warten Sie einen Moment.</p>
            </div>
        )}

        {/* Error-Zustand anzeigen */}
        {error && (
            <div className="error">
              <h2>❌ Fehler aufgetreten</h2>
              <p>{error}</p>
              <Button
                  text="Zurück zur Auswahl"
                  onAnswerClick={() => {
                    setError(null);
                    setShowCategorySelector(true);
                  }}
              />
            </div>
        )}

        {/* Kategorienauswahl nur anzeigen wenn nicht geladen wird und kein Fehler */}
        {showCategorySelector && !isLoading && !error && (
            <div>
              <h2>Wähle eine Kategorie:</h2>
              <div className="category-buttons">
                <Button
                    text="Sport"
                    onAnswerClick={() => handleCategoryClick("sports")}
                />
                <Button
                    text="Filme"
                    onAnswerClick={() => handleCategoryClick("movies")}
                />
                <Button
                    text="Geographie"
                    onAnswerClick={() => handleCategoryClick("geography")}
                />
              </div>
            </div>
        )}

        {/* ✅ CHANGED: GameSession ID weitergeben */}
        {!showCategorySelector &&
            !isLoading &&
            !error &&
            apiQuestions.length > 0 && (
                <GameSession
                    questions={apiQuestions}
                    onResetGame={handleResetGame}
                    gameSessionId={gameSessionId} // ✅ NEU
                />
            )}
      </div>
  );
};

export default Game;
