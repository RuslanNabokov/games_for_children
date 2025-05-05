export interface MCQQuestion {
  type: "mcq";
  prompt: string;
  options: string[];
  correct: string[];
}

export interface UnderlineQuestion {
  type: "underline";
  prompt: string;
  text: string;
  correctIndices: number[];
}

export interface GuessWordQuestion {
  type: "guess";
  prompt: string;
  answer: string;
  placeholder?: string;
}

export type PuzzleQuestion =
  | MCQQuestion
  | UnderlineQuestion
  | GuessWordQuestion;

export interface Puzzle {
  id: number;
  title: string;
  questions: PuzzleQuestion[];
}

export const puzzles: Puzzle[] = [
  {
    id: 1,
    title: "Безопасный лес",
    questions: [
      {
        type: "mcq",
        prompt: "Каких животных можно встретить в лесу и кто из них опасен?",
        options: ["Белка", "Медведь", "Заяц", "Лиса"],
        correct: ["Медведь", "Лиса"],
      },
      {
        type: "mcq",
        prompt: "Как защититься от солнечных ожогов?",
        options: [
          "Лежать на солнце без защиты",
          "Носить шляпу и крем",
          "Играть всегда в тени",
        ],
        correct: ["Носить шляпу и крем", "Играть всегда в тени"],
      },
    ],
  },
  {
    id: 2,
    title: "Правила поведения на природе",
    questions: [
      {
        type: "underline",
        prompt: "Найди и подчеркни названия животных, деревьев и грибов леса",
        text: "В лесу растут берёза дуб сосна ель мох белые грибы ёжик лиса заяц медведь",
        correctIndices: [3, 4, 5, 6, 9, 10, 11, 12, 13],
      },
    ],
  },
  {
    id: 3,
    title: "Угадай слово",
    questions: [
      {
        type: "guess",
        prompt:
          "Как называется прибор, который помогает определять стороны света?",
        answer: "компас",
        placeholder: "Введите слово",
      },
      {
        type: "guess",
        prompt: "Как называется окрашенная часть семени, которую мы едим?",
        answer: "ядро",
        placeholder: "Введите слово",
      },
      {
        type: "guess",
        prompt:
          "Как называется насекомое, которое собирает пыльцу и делает мёд?",
        answer: "пчела",
        placeholder: "Введите слово",
      },
    ],
  },
  {
    id: 4,
    title: "Водный мир",
    questions: [
      {
        type: "mcq",
        prompt: "Какие животные живут в реке?",
        options: ["Утка", "Рыба", "Лиса", "Бобр"],
        correct: ["Рыба", "Бобр"],
      },
      {
        type: "mcq",
        prompt: "Что нужно брать с собой на рыбалку?",
        options: ["Удочка", "Книга", "Нож"],
        correct: ["Удочка", "Нож"],
      },
    ],
  },
];
