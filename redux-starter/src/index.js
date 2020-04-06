const numbers = [1, 2, 3];

// Adding
const numbers2 = [0, ...numbers, 4, 5];
const index = numbers.indexOf(2);
const numbers3 = [...numbers.slice(0, index), 4, ...numbers.slice(index)];

// Removing
const numbers4 = numbers.filter((n) => n !== 2);

// Updating
const numbers5 = numbers.map((n) => (n === 2 ? 20 : n));

console.log(numbers);
console.log(numbers2);
console.log(numbers3);
console.log(numbers4);
console.log(numbers5);
