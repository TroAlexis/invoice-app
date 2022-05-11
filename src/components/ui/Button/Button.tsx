import styles from "./Button.module.scss";

import { Color } from "constants/color";
import React, { ComponentPropsWithoutRef } from "react";
import { SlotProps } from "types/shared";
import { Size } from "constants/size";
import { classNames } from "utils/classnames";

interface Props extends ComponentPropsWithoutRef<"button"> {
  color?: Color.VIOLET | Color.RED | Color.BLACK | Color.SECONDARY;
  fluid?: boolean;
  size?: Size.REGULAR | Size.MEDIUM;
  icon?: (props: SlotProps) => React.ReactNode;
}

export default function Button({
  color = Color.VIOLET,
  fluid,
  icon,
  size = Size.REGULAR,
  children,
  className,
  ...attrs
}: Props) {
  const classes = classNames([
    className,
    styles.button,
    styles[`size-${size}`],
    {
      [styles["is-fluid"]]: fluid,
      [styles[`is-${color}`]]: !!color,
      [styles["has-icon"]]: !!icon,
    },
  ]);

  return (
    <button className={classes} {...attrs}>
      {icon?.({ classes: styles.icon })}

      {children}
    </button>
  );
}
