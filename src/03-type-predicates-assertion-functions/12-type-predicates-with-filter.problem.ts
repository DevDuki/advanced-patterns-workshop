import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

export const values = ["a", "b", undefined, "c", undefined];

/**
 * Here we use a predicate to make sure that what this function returns is in fact a string and not string | undefined. Be aware tho,
 * that type predicates are not 100% reliable. They are about as safe as the "as" keyword, because for example, in the function below,
 * we could say that "value is undefined" and then after the filter function, we would have an array of undefined, which is not true.
 * Nevertheless, they are pretty useful.
 */
const predicate = (value: string | undefined): value is string => {
  return Boolean(value);
};

const filteredValues = values.filter(predicate);
// or with arrow function
const filteredValues2 = values.filter((value): value is string => {
  return Boolean(value);
});

it("Should filter out the undefined values", () => {
  expect(filteredValues).toEqual(["a", "b", "c"]);
});

it('Should be of type "string[]"', () => {
  type test1 = Expect<Equal<typeof filteredValues, string[]>>;
});
