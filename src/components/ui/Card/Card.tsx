import { ComponentPropsWithoutRef } from "react";
import { classNames } from "utils/classnames";
import styles from "./Card.module.scss";

type CardTag = "article" | "div";

type Props = {
  tag?: CardTag;
};

export default function Card({
  tag = "article",
  className,
  children,
}: Props & ComponentPropsWithoutRef<CardTag>) {
  const WrapperTag = tag;

  const classes = classNames([className, styles.card]);

  return <WrapperTag className={classes}>{children}</WrapperTag>;
}
