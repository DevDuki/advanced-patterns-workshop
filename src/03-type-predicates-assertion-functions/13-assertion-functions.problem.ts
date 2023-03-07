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
 * Here we are using a different kind of predicate function (a cooler one). Instead of returning a boolean, that says whether a value is
 * of a certain type, we use a function that checks whether the value is of type or not. If it's not, then we throw an error, otherwise
 * we don't return anything, but we use the "asserts" keyword as the return type. So wherever this function is consumed, the variable
 * that is passed in this function, becomes an AdminUser type afterwards, without using any return values!
 */
function assertUserIsAdmin(user: NormalUser | AdminUser): asserts user is AdminUser {
  if (user.role !== "admin") {
    throw new Error("Not an admin user");
  }
}

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
    assertUserIsAdmin(user);

    type tests = [Expect<Equal<typeof user, AdminUser>>];
  };
});
