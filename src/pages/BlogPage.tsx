import React from "react";
import { Book, GraduationCap, Lightbulb, Mail, MapPin } from "lucide-react";

export default function AboutMe() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-pink-50 via-yellow-50 to-pink-100 flex justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 md:p-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src="/assets/anya.jpg"
            alt="Фото Анны"
            className="w-40 h-40 rounded-full object-cover shadow-lg"
          />
          <div>
            <h1 className="text-3xl font-bold mb-1">Уварова Анна Александровна</h1>
            <p className="text-pink-600 font-semibold mb-2">Выпускник колледжа МПГУ, г. Москва</p>
            <div className="flex items-center gap-3 text-gray-600 text-sm">
              <MapPin size={16} />
              <span>Москва, Россия</span>
            </div>
          </div>
        </div>

        {/* Методика */}
        <section className="mt-10 space-y-4 text-gray-700 leading-relaxed">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-pink-700"><Lightbulb size={20}/>Методика, которой я занимаюсь</h2>
          <p>
            <strong>Формирование творческого интереса</strong> — важная задача при работе с&nbsp;поколением 
            <em> альфа </em>. Исследователи отмечают, что в&nbsp;условиях информационного бума объём
            знаний растёт быстрее, чем формируются логические структуры мышления: процесс идёт
            стихийно, и&nbsp;продуктивность (особенно творческая) остаётся ниже потенциальных
            возможностей детей.
          </p>
          <p>
            Ключевой акцент моей методики — <strong>теория игрового обучения</strong>. Игра — естественный
            способ познания мира; она активирует когнитивные, социальные и&nbsp;            эмоциональные
            навыки, делая усвоение материала мотивирующим и&nbsp;само‑подкрепляющимся.
          </p>
          <p>
            Я рассматриваю <strong>творческое (дивергентное) мышление</strong> как процесс генерации новых
            идей через нестандартные, образные и&nbsp;сенсорные связи. Развивая у&nbsp;младших
            школьников способность мыслить вне шаблонов, мы&nbsp;получаем креативность,
            находчивость, остроумие и&nbsp;предприимчивость.
          </p>
          <div className="flex justify-center sm:justify-start mt-6">
  <img
    src="/assets/anya2.jpg"
    alt="Анна на занятии"
    className="
      w-[250px] h-[250px]           /* задаём размер напрямую */
      object-cover rounded-2xl      /* мягкие углы */
      shadow-lg ring-4 ring-pink-200/40  /* лёгкий цветной обвод */
    "
  />
</div>
          
          <p>
            Дети с&nbsp;развитыми творческими навыками:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>легче адаптируются к&nbsp;изменениям;</li>
            <li>проявляют глубокий интерес к&nbsp;процессу обучения;</li>
            <li>быстрее находят решения нестандартных задач;</li>
            <li>становятся самостоятельнее и&nbsp;увереннее.</li>
          </ul>
        </section>

        {/* Education & skills */}
        <section className="mt-10 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold mb-3"><GraduationCap size={20}/>Образование</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
              <li>Колледж Московского педагогического государственного университета, <br/>специальность «Преподавание в&nbsp;начальных классах» </li>
          
            </ul>
          </div>
          {/* <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold mb-3"><Book size={20}/>Навыки и интересы</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
              <li>Проектирование игровых уроков (game‑based learning)</li>
              <li>Методики развития дивергентного мышления</li>
              <li>Разработка образовательных приложений на React + TypeScript</li>
              <li>Создание иллюстраций в Adobe Illustrator и Figma</li>
              <li>Организация STEM‑активностей для младших школьников</li>
            </ul>
          </div> */}
        </section>

        {/* Contacts */}
        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-3"><Mail size={20}/>Контакты</h2>
          <p className="text-gray-700 text-sm">📧 <code className="text-pink-600 font-semibold">anna_uvarova.teacher@mail.ru</code></p>
          <p className="text-gray-700 text-sm">Telegram: <code>@pt_aaaa_</code></p>
        </section>
      </div>
    </div>
  );
}
