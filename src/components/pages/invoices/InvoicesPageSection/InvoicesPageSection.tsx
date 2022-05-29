import { ComponentPropsWithoutRef } from "react";
import { classNames } from "utils/classnames";
import styles from "./InvoicesPageSection.module.scss";

type Props = ComponentPropsWithoutRef<"section">;

export default function InvoicesPageSection({ className, ...props }: Props) {
  const classes = classNames([className, styles.section]);
  return <section className={classes} {...props} />;
}
