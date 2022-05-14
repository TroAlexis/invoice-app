import { Size } from "constants/size";
import React from "react";
import { classNames } from "utils/classnames";
import styles from "./Icon.module.scss";

export interface Props extends React.ComponentPropsWithoutRef<"svg"> {
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
