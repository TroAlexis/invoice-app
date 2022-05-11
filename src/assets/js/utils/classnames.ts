import {
  ClassName,
  ClassNames,
  ClassNamesArray,
  ClassNamesObject,
} from "types/shared";

export const classNames = (classes: ClassNames) => {
  if (typeof classes === "string") {
    return classes;
  }

  const classNames = transformClassNames(classes);

  return joinClassNames(classNames);
};

function joinClassNames(classes: ClassName[]): string {
  return classes.join(" ");
}

function transformClassNames(classes: ClassNames) {
  const isArray = Array.isArray(classes);

  if (isArray) {
    return handleClassesArray(classes);
  } else if (classes && typeof classes === "object") {
    return handleClassesObject(classes);
  }

  return [];
}

function handleClassesArray(classes: ClassNamesArray): ClassName[] {
  return classes
    .filter((name) => !!name)
    .map((className) => {
      return classNames(className);
    });
}

function handleClassesObject(classes: ClassNamesObject): ClassName[] {
  const classNames = Object.keys(classes);
  const filteredClassNames = classNames.filter((name) => classes[name]);
  return handleClassesArray(filteredClassNames);
}
