import styles from "./Container.module.scss";
import { classNames } from "utils/dom";
import React, { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<"div"> {}

export default function Container({ children, className }: Props) {
  const classes = classNames([styles.container, className]);

  return <div className={classes}>{children}</div>;
}
