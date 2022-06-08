import { Callback } from "types/shared";

export function logger(...args: any[]) {
  console.log("Arguments: ", ...args);
}

export const withNameLogger = (name: string): Callback => {
  return (...args) => {
    return logger(...args, "| Function name: ", name);
  };
};

export const withTraceLogger = withTrace((...args) => {
  logger(...args, "| Function trace: ");
});

export function withTrace<F extends Callback>(fn: F) {
  return (...args: Parameters<F>) => {
    fn(...args);
    console.trace();
  };
}

export const isUndefined = <T>(
  variable: T | undefined
): variable is undefined => variable === undefined;

export const timeout = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export const set = <T>(obj: T, key: keyof T, value: T[typeof key]) => {
  obj[key] = value;

  return obj;
};

export const isKeyIn = <T extends object>(
  obj: T,
  key: string | number | symbol
): key is keyof T => key in obj;
