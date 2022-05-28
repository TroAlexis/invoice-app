import { ComponentPropsWithoutRef, ComponentType } from "react";
import { classNames } from "utils/classnames";
import styles from "./Label.module.scss";

interface Props extends ComponentPropsWithoutRef<"span"> {
  tag?: "span" | ComponentType;
}

export default function Label({
  children,
  className,
  tag = "span",
  ...props
}: Props) {
  const classes = classNames([className, styles.label]);
  const Wrapper = tag;

  return (
    <Wrapper className={classes} {...props}>
      {children}
    </Wrapper>
  );
}
