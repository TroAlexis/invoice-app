const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
const MS_IN_SECONDS = 1000;

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

export const daysToMs = (days: number): number => {
  return (
    days / HOURS_IN_DAY / MINUTES_IN_HOUR / SECONDS_IN_MINUTE / MS_IN_SECONDS
  );
};
