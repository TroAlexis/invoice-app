import styles from "./Container.module.scss";
import { classNames } from "assets/js/utils/dom";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function Container({ children }: Props) {
  const classes = classNames(styles.container);

  return <div className={classes}>{children}</div>;
}
