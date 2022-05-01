export type ClassNamesObject = Record<string, boolean | undefined>;
export type ClassNamesArray = Array<string | false | undefined>;
export type ClassNames = string | ClassNamesObject | ClassNamesArray;
