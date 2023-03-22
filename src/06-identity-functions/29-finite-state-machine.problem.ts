// import { F } from "ts-toolbelt";

import { F } from 'ts-toolbelt';

/**
 * Clue: F.NoInfer is part of the solution!
 *
 * You'll need to modify the interface below
 * to get it to work.
 */

/**
 * Here we use the NoInfer type helper from ts-toolbelt, which is actually quite interesting, because it tells typescript not to infer
 * the generic type yet, but rather go to the next usage of the generic type and infer it there.
 * */
interface FSMConfig<TState extends string> {
  initial: F.NoInfer<TState>;
  states: Record<
    TState,
    {
      onEntry?: () => void;
    }
  >;
}

export const makeFiniteStateMachine = <TState extends string>(
  config: FSMConfig<TState>
) => config;

const config = makeFiniteStateMachine({
  initial: "a",
  states: {
    a: {
      onEntry: () => {
        console.log("a");
      },
    },
    // b should be allowed to be specified!
    b: {},
  },
});

const config2 = makeFiniteStateMachine({
  // c should not be allowed! It doesn't exist on the states below
  // @ts-expect-error
  initial: "c",
  states: {
    a: {},
    // b should be allowed to be specified!
    b: {},
  },
});
