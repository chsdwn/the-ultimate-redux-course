import { Map } from "immutable";

let book = Map({ title: "Otostopçunun Galaksi Rehberi" });

function publish(book) {
  return book.set("isPublished", true);
}

book = publish(book);

console.log(book.get("title"));
console.log(book.get("isPublished"));
console.log(book.toJS());
