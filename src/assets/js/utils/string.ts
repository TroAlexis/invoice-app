export const capitalize = (string: string) => {
  const firstLetter = string[0];

  return firstLetter.toUpperCase() + string.slice(1);
};

export const splitThousands = (string: string, separator: string = ",") => {
  return string.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, `$1${separator}`);
};

export const prettifyPrice = (price: number) => {
  return splitThousands(price.toFixed(2));
};
