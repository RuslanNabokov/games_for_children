// src/pages/BoardGame/PuzzleStage.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { puzzles, SequenceQuestion } from './puzzlesData';
import '../../boardGame.css';

interface Answers { [key: number]: string[]; }

export default function PuzzleStage() {
  const { stageId } = useParams<{ stageId: string }>();
  const stageIndex  = Number(stageId || 1);
  const stage       = puzzles.find(p => p.id === stageIndex);
  const nav         = useNavigate();

  const [answers,       setAnswers]       = useState<Answers>({});
  const [finished,      setFinished]      = useState(false);
  const [seqAnswer,     setSeqAnswer]     = useState<string[]>([]);
  const [shuffledSteps, setShuffledSteps] = useState<string[]>([]);

  // при смене этапа сбрасываем прогресс
  useEffect(() => {
    setAnswers({});
    setFinished(false);
    setSeqAnswer([]);
    setShuffledSteps([]);
  }, [stageIndex]);

  // инициализируем sequence временную логику
  useEffect(() => {
    if (stage?.questions[0].type === 'sequence') {
      const seqQ = stage.questions[0] as SequenceQuestion;
      setSeqAnswer([]);
      setShuffledSteps([...seqQ.steps].sort(() => Math.random() - 0.5));
    }
  }, [stage]);

  if (!stage) {
    return <p>Этап не найден.</p>;
  }

  // Функция для mcq & guess
  const handleOptionChange = (qIdx: number, value: string, multiple: boolean) => {
    setAnswers(prev => {
      const curr = prev[qIdx] || [];
      const updated = multiple
        ? curr.includes(value)
          ? curr.filter(x => x !== value)
          : [...curr, value]
        : [value];
      return { ...prev, [qIdx]: updated };
    });
  };

  // Проверяем mcq/guess
  const isStageCorrect = useMemo(() => {
    return stage.questions.every((q, idx) => {
      const ans = answers[idx] || [];
      if (q.type === 'mcq') {
        return ans.slice().sort().join() === [...q.correct].sort().join();
      }
      if (q.type === 'guess') {
        return (ans[0] || '').trim().toLowerCase() === q.answer.toLowerCase();
      }
      return true;
    });
  }, [answers, stage.questions]);

  // Проверяем sequence
  const isSequenceCorrect = () => {
    const seqQ = stage.questions[0] as SequenceQuestion;
    if (seqAnswer.length !== seqQ.steps.length) return false;
    return seqAnswer.every((step, idx) => seqQ.steps[seqQ.correctOrder[idx]] === step);
  };

  // Завершение этапа
  const handleComplete = () => {
    if (stage.questions[0].type === 'sequence' && !isSequenceCorrect()) {
      alert('Неверная последовательность. Попробуй ещё.');
      return;
    }
    if (!isStageCorrect) {
      alert('Ответ неверен. Попробуй ещё.');
      return;
    }
    const next = stageIndex + 1;
    if (next > puzzles.length) {
      setFinished(true);
    } else {
      nav(`/board-game/${next}`);
    }
  };

  // Drag&Drop для sequence
  const onDragStart = (e: React.DragEvent, step: string) => e.dataTransfer.setData('text/plain', step);
  const onDragOver  = (e: React.DragEvent) => e.preventDefault();
  const onDrop      = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    const step = e.dataTransfer.getData('text/plain');
    if (step && !seqAnswer.includes(step)) {
      const arr = [...seqAnswer];
      arr[idx] = step;
      setSeqAnswer(arr);
    }
  };
  const resetSequence = () => {
    const seqQ = stage.questions[0] as SequenceQuestion;
    setSeqAnswer([]);
    setShuffledSteps([...seqQ.steps].sort(() => Math.random() - 0.5));
  };

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

  return (
    <div className="puzzle-stage">
      <h2 className="text-3xl font-bold mb-8">
        Этап {stage.id}: {stage.title}
      </h2>

      <div className="questions-wrapper">
        {stage.questions.map((q, i) => (
          <div key={i} className="question p-6 bg-white rounded-xl shadow-lg">
            {/* Изображения */}
            {q.images && (
              Array.isArray(q.images)
                ? q.images.map(src => (
                    <img
                      key={src}
                      src={src}
                      alt="иллюстрация"
                      className="mb-4 w-full max-w-sm mx-auto rounded"
                    />
                  ))
                : typeof q.images === 'string' && (
                    <img
                      src={q.images}
                      alt="иллюстрация"
                      className="mb-4 w-full max-w-sm mx-auto rounded"
                    />
                  )
            )}

            <p className="mb-4 text-lg font-medium">{q.prompt}</p>

            {/* Sequence */}
            {q.type === 'sequence' && (
              <>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">Доступные шаги</h4>
                    {shuffledSteps.map(step => (
                      <div
                        key={step}
                        draggable
                        onDragStart={e => onDragStart(e, step)}
                        className="px-4 py-2 bg-gray-100 rounded mb-2 cursor-grab"
                      >
                        {step}
                      </div>
                    ))}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">Порядок действий</h4>
                    {(q as SequenceQuestion).steps.map((_, idx) => (
                      <div
                        key={idx}
                        onDragOver={onDragOver}
                        onDrop={e => onDrop(e, idx)}
                        className="px-4 py-6 bg-gray-50 rounded border-2 border-dashed mb-2 text-center min-h-[3rem]"
                      >
                        {seqAnswer[idx] || '\u00A0'}
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={resetSequence}
                  className="mt-4 px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                >
                  Сбросить
                </button>
              </>
            )}

            {/* MCQ */}
            {q.type === 'mcq' && (
              <div className="mt-4 flex flex-wrap gap-4">
                {q.options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleOptionChange(i, opt, q.correct.length > 1)}
                    className={`px-6 py-3 rounded-lg border-2 transition-colors text-lg border-gray-300 hover:bg-gray-100 ${answers[i]?.includes(opt) ? (q.correct.includes(opt) ? 'bg-green-100 border-green-600' : 'bg-red-100 border-red-600') : ''}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Guess */}
            {q.type === 'guess' && (() => {
              const value = answers[i]?.[0] || '';
              const correct = q.answer.toLowerCase();
              const validPrefix = correct.startsWith(value.toLowerCase());
              const inputClass = value === ''
                ? 'border-gray-300'
                : validPrefix
                  ? value.toLowerCase() === correct
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
        onClick={handleComplete}
        disabled={stage.questions[0].type === 'sequence' ? !isSequenceCorrect() : !isStageCorrect}
        className="btn-next mt-10 px-8 py-3 text-xl bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 transition"
      >
        {stage.id < puzzles.length ? 'Следующий этап' : 'Завершить игру'}
      </button>
    </div>
  );
}
