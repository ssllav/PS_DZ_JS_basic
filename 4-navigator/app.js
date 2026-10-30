// Рассчёт гипотенузы по теореме Пифагора. 
// Мысля с позиции Навинатора переменные могут меняться динамически при получении откуда-то

let positionLatitude = 35 ;
let positionLongitude = 70 ;

let addressLatitude  = 33 ;
let addressLongitude = 60 ;

// Определяем разницы координат между исчисляемыми
const diffLatitude = addressLatitude - positionLatitude ;
const diffLongitude = addressLongitude - positionLongitude ;

const lengthToDrive = ( (diffLatitude)**2 + (diffLongitude)**2 ) ** 0.5 ;

//Выводим в консоль
console.log(`Расстояние между точками ${lengthToDrive}`);

//Вариант с math квадратный корень
const lengthToDrive2 = Math.sqrt(diffLatitude**2 + diffLongitude**2);

// Вывод 2
console.log(`Расстояние между точками ${lengthToDrive2}`);

//Вариант с гипотенузой по Math.hypot()
const lengthToDrive3 = Math.hypot(addressLatitude - positionLatitude, addressLongitude - positionLongitude);
// Вывод 3
console.log(`Расстояние между точками ${lengthToDrive3}`);


const tasks = ['Задача 1'];

function add(task) {
    tasks.push(task);
}

function Remove(task) {
    const index = tasks.indexOf(task);
    if (index === -1) {
        return;
    }
        return tasks.splice(index, 1);
}

function Prioritize(task) {
    const index = tasks.indexOf(task);
    if (!result) {
        return;
    }
    tasks.unshift(result[0]);
}


const url = 'https://app.purpleschool.ru/courses/9/sections/127/lessons/793';

function getUrlParts(url) {
    const [protocol, _, host, ...path] = url.split('/');
    console.log(protocol, _, host, path);
    console.log(`Протокол: ${protocol.split(':')[0] }`);
    console.log(`Хост: ${host}`);
    console.log(`Линк: /${path.join('/')}`);
}