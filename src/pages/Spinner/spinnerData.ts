/* Данные для игры‑волчка. Здесь описаны секторы, их цвета, иконки и вопросы.
   Экспортируем именованный const `sectors`, который использует SpinnerGame. */

   export interface Question {
    q: string;  // текст вопроса
    a: string;  // правильный ответ (строка, без регистра)
  }
  
  export interface Sector {
    id: number;
    color: string;   // цвет дуги
    label: string;   // подпись (пока не выводится, но можно подсказкой)
    image: string;   // путь к PNG / SVG, который лежит в public/assets
    questions: Question[];
  }
  
  export const sectors: Sector[] = [
    {
      id: 1,
      color: "#ff8c00", // оранжевый
      label: "Космос",
      image: "/assets/sector-space.png",
      questions: [
        { q: "Откуда ракета отправляется в космос?",                     a: "космодром" },
        { q: "Как называют космический дом на орбите?",                 a: "космическая станция" },
        { q: "Кто первый полетел в космос?",                             a: "гагарин" },
        { q: "Как называется одежда космонавта?",                       a: "скафандр" },
        { q: "Корабль на поверхности планет?",                           a: "луноход" },
        { q: "Какие животные Белка и ___?",                              a: "стрелка" }
      ]
    },
    {
      id: 2,
      color: "#0054a6", // синий
      label: "Воздух",
      image: "/assets/sector-air.png",
      questions: [
        { q: "Как называется команда, управляющая воздушным судном?",    a: "экипаж" },
        { q: "Кто управляет самолётом?",                                 a: "пилот" },
        { q: "Самолёт, вертолёт, воздушный шар. Что лишнее?",            a: "воздушный шар" },
        { q: "Как называется место взлёта и посадки самолётов?",          a: "аэропорт" },
        { q: "Чем вертолёт отличается от самолёта? (одно слово)",        a: "винты" },
        { q: "Что показывает на кокпите прибор 'альтиметр'?",            a: "высота" }
      ]
    },
    {
      id: 3,
      color: "#e40000", // красный
      label: "Суша (транспорт)",
      image: "/assets/sector-land.png",
      questions: [
        { q: "Как называют машину, перевозящую много пассажиров?",        a: "автобус" },
        { q: "Двухколёсное средство с педалями?",                         a: "велосипед" },
        { q: "Место ожидания поезда?",                                    a: "вокзал" },
        { q: "Самый быстрый сухопутный транспорт? (поезда)",              a: "поезд" },
        { q: "Чем питается электросамокат?",                              a: "электричество" },
        { q: "Сколько колёс у мотоцикла?",                                a: "2" }
      ]
    },
    {
      id: 4,
      color: "#ffeb3b", // жёлтый
      label: "Вода",
      image: "/assets/sector-water.png",
      questions: [
        { q: "Как называется дом моряка на воде?",                        a: "корабль" },
        { q: "Судно без мотора и без вёсел, которое тянут?",             a: "баржа" },
        { q: "Чем управляют на корабле? (рулем)",                        a: "штурвал" },
        { q: "Где хранит судно спасательные средства? (одно слово)",     a: "палуба" },
        { q: "Как называется место стоянки кораблей?",                   a: "порт" },
        { q: "Подводная лодка вокруг чего движется?",                    a: "винт" }
      ]
    },
    {
      id: 5,
      color: "#4caf50", // зелёный
      label: "Город",
      image: "/assets/sector-city.png",
      questions: [
        { q: "Высокое здание называется...?",                             a: "небоскрёб" },
        { q: "Где люди ходят через дорогу?",                              a: "пешеходный переход" },
        { q: "Как называется подземная железная дорога?",                a: "метро" },
        { q: "Кто управляет движением на перекрёстке?",                  a: "светофор" },
        { q: "Как называется место, где стоят машины на ночь?",          a: "парковка" },
        { q: "Как зовут работника, который едет на мусоровозе?",         a: "дворник" }
      ]
    }
  ];
  