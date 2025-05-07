import { useState, useRef, useMemo } from "react";
import { sectors } from "./spinnerData";
import "./spinner.css";

/** SpinnerGame (мобильная оптимизация)
 *  ▸ Колесо: size = clamp(180px, 80vw, 420px)
 *  ▸ Flex‑коробка с max‑w-[92%] на телефоне, центрирование
 *  ▸ Кнопки/текст адаптированы Tailwind‑классами
 */

export default function SpinnerGame() {
  /* ---------------- state ---------------- */
  const [angle, setAngle]   = useState(0);
  const [spinning, setSpin] = useState(false);
  const [active, setActive] = useState<number|null>(null);
  const [qIdx, setQIdx]     = useState(0);
  const [ans, setAns]       = useState("");
  const [score, setScore]   = useState(() => Number(localStorage.getItem("spinnerScore")) || 0);

  const audio = useRef<HTMLAudioElement>(null);

  const sectorAngle = 360 / sectors.length;
  const currentSector = active !== null ? sectors[active] : null;
  const currentQ      = currentSector?.questions[qIdx];

  /* ---------------- spin ---------------- */
  const spin = () => {
    if (spinning) return;
    setSpin(true);

    const turns = Math.random() * 4 + 4;
    const final = angle + turns * 360;
    setAngle(final);
    audio.current?.play().catch(() => {});

    setTimeout(() => {
      const norm = ((final % 360) + 360) % 360;
      const idxRaw = Math.floor(((360 - norm + sectorAngle / 2) % 360) / sectorAngle);
      const idx = (idxRaw - 2 + sectors.length) % sectors.length; // смещение на 2
      setActive(idx);
      setQIdx(0);
      setAns("");
      setSpin(false);
    }, 4000);
  };

  /* ---------------- answer ---------------- */
  const submit = () => {
    if (!currentQ) return;
    if (ans.trim().toLowerCase() === currentQ.a) {
      const newScore = score + 1;
      setScore(newScore);
      localStorage.setItem("spinnerScore", String(newScore));
      if (qIdx + 1 < currentSector!.questions.length) {
        setQIdx(qIdx + 1);
        setAns("");
      } else {
        alert("Сектор пройден! 🎉");
        setActive(null);
      }
    } else {
      alert("Неверно, попробуй ещё!");
    }
  };

  /* ---------------- SVG paths --------------- */
  const paths = useMemo(() => {
    return sectors.map((s, i) => {
      const start = (i / sectors.length) * 2 * Math.PI;
      const end   = ((i + 1) / sectors.length) * 2 * Math.PI;
      const x1 = 50 + 50 * Math.cos(start);
      const y1 = 50 + 50 * Math.sin(start);
      const x2 = 50 + 50 * Math.cos(end);
      const y2 = 50 + 50 * Math.sin(end);
      const mid = (start + end) / 2;
      const cx  = 50 + 35 * Math.cos(mid);
      const cy  = 50 + 35 * Math.sin(mid);

      return (
        <g key={s.id} pointerEvents="none">
          <path d={`M50 50 L${x1} ${y1} A50 50 0 0 1 ${x2} ${y2} Z`} fill={s.color} />
          <image href={s.image} x={cx - 8} y={cy - 8} width="16" height="16" />
        </g>
      );
    });
  }, []);

  /* ---------------- render ---------------- */
  return (
    <div className="flex flex-col items-center gap-6 p-4 max-w-[92%] mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center">Волчок‑викторина</h2>
      <p className="text-base md:text-lg">Очки: <b>{score}</b></p>

      {/* колёсико */}
      <div
        className="relative"
        style={{ width: "clamp(180px, 80vw, 420px)", height: "auto" }}
      >
        <svg
          className="w-full h-full transition-transform duration-[4s] ease-out"
          style={{ transform: `rotate(${angle}deg)` }}
          viewBox="0 0 100 100"
        >
          {paths}
        </svg>
        {/* флажок */}
        <div className="pointer-events-none" style={{
          position:'absolute',top:-22,left:'50%',transform:'translateX(-50%)',
          width:0,height:0,borderLeft:'14px solid transparent',borderRight:'14px solid transparent',
          borderBottom:'22px solid #e11d48',filter:'drop-shadow(0 2px 2px rgba(0,0,0,.4))',zIndex:10}}
        />
      </div>

      <button
        disabled={spinning}
        onClick={spin}
        className="px-6 py-2 bg-pink-500 disabled:bg-pink-300 text-white rounded shadow-md hover:bg-pink-600 transition"
      >
        {spinning ? "Крутим…" : "Крутить"}
      </button>

      {currentQ && (
        <div className="w-full max-w-md bg-white p-5 rounded-xl shadow-md">
          <h3 className="mb-3 font-semibold text-sm md:text-base">{currentQ.q}</h3>
          <input
            value={ans}
            onChange={e => setAns(e.target.value)}
            className="border w-full mb-3 p-2 rounded focus:outline-none focus:ring focus:ring-pink-300"
          />
          <button onClick={submit} className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition">
            Ответить
          </button>
        </div>
      )}

      <audio ref={audio} src="/sounds/spin.mp3" preload="auto" />
    </div>
  );
}
