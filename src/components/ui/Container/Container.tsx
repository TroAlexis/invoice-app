import React, { ComponentPropsWithoutRef } from "react";
import { classNames } from "utils/classnames";
import styles from "./Container.module.scss";

interface Props extends ComponentPropsWithoutRef<"div"> {
  column?: boolean;
}

export default function Container({ children, className, column }: Props) {
  const classes = classNames([
    styles.container,
    className,
    column && styles.column,
  ]);

  return <div className={classes}>{children}</div>;
}
