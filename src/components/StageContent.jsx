import React from "react";
import QuestionCard from "./QuestionCard";
const stage1Questions = [
  {
    question: "Каких животных мы можем встретить в лесу?",
    options: [
      "Лиса, заяц, белка",
      "Верблюд, пингвин, крокодил",
      "Кит, дельфин, акула",
    ],
  },
  {
    question: "Кто из них опасен?",
    options: ["Медведь", "Белка", "Заяц"],
  },
  {
    question: "Как защититься от солнечных ожогов?",
    options: [
      "Лежать на солнце без защиты",
      "Носить шляпу и использовать крем",
      "Играть в тени",
    ],
  },
  {
    question: "Что делать, если ты потерялся в лесу?",
    options: [
      "Крикнуть на всю громкость",
      "Оставаться на месте",
      "Бежать в разные стороны",
    ],
  },
  {
    question: "Что можно делать с незнакомыми растениями?",
    options: ["Трогать сразу", "Смотреть издалека", "Срывать и есть"],
  },
  {
    question: "Выбери правильное поведение у воды",
    options: [
      "Надевать спасательный жилет",
      "Прыгать в воду без проверки глубины",
      "Играть возле кромки воды",
    ],
  },
];

export default function StageContent({ stage }) {
  switch (stage) {
    case 1:
      return (
        <div>
          <h2 className="f4 green mb3">Этап 1: Безопасный лес</h2>
          {stage1Questions.map((q, i) => (
            <QuestionCard key={i} question={q.question} options={q.options} />
          ))}
        </div>
      );
    case 2:
      return <div className="f4">Контент этапа 2: Правила поведения</div>;
    case 3:
      return <div className="f4">Контент этапа 3: Экология</div>;
    case 4:
      return <div className="f4">Контент этапа 4: Гигиена</div>;
    default:
      return null;
  }
}
