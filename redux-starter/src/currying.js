function add(a) {
  return function (b) {
    return a + b;
  };
}
const add = (a) => (b) => a + b;

add(1)(5);
