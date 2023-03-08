import { Equal, Expect } from "../helpers/type-utils";

class Form<TValues> {
  error?: string;

  constructor(
    public values: TValues,
    private validate: (values: TValues) => string | void,
  ) {}

  /**
   * Here we have 2 kinds of solutions, where both actually do the same, but just use a slightly different syntax. I prefer the
   * uncommented one.
   *
   * So here we use a predicate function inside a class, where we use "this" to refer the class instance AND type! WHat??
   *
   * So the first "this" before the "is" refers to the caller of isInvalid, which means the current instance of this class. Since we
   * don't expect an argument in this class, we can't just use the argument, so we use "this" instead. The "this" after the "is" keyword
   * is referring the class as type! As you can see in the commented code part, its equivalent to "Form<TValues>". So here we basically
   * take the default type and add the part we have validated via the intersection "&" and give it the type we want it to have.
   */
  // isInvalid(): this is Form<TValues> & { error: string } {
  isInvalid(): this is this & { error: string } {
    const result = this.validate(this.values);

    if (typeof result === "string") {
      this.error = result;
      return true;
    }

    this.error = undefined;
    return false;
  }
}

const form = new Form(
  {
    username: "",
    password: "",
  },
  (values) => {
    if (!values.username) {
      return "Username is required";
    }

    if (!values.password) {
      return "Password is required";
    }
  },
);

if (form.isInvalid()) {
  type test1 = Expect<Equal<typeof form.error, string>>;
} else {
  type test2 = Expect<Equal<typeof form.error, string | undefined>>;
}
