export const prettifyDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const isDate = (date: unknown): date is Date => {
  return date instanceof Date;
};

export const toUTCString = (date: Date): string => {
  return date.toUTCString();
};
