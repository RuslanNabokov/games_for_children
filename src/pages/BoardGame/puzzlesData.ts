// src/pages/BoardGame/puzzlesData.ts
// Добавлен отдельный этап с ребусом (id 5). Вопрос id 24 убран из этапа 2.

/* ---------- Типы ---------- */
export interface BaseQuestion {
  id: number;
  title: string;
  /** необязательная картинка (или массив картинок) для ребусов и визуальных заданий */
  images?: string | string[];
}

export interface MCQQuestion extends BaseQuestion {
  type: 'mcq';
  prompt: string;
  options: string[];
  correct: string[];
}

export interface GuessWordQuestion extends BaseQuestion {
  type: 'guess';
  prompt: string;
  answer: string;
  placeholder?: string;
}

export type PuzzleQuestion = MCQQuestion | GuessWordQuestion;

export interface Puzzle {
  id: number;
  title: string;
  questions: PuzzleQuestion[];
}

/* ---------- Данные ---------- */
export const puzzles: Puzzle[] = [
  /* Этап 1 */
  {
    id: 1,
    title: 'Безопасный лес',
    questions: [
      {
        id: 11,
        title: 'Опасные животные',
        type: 'mcq',
        prompt: 'Каких животных можно встретить в лесу и кто из них опасен?',
        options: ['Белка 🐿️', 'Медведь 🐻', 'Заяц 🐇', 'Лиса 🦊'],
        correct: ['Медведь 🐻', 'Лиса 🦊'],
      },
      {
        id: 12,
        title: 'Солнечные ожоги',
        type: 'mcq',
        prompt: 'Как защититься от солнечных ожогов на прогулке?',
        options: [
          'Лежать на солнце без защиты',
          'Носить шляпу и крем',
          'Играть всегда в тени',
        ],
        correct: ['Носить шляпу и крем', 'Играть всегда в тени'],
      },
    ],
  },

  /* Этап 2 */
  {
    id: 2,
    title: 'Правила поведения на природе',
    questions: [
      {
        id: 21,
        title: 'Объекты леса',
        type: 'mcq',
        prompt: 'Какие из перечисленных объектов относятся к лесу?',
        options: [
          'Автомобиль 🚗',
          'Телефон 📱',
          'Берёза 🌳',
          'Дуб 🌳',
          'Сосна 🌲',
          'Ель 🎄',
          'Мох 🍀',
          'Белые грибы 🍄',
          'Ёжик 🦔',
          'Лиса 🦊',
          'Заяц 🐇',
          'Медведь 🐻',
        ],
        correct: [
          'Берёза 🌳',
          'Дуб 🌳',
          'Сосна 🌲',
          'Ель 🎄',
          'Мох 🍀',
          'Белые грибы 🍄',
          'Ёжик 🦔',
          'Лиса 🦊',
          'Заяц 🐇',
          'Медведь 🐻',
        ],
      },
      {
        id: 22,
        title: 'Потерялся в лесу',
        type: 'mcq',
        prompt: 'Что делать, если ты потерялся в лесу?',
        options: [
          'Крикнуть на всю громкость',
          'Оставаться на месте и дождаться помощи',
          'Бежать в разные стороны',
        ],
        correct: ['Оставаться на месте и дождаться помощи'],
      },
      {
        id: 23,
        title: 'Незнакомые растения',
        type: 'mcq',
        prompt: 'Что можно делать с незнакомыми растениями?',
        options: [
          'Сразу же их трогать',
          'Смотреть на них издалека и не прикасаться',
          'Срывать и есть их',
        ],
        correct: ['Смотреть на них издалека и не прикасаться'],
      },
    ],
  },

  /* Этап 3 */
  {
    id: 3,
    title: 'Угадай слово',
    questions: [
      {
        id: 31,
        title: 'Компас',
        type: 'guess',
        prompt: 'Как называется прибор, который помогает определять стороны света?',
        answer: 'компас',
        placeholder: 'Введите слово',
      },
      {
        id: 32,
        title: 'Ядро',
        type: 'guess',
        prompt: 'Как называется окрашенная часть семени, которую мы едим?',
        answer: 'ядро',
        placeholder: 'Введите слово',
      },
      {
        id: 33,
        title: 'Пчела',
        type: 'guess',
        prompt: 'Как называется насекомое, которое собирает пыльцу и делает мёд?',
        answer: 'пчела',
        placeholder: 'Введите слово',
      },
    ],
  },

  /* Этап 4 */
  {
    id: 4,
    title: 'Водный мир',
    questions: [
      {
        id: 41,
        title: 'Животные в воде',
        type: 'mcq',
        prompt: 'Какие животные живут в воде?',
        options: ['Утка 🦆', 'Рыба 🐟', 'Лиса 🦊', 'Бобр 🦫'],
        correct: ['Утка 🦆', 'Рыба 🐟', 'Бобр 🦫'],
      },
      {
        id: 42,
        title: 'Снаряжение для рыбалки',
        type: 'mcq',
        prompt: 'Что из перечисленного берут на рыбалку?',
        options: ['Удочка 🎣', 'Книга 📚', 'Нож 🔪'],
        correct: ['Удочка 🎣', 'Нож 🔪'],
      },
    ],
  },

  /* Этап 5 — Ребус */
  {
    id: 5,
    title: 'Ребус: что взять в дождь',
    questions: [
      {
        id: 51,
        title: 'Дождевой ребус',
        type: 'guess',
        prompt: 'Реши ребус на картинке и напиши, что нужно взять с собой в дождь.',
        images: ['/src/assets/rebus-umbrella.png'], // путь к изображению ребуса
        answer: 'зонт',
        placeholder: 'Введите слово',
      }
    ],
  },
];
