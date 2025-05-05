import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { puzzles } from "./puzzlesData";
import "../../boardGame.css";

interface Answers {
  [key: number]: string[];
}

export default function PuzzleStage() {
  const { stageId } = useParams<{ stageId: string }>();
  const stage = puzzles.find((p) => p.id === Number(stageId));
  const nav = useNavigate();
  const [answers, setAnswers] = useState<Answers>({});

  if (!stage) {
    return <p>Этап не найден.</p>;
  }

  const handleOptionChange = (
    qIdx: number,
    option: string,
    multiple: boolean,
  ) => {
    setAnswers((prev) => {
      const current = prev[qIdx] || [];
      const updated = multiple
        ? current.includes(option)
          ? current.filter((x) => x !== option)
          : [...current, option]
        : [option];
      return { ...prev, [qIdx]: updated };
    });
  };

  const handleUnderline = (qIdx: number, index: number) => {
    setAnswers((prev) => {
      const current = prev[qIdx] || [];
      const strIdx = index.toString();
      return {
        ...prev,
        [qIdx]: current.includes(strIdx)
          ? current.filter((x) => x !== strIdx)
          : [...current, strIdx],
      };
    });
  };

  const isStageCorrect = useMemo(() => {
    return stage.questions.every((q, idx) => {
      const ans = answers[idx] || [];
      if (q.type === "mcq") {
        const correct = [...q.correct].sort();
        return ans.slice().sort().join() === correct.join();
      }
      if (q.type === "underline" && "correctIndices" in q) {
        const correct = q.correctIndices.map(String).sort();
        return ans.slice().sort().join() === correct.join();
      }
      if (q.type === "guess") {
        const input = ans[0] || "";
        return input.trim().toLowerCase() === q.answer.toLowerCase();
      }
      return false;
    });
  }, [answers, stage.questions]);

  const handleComplete = () => {
    if (!isStageCorrect) {
      alert("Ответ неверен. Пожалуйста, попробуйте ещё раз.");
      return;
    }
    const next = Number(stageId) + 1;
    nav(next <= puzzles.length ? `/board-game/${next}` : "/games");
  };

  return (
    <div className="puzzle-stage">
      <h2 className="text-2xl font-semibold mb-6">
        Этап {stage.id}: {stage.title}
      </h2>

      <div className="questions-wrapper">
        {stage.questions.map((q, i) => (
          <div key={i} className="question">
            <p className="mb-3 font-medium">{q.prompt}</p>

            {/* MCQ */}
            {q.type === "mcq" && (
              <div className="options mt-2">
                {q.options.map((opt) => (
                  <label key={opt} className="flex items-center mb-2 space-x-2">
                    <input
                      type={q.correct.length > 1 ? "checkbox" : "radio"}
                      name={`q${i}`}
                      value={opt}
                      className="form-checkbox"
                      onChange={() =>
                        handleOptionChange(i, opt, q.correct.length > 1)
                      }
                      checked={answers[i]?.includes(opt) || false}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            )}

            {/* Underline as clickable chips */}
            {q.type === "underline" && (
              <div className="mt-2 flex flex-wrap gap-2">
                {q.text.split(" ").map((word, idx) => {
                  const selected = answers[i]?.includes(idx.toString());
                  return (
                    <button
                      key={idx}
                      onClick={() => handleUnderline(i, idx)}
                      className={
                        `px-2 py-1 rounded border-2 ` +
                        (selected
                          ? "border-green-600 underline bg-green-100"
                          : "border-gray-300 hover:bg-gray-100")
                      }
                    >
                      {word}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Guess word */}
            {q.type === "guess" && (
              <input
                type="text"
                placeholder={q.placeholder || ""}
                value={answers[i]?.[0] || ""}
                onChange={(e) => handleOptionChange(i, e.target.value, false)}
                className="mt-2 border rounded px-3 py-1 w-full"
              />
            )}
          </div>
        ))}
      </div>

      <button
        className="btn-next mt-8"
        onClick={handleComplete}
        disabled={!isStageCorrect}
      >
        {stage.id < puzzles.length ? "Следующий этап" : "Завершить игру"}
      </button>
    </div>
  );
}
