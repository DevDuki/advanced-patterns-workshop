import { Equal, Expect } from "../helpers/type-utils";

class CustomError extends Error {
  constructor(message: string, public code: number) {
    super(message);
    this.name = "CustomError";
  }
}

// How do we type the 'error' parameter?

/** Here we learned that we can use the TS class as a type too */
const handleCustomError = (error: CustomError) => {
  console.error(error.code);

  type test = Expect<Equal<typeof error.code, number>>;
};

export {};
