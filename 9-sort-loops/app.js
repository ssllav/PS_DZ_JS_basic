const arr = [1, 40, -5, 10, 0];

function bubbleSort(array) {
    // Делаем копию массива через slice(), чтобы не менять оригинал
    const sortedArray = array.slice(); 
    
    // Внешний цикл: отвечает за количество проходов
    for (let i = 0; i < sortedArray.length; i++) {
        
        // Внутренний цикл: сравнивает соседние элементы
        for (let j = 0; j < sortedArray.length - 1; j++) {
            
            // Если левый элемент больше правого — меняем их местами
            if (sortedArray[j] > sortedArray[j + 1]) {
                // Классический обмен через временную переменную (как в C#)
                let temp = sortedArray[j];
                sortedArray[j] = sortedArray[j + 1];
                sortedArray[j + 1] = temp;
            }
        }
    }
    
    return sortedArray;
}

// === ПРОВЕРКА КОДА ===
console.log(bubbleSort(arr)); // [-5, 0, 1, 10, 40]