import { Status } from "constants/invoices";
import { ComponentPropsWithoutRef, ComponentType } from "react";
import states from "styles/utils/states.module.scss";
import { classNames } from "utils/classnames";
import styles from "./Label.module.scss";

interface Props extends ComponentPropsWithoutRef<"span"> {
  tag?: "span" | ComponentType;
  status?: Status;
}

const statusClasses = {
  [Status.DRAFT]: states.neutral,
  [Status.PENDING]: states.pending,
  [Status.PAID]: states["success-light"],
};

export default function Label({
  children,
  className,
  tag = "span",
  status = Status.DRAFT,
  ...props
}: Props) {
  const classes = classNames([className, styles.label, statusClasses[status]]);
  const Wrapper = tag;

  return (
    <Wrapper className={classes} {...props}>
      {children}
    </Wrapper>
  );
}
