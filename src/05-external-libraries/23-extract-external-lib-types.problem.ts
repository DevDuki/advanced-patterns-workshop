import { fetchUser } from "fake-external-lib";
import { Equal, Expect, ExpectExtends } from "../helpers/type-utils";

/**
 * We're using a function from fake-external lib, but we need
 * to extend the types. Extract the types below.
 */

/** Sort of a refresher of the first workshop */
type ParametersOfFetchUser = Parameters<typeof fetchUser>;

type ReturnTypeOfFetchUserWithFullName = Awaited<ReturnType<typeof fetchUser>> & {
  fullName: string;
};

export const fetchUserWithFullName = async (
  ...args: ParametersOfFetchUser
): Promise<ReturnTypeOfFetchUserWithFullName> => {
  const user = await fetchUser(...args);
  return {
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
  };
};

const bla = fetchUserWithFullName("123");

type tests = [
  Expect<Equal<ParametersOfFetchUser, [string]>>,
  Expect<
    ExpectExtends<
      { id: string; firstName: string; lastName: string; fullName: string },
      ReturnTypeOfFetchUserWithFullName
    >
  >,
];
