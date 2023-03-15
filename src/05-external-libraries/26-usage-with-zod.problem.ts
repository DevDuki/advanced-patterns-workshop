import { expect, it } from "vitest";
import { z, ZodType } from "zod";

/** Use Zod's types to get type safety for our function */
const makeZodSafeFunction = <TSchema extends ZodType, TReturn>(
  schema: TSchema,
  func: (arg: TSchema['_input']) => TReturn
) => {
  return (arg: TSchema['_input']) => {
    const result = schema.parse(arg);
    return func(result);
  };
};

const addTwoNumbersArg = z.object({
  a: z.number(),
  b: z.number(),
});

const addTwoNumbers = makeZodSafeFunction(
  addTwoNumbersArg,
  (args) => args.a + args.b
);

it("Should error on the type level AND the runtime if you pass incorrect params", () => {
  expect(() =>
    addTwoNumbers(
      // @ts-expect-error
      { a: 1, badParam: 3 }
    )
  ).toThrow();
});

it("Should succeed if you pass the correct type", () => {
  const result = addTwoNumbers({ a: 1, b: 2 });
  expect(result).toBe(3);
});
