import { Color } from "constants/color";
import { ComponentPropsWithoutRef } from "react";
import { classNames } from "utils/classnames";
import styles from "./Loader.module.scss";

interface Props extends Omit<ComponentPropsWithoutRef<"span">, "color"> {
  color?: Color.VIOLET | Color.WHITE;
  speed?: Speed;
}

export enum Speed {
  REGULAR = "regular",
  SLOW = "slow",
}

export default function Loader({
  className,
  color = Color.WHITE,
  speed = Speed.REGULAR,
  ...props
}: Props) {
  const classes = classNames([
    styles.loader,
    styles[`color-${color}`],
    styles[`speed-${speed}`],
    className,
  ]);
  return <span className={classes} {...props} />;
}
