import React from "react";
import imgApp from "../assets/images/bg-hero.jpg";

const About = () => {
  return (
    <div className="about content__wrap">
      <h2 className="card-main__title about__title">
        Дневник питания «My Food Diary»
      </h2>
      <div className="card-main__img">
        <img src={imgApp} alt="Изображение о нас" />
      </div>

      <div className="about__content">
        <p className="card-p">
          Добро пожаловать в «My Food Diary» - твой надежный спутник в путешествии к здоровому образу жизни!
        </p>

        <p className="card-p">
          В нашем веб-приложении мы сочетаем удобство использования с функциональностью, чтобы помочь тебе вести дневник питания легко и эффективно. «My Food Diary» предлагает интуитивно понятный интерфейс, который позволяет тебе записывать свои приемы пищи, анализировать их и получать персонализированные рекомендации.
        </p>

        <p className="card-p about-list__title">
        Что делает «My Food Diary» особенным?
        </p>

        <ul className="about__list">
          <li>
          Полный контроль над рационом: Наше приложение позволяет тебе вести дневник питания подробно. Ты можешь записывать все, что употребляешь: завтраки, обеды, ужины, перекусы и даже напитки. Кроме того, ты сможешь указывать категории продуктов, размеры порций и добавлять заметки, чтобы иметь полное представление о своем рационе.
          </li>
          <li>
          Индивидуальные рекомендации: «My Food Diary» анализирует данные о твоем питании и предлагает персонализированные рекомендации. Оно учитывает твои цели, предпочтения и диетические ограничения, чтобы помочь тебе принимать осознанные решения о питании и достигать своих целей.
          </li>
          <li>
          Визуализация и анализ: Наше приложение предоставляет графики и статистику, которые помогут тебе понять свои пищевые привычки и тренды. Ты сможешь видеть изменения в своем рационе, выявлять сильные и слабые стороны, а также отслеживать свой прогресс на пути к здоровому образу жизни.
          </li>
          <li>
          Мобильность и доступность: «My Food Diary» доступно на различных устройствах, что позволяет тебе вести свой дневник питания в любое время и в любом месте. Ты сможешь легко добавлять записи, просматривать статистику и получать рекомендации, где бы ты ни находился.
          </li>
        </ul>
        
        <p className="card-p">
        Мы стремимся сделать процесс ведения дневника питания простым, эффективным и вдохновляющим. Сервис поможет тебе осознать свои пищевые привычки, достичь своих целей и насладиться здоровым и сбалансированным образом жизни. Начни свое путешествие с «My Food Diary» уже сегодня и обрети контроль над своим питанием!
        </p>
      </div>
    </div>
  );
};

export default About;
