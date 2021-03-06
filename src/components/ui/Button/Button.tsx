import withTransition from "components/ui/hocs/withTransition/withTransition";
import Loader from "components/ui/Loader/Loader";

import { Color, Shade } from "constants/color";
import { Size, Weight } from "constants/size";
import React, { ComponentPropsWithoutRef } from "react";
import { SlotProps } from "types/shared";
import { classNames } from "utils/classnames";
import styles from "./Button.module.scss";

interface Props extends ComponentPropsWithoutRef<"button"> {
  color?: Color.VIOLET | Color.RED | Color.BLACK | Color.GREY | Color.SECONDARY;
  shade?: Shade.LIGHT;
  outline?: boolean;
  fluid?: boolean;
  size?: Size.REGULAR | Size.MEDIUM;
  weight?: Weight.HEAVY | Weight.REGULAR;
  loading?: boolean;
  linkish?: boolean;
  icon?: (props: SlotProps) => React.ReactNode;
}

export default function Button({
  color = Color.VIOLET,
  fluid,
  icon,
  size = Size.REGULAR,
  weight = Weight.HEAVY,
  outline,
  children,
  loading,
  linkish,
  shade,
  className,
  ...attrs
}: Props) {
  const classes = classNames([
    className,
    styles.button,
    styles[`size-${size}`],
    styles[`weight-${weight}`],
    styles[`is-${color}`],
    shade && styles[`shade-${shade}`],
    {
      [styles["is-fluid"]]: fluid,
      [styles["is-outline"]]: !!outline,
      [styles["has-icon"]]: !!icon,
      [styles["is-linkish"]]: !!linkish,
      [styles["loading"]]: loading,
    },
  ]);

  return (
    <button className={classes} type="button" {...attrs}>
      <ButtonLoader visible={!!loading} props={{ className: styles.loader }} />

      <div className={styles.wrapper}>
        {icon?.({ classes: styles.icon })}

        {children}
      </div>
    </button>
  );
}

const ButtonLoader = withTransition(
  (props: ComponentPropsWithoutRef<"span">) => {
    return (
      <span {...props}>
        <Loader />
      </span>
    );
  },
  { component: null },
  {
    timeout: 200,
    appear: true,
    unmountOnExit: true,
    classNames: "fade",
  }
);
