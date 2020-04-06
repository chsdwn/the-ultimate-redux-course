function sayHello() {
  return function () {
    return "Hello World";
  };
}

const fn = sayHello();
const message = fn();
console.log(message);
