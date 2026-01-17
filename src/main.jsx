import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import "./App.css";

import { AuthProvider } from "./contexts/AuthContext.jsx"; // ← NEU!

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider> {/* ← NEU! AuthProvider umwickelt alles */}
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>
);