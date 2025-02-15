import { Equal, Expect } from "../helpers/type-utils";
import { F } from 'ts-toolbelt';

interface Fruit {
  name: string;
  price: number;
}

/**
 * Here we use the F.Narrow and Extract utility types to get the exact type of the fruit and make it able to autocomplete with the
 * fruit's name as the getter.
 */
export const wrapFruit = <TFruits extends Fruit[]>(fruits: F.Narrow<TFruits>) => {
  const getFruit = <TName extends TFruits[number]["name"]>(name: TName) => {
    return fruits.find((fruit) => fruit.name === name) as Extract<TFruits[number], { name: TName }>;
  };

  return {
    getFruit,
  };
};

const fruits = wrapFruit([
  {
    name: "apple",
    price: 1,
  },
  {
    name: "banana",
    price: 2,
  },
]);

const banana = fruits.getFruit("banana");
const apple = fruits.getFruit("apple");
// @ts-expect-error
const notAllowed = fruits.getFruit("not-allowed");

type tests = [
  Expect<Equal<typeof apple, { name: "apple"; price: 1 }>>,
  Expect<Equal<typeof banana, { name: "banana"; price: 2 }>>,
];
