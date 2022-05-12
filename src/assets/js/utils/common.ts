type Callback = (...args: any[]) => any;

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
