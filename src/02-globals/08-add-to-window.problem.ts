import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

/**
 * Clues:
 *
 * 1. You'll need declare global again
 *
 * 2. Inside declare global, you'll need to modify the Window
 * interface to add a makeGreeting function
 */

/**
 * Here we are using declaration merging. By declaring the interface "Window" again, which already exists on the global scope, we are
 * able to add a new property to it.
 */
declare global {
  interface Window {
    makeGreeting: () => string;
  }
}

window.makeGreeting = () => "Hello!";

it("Should let you call makeGreeting from the window object", () => {
  expect(window.makeGreeting()).toBe("Hello, world!");

  type test1 = Expect<Equal<typeof window.makeGreeting, () => string>>;
});

it("Should not be available on globalThis", () => {
  expect(
    // @ts-expect-error
    globalThis.makeGreeting,
  ).toBe(undefined);
});
