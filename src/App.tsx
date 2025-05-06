
import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Navigation from "./components/Navigation";
import { motion } from "framer-motion";
import Home from './pages/Home';  // Главная страница с RoadMap
import Games from "./pages/Games";
import BoardGameHome from './pages/BoardGame/BoardGameHome';  // Старт игры
import PuzzleStage from './pages/BoardGame/PuzzleStage';  // Страница с уровнями игры

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
        <Navigation />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          <Routes>
            {/* <Route path="/" element={<AuthCard />} /> */}
            <Route path="/home" element={<Home />} />
            <Route path="/games" element={<Games />} />
            {/* <Route path="/progress" element={<Progress />} />
            <Route path="/BlogPage" element={<BlogPage />} /> */}
            <Route path="/board-game" element={<BoardGameHome />} />
            {/* <Route path="/results" element={<BoardGameHome />} /> */}
            <Route path="/board-game/:stageId" element={<PuzzleStage />} />
            <Route path="*" element={<Navigate to="/home" replace />} />

            {/* <Route path="/login" element={<AuthCard />} /> */}
          </Routes>
        </motion.div>
      </div>
    </Router>
  );
}

export default App;