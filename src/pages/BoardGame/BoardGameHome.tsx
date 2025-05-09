import { useNavigate } from 'react-router-dom';
import dinoImg from '../../assets/Mickey.png'; // добавьте картинку

import '../../boardGame.css';
export default function BoardGameHome() {
  const nav = useNavigate();
  return (
    <div className="boardgame-home">
      <img src={dinoImg} alt="Дино" className="dino-greeting" />
      <h1>Привет! Я Микки</h1>
      <p>Добро пожаловать в нашу игру по окружающему миру.</p>
      <button onClick={() => nav('/board-game/1')} className="btn-start">
        Начать этап 1
      </button>
    </div>
  );
}
