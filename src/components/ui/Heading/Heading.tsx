import { Size } from "assets/js/constants/size";
import styles from "./Heading.module.scss";
import React, { ElementType, PropsWithChildren } from "react";
import { classNames } from "assets/utils/dom";

const Headings = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
} as const;

interface Props {
  element?: ElementType;
  level: keyof typeof Headings;
  size?: Size.SMALL;
}

export default function Heading({
  level = Headings.h1,
  element = Headings.h1,
  size,
  children,
}: PropsWithChildren<Props>) {
  const HeadingTag = element;

  const classes = classNames([
    styles.heading,
    styles[level],
    size && styles[size],
  ]);

  return <HeadingTag className={classes}>{children}</HeadingTag>;
}
