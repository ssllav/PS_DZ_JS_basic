function convertCurrency(amount, from = 'руб', to = '$') {
    const usdRate = 90; // Курс доллара

    // Жесткий фильтр: если пара строго 'руб' и '$', то переводим. Иначе — нафиг.
    if (from === 'руб' && to === '$') {
        return amount / usdRate;
    }

    return null;
}

// Тесты:
console.log(convertCurrency(1000)); // Вызовет дефолты (руб в $): вернет 11.11
console.log(convertCurrency(1000, 'руб', 'EUR')); // Вернет: null