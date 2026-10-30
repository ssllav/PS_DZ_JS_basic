function filterArray(arr, shouldDelete) {
  // 1. Создаем массив, куда будем собирать выжившие числа
  let result = [];

  // 2. Идем циклом по каждому числу
  for (let num of arr) {
    // Вызываем функцию проверки для текущего числа
    let isTargetForDeletion = shouldDelete(num);

    // Если функция говорит false (удалять НЕ надо) — оставляем число
    if (isTargetForDeletion === false) {
      result.push(num);
    }
  }

  // 3. Возвращаем отфильтрованный результат
  return result;
}

// === Пример для проверки (можешь запустить в консоли) ===
const numbers = [1, 1, 3, 5, 8, 13, 21, 35]; // бгг фибо

// Колбэк: удаляем все четные числа (если делится на 2 без остатка — true)
const deleteEven = (x) => x % 2 === 0;

console.log(filterArray(numbers, deleteEven));