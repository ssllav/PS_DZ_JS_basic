const dateArray = ['10-02-2022', 'тест', '11/12/2023', '00/13/2022', '41/12/2023', '31-02-2022'];

function processDates(arr) {
  const lengthFiltered = arr.filter(str => str.length === 10);
  
  const mapped = lengthFiltered.map(str => {
    const part1 = str.slice(0, 2);
    const part2 = str.slice(3, 5);
    const yearStr = str.slice(6, 10);
    
    // Определяем, где день, а где месяц (по разделителю)
    let dayStr, monthStr;
    if (str[2] === '/') {
      monthStr = part1;
      dayStr = part2;
    } else {
      dayStr = part1;
      monthStr = part2;
    }
    
    // Приводим к числам
    const day = +dayStr;
    const month = +monthStr;
    const year = +yearStr;
    
    // Сначала базовая проверка диапазонов (отсекает 00 и 41)
    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1) {
      return null;
    }
    
    // ТЕПЕРЬ ПРОВЕРКА СУЩЕСТВОВАНИЯ ДАТЫ (через new Date)
    // Внимание: в JS месяцы начинаются с 0 (0 - январь, 1 - февраль...)
    const dateObj = new Date(year, month - 1, day);
    
    // Если JS "перекинул" дату (например, 31 февраля стало 3 марта), 
    // то day и month не совпадут с тем, что мы передали.
    if (dateObj.getDate() !== day || dateObj.getMonth() !== month - 1 || dateObj.getFullYear() !== year) {
      return null; // Такой даты не существует
    }
    
    // Если всё ок — собираем строку
    return `${dayStr}-${monthStr}-${yearStr}`;
  });
  
  return mapped.filter(item => item !== null);
}

console.log(processDates(dateArray));
// Выведет: ['10-02-2022', '12-11-2023'] (31-02-2022 отсеется!)

/*(ну не изучали мы ещё объекты, но насмотренность тоже нужна. Использовали с ИИ объект Даты для валидации)*/