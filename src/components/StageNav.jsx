// src/components/StageNav.jsx
import React from "react";

const stages = [
  { id: 1, label: "Безопасный лес" },
  { id: 2, label: "Правила поведения" },
  { id: 3, label: "Экология" },
  { id: 4, label: "Гигиена" },
];

export default function StageNav({ current, onSelect }) {
  return (
    <nav className="flex flex-wrap gap3 mb4">
      {stages.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s.id)}
          className={`pa2 ba b--green ${current === s.id ? "bg-green white" : "bg-white green"} br2 pointer`}
        >
          {s.label}
        </button>
      ))}
    </nav>
  );
}
