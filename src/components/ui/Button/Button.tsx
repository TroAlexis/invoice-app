import Loader from "components/ui/Loader/Loader";

import { Color } from "constants/color";
import { Size } from "constants/size";
import React, { ComponentPropsWithoutRef } from "react";
import { SlotProps } from "types/shared";
import { classNames } from "utils/classnames";
import styles from "./Button.module.scss";

interface Props extends ComponentPropsWithoutRef<"button"> {
  color?: Color.VIOLET | Color.RED | Color.BLACK | Color.SECONDARY;
  outline?: boolean;
  fluid?: boolean;
  size?: Size.REGULAR | Size.MEDIUM;
  loading?: boolean;
  icon?: (props: SlotProps) => React.ReactNode;
}

export default function Button({
  color = Color.VIOLET,
  fluid,
  icon,
  size = Size.REGULAR,
  outline,
  children,
  loading,
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
      [styles["is-outline"]]: !!outline,
      [styles["has-icon"]]: !!icon,
    },
  ]);

  return (
    <button className={classes} type="button" {...attrs}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {icon?.({ classes: styles.icon })}

          {children}
        </>
      )}
    </button>
  );
}
