import styles from "./Button.module.scss";

import { classNames } from "assets/js/utils/dom";
import { Color } from "assets/js/constants/color";
import React, { PropsWithChildren } from "react";
import { SlotProps } from "assets/js/types/shared";

interface Props {
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
}: PropsWithChildren<Props>) {
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
