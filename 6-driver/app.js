// Вариант для истинных фанатов короткого замыкания - метод "сквозняка" без сбора логики
const result = (age >= 18 && hasLicence && !isDrunk) && 'может' || 'не может';
console.log(result);

// вариант вероятно как положено, через тернарный
const canDrive = (age >= 18 && hasLicence && !isDrunk) ? 'может' : 'не может';
console.log(canDrive);