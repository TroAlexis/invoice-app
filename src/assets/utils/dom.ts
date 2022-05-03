import { ClassNames, ClassNamesArray, ClassNamesObject } from "@/types/shared";

export const classNames = (classes: ClassNames) => {
  if (typeof classes === "string") {
    return classes;
  }

  const isArray = Array.isArray(classes);

  const classNames = isArray
    ? handleClassesArray(classes)
    : handleClassesObject(classes);

  return joinClassNames(classNames);
};

function joinClassNames(classes: Array<string>): string {
  return classes.join(" ");
}

function handleClassesArray(classes: ClassNamesArray): Array<string> {
  return classes.filter((name): name is string => !!name);
}

function handleClassesObject(classes: ClassNamesObject): Array<string> {
  const classNames = Object.keys(classes);
  return classNames.filter((name) => classes[name]);
}
