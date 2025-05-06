// src/pages/Home.tsx
import React, { useState } from 'react';
import RoadMap from '../components/RoadMap'; // тот же компонент, но надписи теперь задаются здесь
import { Link } from 'react-router-dom';

const games = [
  { id: 1, title: 'Игра с Дино', totalSteps: 4 },
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
      <div className="flex space-x-4 mb-8">
        <button
          className={`px-4 py-2 rounded-lg ${activeTab==='главная' ? 'bg-pink-500 text-white' : 'bg-white shadow'}`}
          onClick={() => setActiveTab('главная')}
        >
          Главная
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeTab==='прогресс' ? 'bg-pink-500 text-white' : 'bg-white shadow'}`}
          onClick={() => setActiveTab('прогресс')}
        >
          Прогресс
        </button>
      </div>

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

      {activeTab === 'прогресс' && (
        <div className="w-full max-w-2xl space-y-12">
          <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
            Ваш прогресс
          </h2>
          {games.map(game => (
            <div key={game.id} className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-purple-600 mb-4">
                {game.title}
              </h3>
              <RoadMap
                currentStep={stepsCompleted[game.id] || 0}
                totalSteps={game.totalSteps}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
