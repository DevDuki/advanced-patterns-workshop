import { Equal, Expect } from "../helpers/type-utils";

/**
 * This so called "reversed mapped type", as to Matt calls it, is quite interesting, because it can infer the type of the keys of the
 * object, that is being passed in, before we actually types the object. (?) - I don't really understand why matt is so amazed about it.
 * To me it looks like a normal way of using a mapped type.
 */
export function makeEventHandlers<THandlerName extends string>(obj: {
  [K in THandlerName]: (name: K) => void;
}) {
  return obj;
}

const obj = makeEventHandlers({
  click: (name) => {
    console.log(name);

    type test = Expect<Equal<typeof name, "click">>;
  },
  focus: (name) => {
    console.log(name);

    type test = Expect<Equal<typeof name, "focus">>;
  }
});
