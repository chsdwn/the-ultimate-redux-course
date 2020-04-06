import { compose, pipe } from "lodash/fp";

const input = "  JavaScript  ";
const output = "<div>" + input.trim() + "</div>";

const trim = (str) => str.trim();
const wrapInDiv = (str) => `<div>${str}</div>`;
const toLowerCase = (str) => str.toLowerCase();

// const transform = compose(wrapInDiv, toLowerCase, trim);
const transform = pipe(trim, toLowerCase, wrapInDiv);

const result = transform(input);
console.log(result);
