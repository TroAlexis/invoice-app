import { Constraints } from "constants/size";
import { classNames } from "utils/dom";
import { PropsWithChildren } from "react";

import styles from "./Text.module.scss";

interface Props {
  type?: Constraints;
}

export default function Text({
  type = Constraints.TIGHT,
  children,
}: PropsWithChildren<Props>) {
  const classes = classNames([styles.text, styles[type]]);

  return <p className={classes}>{children}</p>;
}
