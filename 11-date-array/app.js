const dateArray = ['10-02-2022', 'тест', '11/12/2023', '00/13/2022', '41/12/2023'];

function processDates(arr) {
  // Шаг 1. Фильтр по длине (10 символов)
  const lengthFiltered = arr.filter(str => str.length === 10);
  
  // Шаг 2. Мап: режем и проверяем
  const mapped = lengthFiltered.map(str => {
    const day = str.slice(0, 2);
    const month = str.slice(3, 5);
    const year = str.slice(6, 10);
    
    // Проверяем числа
    if (+day > 0 && +day < 32 && +month > 0 && +month < 13 && +year > 0) {
      return `${day}-${month}-${year}`;
    }
    
    return null; // невалидная дата
  });
  
  // Шаг 3. Отсеиваем null (используем привычное условие)
  return mapped.filter(item => item !== null);
}

console.log(processDates(dateArray));