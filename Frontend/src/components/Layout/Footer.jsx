// src/components/Layout/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Footer.css";

const Footer = () => {
  // Функції для завантаження файлів
  const downloadTerms = () => {
    const termsText = `УМОВИ ВИКОРИСТАННЯ ДОДАТКУ "FAMILY DEP CASINO"
(Дуже важливо прочитати, навіть якщо ви не вмієте читати)

1. Загальні Положення
1.1. Цей додаток ("Казик") створений для того, щоб ви могли швидко позбутися зайвих грошей. Якщо ви хочете зберегти свої кошти – просто видаліть додаток.

1.2. Натискаючи "Погоджуюсь", ви автоматично:

Продаєте нам душу (якщо вона у вас є)

Даєте дозвіл сміятися з ваших ставок

Обіцяєте ніколи не казати дружині/чоловікові, скільки ви програли

2. Ваш Гаманець – Наше Щастя
2.1. Поповнюючи баланс, ви офіційно передаєте нам право називати ваші гроші "нашими".

2.2. Якщо ви виграли – це помилка системи. Будь ласка, поверніть кошти.

2.3. Якщо ви програли – це ваш кармічний борг. Дякуємо за внесок у наш фонд "Острів у Мальдівах для Розробників".

3. Відповідальна Гра (Серйозно, Ми Не Жартуємо)
3.1. Грайте відповідально:

Не продавайте нирки для ставок (вони нам не потрібні).

Не грайте під час похорону родича (він може ожити від вашого лайку).

Якщо ви програли зарплату – просто скажіть, що вас пограбували. Ми підтримаємо вашу брехню.

3.2. Наш "Рахунок Відповідальної Гри" – це просто кнопка, яка нічого не робить, але виглядає дуже переконливо.

4. Наші Зобов'язання (Гарантії = 0%)
4.1. Ми гарантуємо, що:

Рулетка НЕ пам'ятає ваші попередні числа (але вона з вами сміється).

Слоти НЕ мають мозку (на відміну від вас, якщо ви тут граєте).

4.2. Ми не відповідаємо, якщо:

Ваша дружина/собака/кот викинули телефон у вікно після вашої чергової поразки.

Ви витратили гроші на бонуси замість їжі (голод – це додатковий адреналін).

5. Магія та Чаклунство
5.1. Використовуючи додаток, ви погоджуєтеся, що:

Ваші програші – це не статистика, а "нещасливий день".

Виграші – це не ваша заслуга, а "технічний глюк".

5.2. Якщо ви прокляли додаток після програшу – ми вже відправили ваше прокляття назад зі знижкою 50% на наступну ставку.

6. Фінальна Умова (Сюрприз!)
6.1. Якщо ви прочитали ці умови до кінця – ви або юрист, або вам дуже нудно. У будь-якому випадку, отримуйте бонус: "1 безкоштовна ставка на число 13" (якщо виграєте – ми залишимо собі 99% комісії).`;

    const element = document.createElement("a");
    const file = new Blob([termsText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "Умови_використання_FamilyDep.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadPrivacy = () => {
    const privacyText = `ПОЛІТИКА КОНФІДЕНЦІЙНОСТІ "FAMILY DEP CASINO"
(Ми збираємо ваші дані, але запевняємо - ми їх просто продаємо)

1. Які Дані Ми Збираємо
1.1. Все. Абсолютно все:

Ваші ставки (щоб сміятися)

Ваш баланс (щоб плакати)

Ваші спроби вимкнути додаток після програшу (ми знаємо, ви повернетесь)

1.2. Ми також збираємо:

Ваші сльози (через фронт-камеру)

Ваші прокльони (через мікрофон)

Ваші мрії про виграш (через нейроінтерфейс, якого у нас немає, але ми все одно стверджуємо, що збираємо)

2. Як Ми Використовуємо Ваші Дані
2.1. Для вашого ж блага:

Продаємо рекламодавцям, щоб вони знали, які саме кредити вам пропонувати

Ділимося з азартними сусідами (вони обіцяли "просто подивитись")

2.2. Для наукових цілей:

Доводимо, що навіть розумні люди роблять дурні ставки

3. Хто Ще Отримує Ваші Дані
3.1. Усі, хто заплатить:

Маркетингові агенції

Банки (щоб відмовляли вам у кредитах)

Ваша дружина/чоловік (якщо сплатять нам 50% від суми вашого програшу)

3.2. Випадкові люди:

Наші колишні співробітники

Хакери (ми їм просто не хочемо заважати)

4. Як Ми "Захищаємо" Ваші Дані
4.1. Ми використовуємо:

Супер-секретний пароль "12345"

Файл Excel під назвою "Не_відкривати.txt"

4.2. Якщо станеться витік даних:

Ми подзвонимо вашій мамі і вибачимося

Запропонуємо вам бонус у розмірі 5% від вкрадених грошей

5. Ваші Права (Га-Га)
5.1. Ви маєте право:

Запитати, які саме дані ми про вас збираємо (але ми вам не відповімо)

Вимагати видалити ваші дані (ми видалимо їх з нашої бази, але не з 37 інших)

5.2. Ви НЕ маєте права:

Заважати нам отримувати прибуток від ваших даних

Судитися з нами (у наших умовах використання є пункт про вашу згоду стати нашим рабом)

6. Кукі (Ні, не ті, що їстівні)
6.1. Ми використовуємо кукі, щоб:

Запам'ятовувати ваші найбільші програші (для мотивації)

Показувати вам рекламу казино, коли ви намагаєтеся знайти допомогу для азартних гравців`;

    const element = document.createElement("a");
    const file = new Blob([privacyText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "Політика_конфіденційності_FamilyDep.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <footer className="casino-footer">
      <div className="footer-content">
        <div className="footer-links">
          <button onClick={downloadTerms} className="footer-link-button">
            Умови використання
          </button>
          <button onClick={downloadPrivacy} className="footer-link-button">
            Політика конфіденційності
          </button>
        </div>
        <div className="footer-copyright">
          <p>© {new Date().getFullYear()} Family Dep. Всі права захищені.</p>
          <p>Грайте відповідально. 18+</p>
          <p>Служба підтримки-телеграм:@Autishnick @Divaks </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
