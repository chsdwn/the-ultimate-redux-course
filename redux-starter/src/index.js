import { produce } from "immer";

let book = { title: "Otostopçunun Galaksi Rehberi" };

function publish(book) {
  return produce(book, (draftBook) => {
    draftBook.isPublished = true;
  });
}

book = publish(book);

console.log(book);
