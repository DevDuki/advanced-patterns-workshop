
/**
 * U can override a library's type definitions for existing functions or other types in a separate declaration file! You can even
 * extend it, which is pretty cool. So now we can make "getAnimatingState" return what we want it to return. This is really dangerous,
 * but sometimes the only choice we have.
 */
declare module "fake-animation-lib" {
  export type AnimatingState =
    | "before-animation"
    | "animating"
    | "after-animation";
  export function getAnimatingState(): AnimatingState;
}
