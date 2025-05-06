// src/pages/BoardGame/PuzzleStage.tsx
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { puzzles } from './puzzlesData';
import '../../boardGame.css';

interface Answers {
  [key: number]: string[]; // индекс вопроса → выбранные ответы
}

export default function PuzzleStage() {
  /* --------------------------------------------------
   * 1. ПАРАМЕТРЫ РОУТА И ПОДГОТОВКА ДАННЫХ
   * -------------------------------------------------- */
  const { stageId } = useParams<{ stageId: string }>();
  const stageIndex  = Number(stageId || 1);
  const stage       = puzzles.find(p => p.id === stageIndex);
  const nav         = useNavigate();

  /* --------------------------------------------------
   * 2. ХУКИ STATE / EFFECT (всегда вызываются!)
   * -------------------------------------------------- */
  const [answers,  setAnswers]  = useState<Answers>({});
  const [finished, setFinished] = useState(false);

  // При смене этапа очищаем состояние
  useEffect(() => {
    setAnswers({});
    setFinished(false);
  }, [stageIndex]);

  /* --------------------------------------------------
   * 3. РАННЯЯ ПРОВЕРКА НАЛИЧИЯ ДАННЫХ (допустимо один раз)
   * -------------------------------------------------- */
  if (!stage) return <p>Этап не найден.</p>;

  /* --------------------------------------------------
   * 4. ЛОКАЛЬНАЯ КОНСТАНТА С ЭМОДЗИ
   * -------------------------------------------------- */
  const emojiMap: Record<string, string> = {
    'Белка': '🐿️',  'Медведь': '🐻',  'Заяц': '🐇',   'Лиса': '🦊',
    'Утка': '🦆',   'Рыба': '🐟',    'Бобр': '🦫',   'Удочка': '🎣',
    'Книга': '📚',  'Нож': '🔪'
  };

  /* --------------------------------------------------
   * 5. ФУНКЦИИ ДЛЯ ОБНОВЛЕНИЯ ОТВЕТОВ
   * -------------------------------------------------- */
  const handleOptionChange = (qIdx: number, value: string, multiple: boolean) => {
    setAnswers(prev => {
      const current = prev[qIdx] || [];
      const updated = multiple
        ? current.includes(value)
          ? current.filter(x => x !== value)
          : [...current, value]
        : [value];
      return { ...prev, [qIdx]: updated };
    });
  };

  /* --------------------------------------------------
   * 6. ПРОВЕРКА КОРРЕКТНОСТИ ЭТАПА (всегда вызывается!)
   * -------------------------------------------------- */
  const isStageCorrect = useMemo(() => {
    return stage.questions.every((q, idx) => {
      const ans = answers[idx] || [];
      if (q.type === 'mcq') {
        return ans.slice().sort().join() === [...q.correct].sort().join();
      }
      if (q.type === 'guess') {
        return (ans[0] || '').trim().toLowerCase() === q.answer.toLowerCase();
      }
      return false;
    });
  }, [answers, stage.questions]);

  /* --------------------------------------------------
   * 7. ЗАВЕРШЕНИЕ/ПЕРЕХОД МЕЖДУ ЭТАПАМИ
   * -------------------------------------------------- */
  const handleComplete = () => {
    if (!isStageCorrect) {
      alert('Ответ неверен. Попробуй ещё раз.');
      return;
    }
    const next = stageIndex + 1;
    if (next > puzzles.length) {
      setFinished(true);
    } else {
      nav(`/board-game/${next}`);
    }
  };

  /* --------------------------------------------------
   * 8. ПОМОЩЬ: отделяем текст от эмодзи
   * -------------------------------------------------- */
  const splitLabel = (opt: string) => {
    const parts      = opt.trim().split(' ');
    const maybeEmoji = parts[parts.length - 1];
    const isEmoji    = /\p{Extended_Pictographic}/u.test(maybeEmoji);
    const base       = isEmoji ? parts.slice(0, -1).join(' ') : opt;
    const emoji      = emojiMap[base] || (isEmoji ? maybeEmoji : '');
    return { base, emoji };
  };

  /* --------------------------------------------------
   * 9. ЭКРАН ПОЗДРАВЛЕНИЯ (после всех хуков!)
   * -------------------------------------------------- */
  if (finished) {
    return (
      <div className="puzzle-complete p-8 text-center bg-green-50 rounded-xl shadow-lg">
        <h2 className="text-4xl font-bold mb-4">Молодец! 🎉</h2>
        <p className="text-lg mb-6">Ты прошёл все этапы игры.</p>
        <button
          onClick={() => nav('/home')}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          На главную
        </button>
      </div>
    );
  }

  /* --------------------------------------------------
   * 10. ОСНОВНОЙ РЕНДЕР ЭТАПА
   * -------------------------------------------------- */
  return (
    <div className="puzzle-stage">
      <h2 className="text-3xl font-bold mb-8">
        Этап {stage.id}: {stage.title}
      </h2>

      <div className="questions-wrapper">
        {stage.questions.map((q, i) => (
          <div key={i} className="question p-6 bg-white rounded-xl shadow-lg">
            {Array.isArray(q.images)
              ? q.images.map(src => (
                  <img key={src} src={src} alt="ребус" className="mb-4 w-full max-w-xs mx-auto" />
                ))
              : q.images && (
                  <img src={q.images} alt="ребус" className="mb-4 w-full max-w-xs mx-auto" />
                )}
            <p className="mb-4 text-lg font-medium">{q.prompt}</p>


            {/* MCQ */}
            {q.type === 'mcq' && (
              <div className="mt-4 flex flex-wrap gap-4">
                {q.options.map(opt => {
                  const { base, emoji } = splitLabel(opt);
                  const selected  = answers[i]?.includes(opt);
                  const isCorrect = q.correct.includes(opt);
                  const btnClass  = selected
                    ? isCorrect ? 'border-green-600 bg-green-100' : 'border-red-600 bg-red-100'
                    : 'border-gray-300 hover:bg-gray-100';
                  return (
                    <button
                      key={opt}
                      onClick={() => handleOptionChange(i, opt, q.correct.length > 1)}
                      className={`px-6 py-3 rounded-lg border-2 focus:outline-none transition-colors text-lg ${btnClass}`}
                    >
                      {base}{emoji && <span className="ml-2 text-xl">{emoji}</span>}
                    </button>
                  );
                })}
              </div>
            )}

            {/* GUESS */}
            {q.type === 'guess' && (() => {
              const value       = answers[i]?.[0] || '';
              const correctFull = q.answer.toLowerCase();
              const prefixValid = correctFull.startsWith(value.toLowerCase());
              const inputClass  = value === ''
                ? 'border-gray-300'
                : prefixValid
                  ? value.toLowerCase() === correctFull
                    ? 'border-green-600 bg-green-100'
                    : 'border-green-500'
                  : 'border-red-600 bg-red-100';
              return (
                <input
                  type="text"
                  placeholder={q.placeholder || ''}
                  value={value}
                  onChange={e => handleOptionChange(i, e.target.value, false)}
                  className={`mt-4 border-2 rounded-lg px-4 py-2 w-full text-lg focus:outline-none transition-colors ${inputClass}`}
                />
              );
            })()}
          </div>
        ))}
      </div>

      <button
        className="btn-next mt-10 px-8 py-3 text-xl"
        onClick={handleComplete}
        disabled={!isStageCorrect}
      >
        {stage.id < puzzles.length ? 'Следующий этап' : 'Завершить игру'}
      </button>
    </div>
  );
}
