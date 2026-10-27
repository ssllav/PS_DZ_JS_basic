

for (let i = 1; i < 10; i = i + 1) {
    console.log(`Ваш баланс: ${i} по 1$`);
}

const tasks = ['TarotCard1', 'TarotCard2', 'TarotCard3'];

for (let i = 0; i < tasks.length; i++) {
    if (tasks[i] === 'TarotCard2') {
        continue;
    }

    console.log(tasks[i]);
}

console.log(`-----`);

const tasko = ['TarotCard1', 'TarotCard2', 'TarotCard3'];

for (let i = 0; i < tasko.length; i++) {
    if (tasko[i] === 'TarotCard2') {
        break;
    }

    console.log(tasko[i]);
}

console.log(`-----`);


const arr = ['!', 'JS', 'love', 'Iam'];
const resultArray = [];

for (let i = arr.length - 1; i >= 0; i--) {
    console.log(arr[i]);
    resultArray.push(arr[i]);
}

console.log(resultArray.join(' '));
console.log(arr.reverse().join(' '));

console.log(`-----`);
const cardDeck = [[0, 'fool'], [1, 'mage'], [2, 'low empress']]

for (let j = 0; j < cardDeck.length; j++) {
    console.log(`Cycle 1 - ${j}`);
    for (let z = 0; z < cardDeck[j].length; z++) {
        console.log(cardDeck[j][z]);
    }
}

let x = 0;
while (x < 5) {
    console.log(x);
    x++;
}

console.log(`-----`);
for (let card of cardDeck) {
    console.log(card);
}

console.log(`-----`);
for (let card in cardDeck) {
    console.log(cardDeck[card]);
    console.log(card);
}

console.log(`-----`);

const operations = [1000, -700, 300, -500, 10000];
const iniBalance = 100;

function getBalance(arrOfOperations, initioalbalance) {
    let balance = initioalbalance;
    for (const element of arrOfOperations) {
        balance += element;
    }
    return balance;
}

console.log(getBalance(operations, iniBalance));

function checkPositiveOperations(arrOfOperations, iniBalance) {
    let balance = iniBalance;
    let isOk = true;

    for (const element of arrOfOperations) {
        balance += element;
        if (balance < 0) {
            isOk = false;
            break;
        }
    }
    return isOk;
}

console.log(checkPositiveOperations(operations, iniBalance));

function avarageOperations(arrOfOperations, initioalbalance) {
    let positiveCounts = 0;
    let negativeCounts = 0;
    let positiveCountsSum = 0;
    let negativeCountsSum = 0;
    for (const element of arrOfOperations) {
        if (element > 0) {
            positiveCounts++;
            positiveCountsSum += element;
        }
        if (element < 0) {
            negativeCounts++;
            negativeCountsSum += element;
        }
    }

    return [positiveCountsSum / positiveCounts, negativeCountsSum / negativeCounts];
}

console.log(avarageOperations(operations, iniBalance));



function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

/*callback - вызов функции через переданную функцию чтобы вернуло по ссылке согласно переданной функции*/
function calc(a, b, fn) {
    console.log(fn.name);
    const res = fn(a, b);
    return res;
}

let res1 = calc(3, 5, add);
console.log(res1);
res1 = calc(3, 5, subtract);
console.log(res1);


function power(degree) {
    return function (num) {
        return num ** degree;
    }
}

const powerOfTwo = power(2);
console.log(powerOfTwo(5));

const powerOfThree = power(3);
console.log(powerOfThree(5));

console.log(power(2)(10));


const power = pow => num => num ** pow;


function safeExecute(fn, x) {
    if (typeof fn === 'function' && x > - 100 || x < 100) {
        return fn(x);
    } else {
        return "Not a function";
    }
}


/*foreach*/

const someGame = [2, 25, 23, 75, 2];

// for (const [i, el] of someGame.entries()){
//     console.log(`Раунд ${i+1}: ${el}`);
// }

someGame.forEach(element => {
    console.log(`Раунд: ${element}`);
});

someGame.forEach((element, i) => {
    console.log(`Раунд ${i+1}: ${element}`);
});


/*map */

const transactionsInUSD = [10, -5, 10, 200, -50];
const transactionsInRUR = [];

for (const transaction of transactionsInUSD){
    transactionsInRUR.push(transaction * 60);

}

console.log(transactionsInUSD);
console.log(transactionsInRUR);


const transactionsInRUR2 = transactionsInUSD.map((transaction, i) => {
    return transaction * 60;
})

console.log(transactionsInUSD);
console.log(transactionsInRUR2);

const transactionsInRUR3 = transactionsInUSD
    .map((transaction) => transaction * 60);

console.log(transactionsInUSD);
console.log(transactionsInRUR3);


/* filter */

const operationStack = [10, -5, 10, 2, -50];
// const positiveOperations = [];

// for (const operation of operations){
//     if (operation > 0) {
//         positiveOperations.push(operation);
//     }
// }

// console.log(positiveOperations);

const positiveOperations = operationStack.filter(operation =>{return operation > 0});
console.log(positiveOperations);

const positiveOperationsRUB = operationStack
        .filter(operation =>{return operation > 0})
        .map(operation=> operation * 60);

console.log(positiveOperationsRUB);

/*Упражнение */

const prices = [[100, 200], [120, 100], [250, 500]];

const result = prices
    .map(product => product[1] - product[0])
    .filter(price => price > 0);

console.log(result);

/* reduce */

const operdtio = [10, -5, 10, 200, -50];

let balance = 0;

for (const operation of operdtio){
    balance += operation;
}

console.log(balance);

const finalBalance = operatio.reduce((acc, operation, i) => {
    console.log(`Итерация: ${i}, acc: ${acc}, operation: ${operation}`);
    return acc += operation;
}, 0);

console.log(finalBalance);


const minBalance = operatio.reduce((acc, operation ) => {
    if (operation > acc){
        return acc;
    } else {
        return operation
    }
}, 0);

console.log(minBalance);

/*среднее*/

const arrForMid = [10, -5, 1200, 200, -550];

const average = arrForMid.reduce((acc, el, i) => {
    if (i != arrForMid.length - 1){
        return acc + el;
    } else {
        return (acc + el) / arrForMid.length;    
    }
}, 0);

console.log(average);


/*разраб */

const payUSD = 80;
const projDays = 11;
const avaHours = (11-2)*5;


/* sort */

const users = ['Вася' , 'Аня' , 'Петя' , 'Коля' , 'Ян'] ;
console.log(users);
users.sort();
console.log(users); // вернёт по алфавиту


const oper = [100 , -300 , 200 , -200 , 450] ;
oper.sort();
console.log(oper); // по алфавиту так как строки изначально

oper.sort((a, b) => {
    if (a > b) {
        return 1;
    }
    if ( b < a ) {
        return -1;
    }
});

/* для чисел */
oper.sort((a, b) => a - b );

