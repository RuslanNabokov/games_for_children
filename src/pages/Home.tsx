// src/pages/Home.tsx
import React, { useState } from 'react';
import RoadMap from '../components/RoadMap'; // тот же компонент, но надписи теперь задаются здесь
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const games = [
 // { id: 1, title: 'Игра с Дино', totalSteps: 4 },
  // { id: 2, title: 'Игра с Мишкой', totalSteps: 4 },
  // { id: 3, title: 'Игра с Пёсиком', totalSteps: 6 },
];

const stepsCompleted: Record<number, number> = {
  1: 4,
  2: 0,
  3: 0,
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<'главная' | 'прогресс'>('главная');

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-yellow-100 flex flex-col items-center p-6">
      {/* Вкладки */}


      {/* Содержимое вкладок */}


      {activeTab === 'главная' && (
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-pink-700">🌈 Обучаемся весело!</h1>
          <p className="text-lg text-pink-800">
            Мы рады видеть тебя здесь! 🎉
          </p>
          <Link
            to="/games"
            className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-400 to-pink-400 text-white font-bold rounded-full shadow-md hover:scale-105 transition-transform"
          >
            Начать играть
          </Link>
        </div>
      )}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-8">
        <img
          src="/assets/family-lg.png"
          alt="Семья гуляет у реки"
          className="mx-auto w-64 h-auto lg:w-96 shadow-lg rounded-lg"
        />
      </motion.div>

    </div>
  );
}
