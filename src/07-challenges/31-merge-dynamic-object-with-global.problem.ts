import { Equal, Expect } from "../helpers/type-utils";

const addAllOfThisToWindow = {
  add: (a: number, b: number) => a + b,
  subtract: (a: number, b: number) => a - b,
  multiply: (a: number, b: number) => a * b,
  divide: (a: number, b: number) => a / b,
};

Object.assign(window, addAllOfThisToWindow);

/** Repetition of the declare keyword, interface merging and extending interfaces */
declare global {
  type AddAllOfThisToWindow = typeof addAllOfThisToWindow;
  interface Window extends AddAllOfThisToWindow {}
}

type tests = [
  Expect<Equal<typeof window.add, (a: number, b: number) => number>>,
  Expect<Equal<typeof window.subtract, (a: number, b: number) => number>>,
  Expect<Equal<typeof window.multiply, (a: number, b: number) => number>>,
  Expect<Equal<typeof window.divide, (a: number, b: number) => number>>,
];
