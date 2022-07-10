import { Size } from "constants/size";
import React, { ComponentPropsWithoutRef, ElementType } from "react";
import { classNames } from "utils/classnames";
import styles from "./Heading.module.scss";

const Headings = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
} as const;

export interface Props extends ComponentPropsWithoutRef<"p"> {
  element?: ElementType;
  level: keyof typeof Headings;
  size?: Size.SMALL | Size.MEDIUM;
}

export default function Heading({
  level = Headings.h1,
  element = Headings.h1,
  size,
  className,
  children,
  ...props
}: Props) {
  const HeadingTag = element;

  const classes = classNames([
    className,
    styles.heading,
    styles[level],
    size && styles[size],
  ]);

  return (
    <HeadingTag {...props} className={classes}>
      {children}
    </HeadingTag>
  );
}
