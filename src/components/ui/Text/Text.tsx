import { Constraints, Size } from "constants/size";
import { ComponentPropsWithoutRef } from "react";
import { classNames } from "utils/classnames";

import styles from "./Text.module.scss";

interface Props extends ComponentPropsWithoutRef<"p"> {
  type?: Constraints;
  tag?: "span" | "p" | "div";
  size?: Size.REGULAR;
}

export default function Text({
  type = Constraints.TIGHT,
  tag = "p",
  size,
  children,
  className,
  ...attrs
}: Props) {
  const classes = classNames([
    styles.text,
    styles[type],
    size && styles[`size-${size}`],
    className,
  ]);
  const ContainerElement = tag;

  return (
    <ContainerElement className={classes} {...attrs}>
      {children}
    </ContainerElement>
  );
}
