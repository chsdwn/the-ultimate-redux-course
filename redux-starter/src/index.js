const person = { name: "Ali", address: { country: "TR", city: "Istanbul" } };
const person2 = Object.assign({}, person, { name: "Veli", date: 12 });
const person3 = { ...person, name: "Ahmet" };
const person4 = {
  ...person,
  address: {
    ...person.address,
    city: "Ankara",
  },
  name: "Mehmet",
};

console.log(person);
console.log(person2);
console.log(person3);
console.log(person4);
