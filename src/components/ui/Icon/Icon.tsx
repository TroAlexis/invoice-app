import styles from "./Icon.module.scss";
import { Size } from "constants/size";
import { classNames } from "utils/dom";
import React from "react";

interface Props extends React.ComponentPropsWithoutRef<"svg"> {
  size?: Size.REGULAR | Size.SMALL | Size.MEDIUM;
  name: string;
}

export default function Icon({ size, name, className, ...attrs }: Props) {
  const classes = classNames([styles.icon, size && styles[size], className]);

  return (
    <svg className={classes} {...attrs}>
      <use xlinkHref={`#${name}--sprite`} />
    </svg>
  );
}
