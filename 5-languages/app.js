// 1. Задаем переменную с языком (сюда можно подставить 'ru', 'en' или 'de') Ставим let так как по условия она динамически может измениться
let language = "de";

// 2. Проверяем значение через switch
switch (language) {
  case "en":
    console.log("Hello!");
    break;

  case "ru":
    console.log("Привет!");
    break;

  case "de":
    console.log("Gutten tag!");
    break;

  default:
    console.log("Unknown language / Неизвестный язык"); // защита от ... хз чего ну лучше не надо
}
