import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

import Home from "./pages/Home";
import Game from "./pages/Game";
import QuestionManager from "./pages/QuestionManager";
import Impressum from "./pages/Impressum";
import Rules from "./pages/Rules";
import PageNotFound from "./pages/PageNotFound";
import Layout from "./components/layout";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="quiz" element={<Game />} />
          <Route path="admin" element={<QuestionManager />} />
          <Route path="regeln" element={<Rules />} />
          <Route path="blabli" element={<Impressum />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
  );
}

export default App;
