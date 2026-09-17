

for(let i = 1; i < 10; i = i + 1) {
console.log(`Ваш баланс: ${i} по 1$`);
}

const tasks = ['TarotCard1', 'TarotCard2', 'TarotCard3' ];

for(let i = 0; i < tasks.length; i++) {
    if (tasks[i] === 'TarotCard2') {
        continue;
    }

    console.log(tasks[i]);
}

console.log(`-----`);

const tasko = ['TarotCard1', 'TarotCard2', 'TarotCard3' ];

for(let i = 0; i < tasko.length; i++) {
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

for (let j = 0; j < cardDeck.length; j++){
    console.log(`Cycle 1 - ${j}`);
        for ( let z = 0; z < cardDeck[j].length; z++) {
            console.log(cardDeck[j][z]);
        }
}

let x = 0;
while ( x < 5) {
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

function getBalance (arrOfOperations, initioalbalance) {
    let balance = initioalbalance;
    for (const element of arrOfOperations) {
        balance += element;
    }
    return balance;
}

console.log(getBalance(operations, iniBalance));

function checkPositiveOperations (arrOfOperations, iniBalance) {
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

console.log(checkPositiveOperations (operations, iniBalance));

function avarageOperations (arrOfOperations, initioalbalance) {
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

console.log(avarageOperations (operations, iniBalance));