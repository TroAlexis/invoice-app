import styles from "./Container.module.scss";
import React, { ComponentPropsWithoutRef } from "react";
import { classNames } from "utils/classnames";

interface Props extends ComponentPropsWithoutRef<"div"> {}

export default function Container({ children, className }: Props) {
  const classes = classNames([styles.container, className]);

  return <div className={classes}>{children}</div>;
}
