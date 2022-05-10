import styles from "./Button.module.scss";

import { classNames } from "utils/dom";
import { Color } from "constants/color";
import React, { ComponentPropsWithoutRef } from "react";
import { SlotProps } from "types/shared";

interface Props extends ComponentPropsWithoutRef<"button"> {
  color?: Color.VIOLET | Color.RED | Color.BLACK | Color.SECONDARY;
  fluid?: boolean;
  icon?: (props: SlotProps) => React.ReactNode;
}

export default function Button({
  color = Color.VIOLET,
  fluid,
  icon,
  children,
  ...attrs
}: Props) {
  const classes = classNames({
    [styles.button]: true,
    [styles["is-fluid"]]: fluid,
    [styles[`is-${color}`]]: !!color,
    [styles["has-icon"]]: !!icon,
  });

  return (
    <button className={classes} {...attrs}>
      {icon?.({ classes: styles.icon })}

      {children}
    </button>
  );
}
