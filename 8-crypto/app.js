// Выносим алгоритм в переменную-функцию (соблюдаем DRY)
const runCipher = (str) => {
    const arr = str.split('');
    const [a, b, c, d, ...rest] = arr;
    return [d, c, b, a, ...rest.reverse()].join('');
};

// Функция 1: Шифратор
function crypto(password) {
    return runCipher(password);
}

// Функция 2: Проверка
function check(encryptedPassword, passwordToCheck) {
    // Разворачиваем зашифрованный пароль обратно и сверяем со вторым аргументом
    return runCipher(encryptedPassword) === passwordToCheck;
}

// === Проверка из ТЗ ===
console.log(crypto('password')); // 'ssapdorw'
console.log(check('ssapdorw', 'password')); // true
console.log(check('ssapdorw', 'wrong'));    // false


/*мне сделал ИИ но я решил оставить его ответ так как мне понравился больше. 
Чтобы соответствовать задаче где написано 2 функции, я попросил его вынести модуль шифрования процедуры шифрования отдельно
Но так чтобы это не выглядело функцией, а было переменной... 
Я бы сам написал некрасиво и продублировал очевидное.
Ну и как вариант, функция спрятанная в переменную, вообще могла бы принимать динамический ежедневный ключ шифрования*/