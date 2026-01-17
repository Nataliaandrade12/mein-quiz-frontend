import "./App.css";
import { Routes, Route } from "react-router-dom";
import LeaderboardPage from "./pages/Leaderboard";

import Layout from "./components/layout";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Login from "./pages/Login";
import QuestionManager from "./pages/QuestionManager";
import Rules from "./pages/Rules";
import Impressum from "./pages/Impressum";
import PageNotFound from "./pages/PageNotFound";

import Forbidden from "./pages/Forbidden"; // ✅ NEU
import ProtectedRoute from "./components/protected-route.jsx"; // ✅ NEU

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* Öffentliche Routes */}
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="regeln" element={<Rules />} />
                <Route path="blabli" element={<Impressum />} />
                <Route path="forbidden" element={<Forbidden />} />
                <Route path="leaderboard" element={<LeaderboardPage />} />

                {/* Geschützte Routes - nur für eingeloggte User */}
                <Route
                    path="quiz"
                    element={
                        <ProtectedRoute>
                            <Game />
                        </ProtectedRoute>
                    }
                />

                {/* Admin Route - nur für ADMIN Rolle */}
                <Route
                    path="admin"
                    element={
                        <ProtectedRoute requiredRole="ADMIN">
                            <QuestionManager />
                        </ProtectedRoute>
                    }
                />

                {/* 404 Page */}
                <Route path="*" element={<PageNotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
