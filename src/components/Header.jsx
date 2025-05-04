import React from "react";

export default function Header() {
  return (
    <header className="flex items-center mb4">
      <img src="/assets/dino.png" alt="Dino" className="w3 h3 mr3" />
      <h1 className="f3 green">Добро пожаловать в игру с Дино!</h1>
    </header>
  );
}
