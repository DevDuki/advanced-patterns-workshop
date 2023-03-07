import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

interface User {
  id: string;
  name: string;
}

interface AdminUser extends User {
  role: "admin";
  organisations: string[];
}

interface NormalUser extends User {
  role: "normal";
}

/**
 * This is the same function as in the previous exercise, but instead of using the "function" keyword, we are using an arrow function.
 * For some reason typescript throws an alien-like error for this issue and I am also not entirely sure why functions with "asserts"
 * cannot be an arrow function.
 */
const assertUserIsAdmin = (
  user: NormalUser | AdminUser,
): asserts user is AdminUser => {
  if (user.role !== "admin") {
    throw new Error("Not an admin user");
  }
};

it("Should throw an error when it encounters a normal user", () => {
  const user: NormalUser = {
    id: "user_1",
    name: "Miles",
    role: "normal",
  };

  expect(() => assertUserIsAdmin(user)).toThrow();
});

it("Should assert that the type is an admin user after it has been validated", () => {
  const example = (user: NormalUser | AdminUser) => {
    /**
     * Why is this error happening?
     *
     * Note: PLEASE DON'T SPEND TOO LONG HERE - feel
     * free to use the solution. I have personally wasted
     * hours on this error.
     */
    // @ts-expect-error
    assertUserIsAdmin(user);

    // @ts-expect-error
    type tests = [Expect<Equal<typeof user, AdminUser>>];
  };
});
