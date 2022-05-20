import { Constraints } from "constants/size";
import { ComponentPropsWithoutRef } from "react";
import { classNames } from "utils/classnames";

import styles from "./Text.module.scss";

interface Props extends ComponentPropsWithoutRef<"p"> {
  type?: Constraints;
}

export default function Text({
  type = Constraints.TIGHT,
  children,
  className,
  ...attrs
}: Props) {
  const classes = classNames([styles.text, styles[type], className]);

  return (
    <p className={classes} {...attrs}>
      {children}
    </p>
  );
}
