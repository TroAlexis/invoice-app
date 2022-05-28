export const capitalize = (string: string) => {
  const firstLetter = string[0];

  return firstLetter.toUpperCase() + string.slice(1);
};
