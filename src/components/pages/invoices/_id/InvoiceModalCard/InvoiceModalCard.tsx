import Card from "components/ui/Card/Card";
import { PropsOf } from "types/shared";
import { classNames } from "utils/classnames";
import styles from "./InvoiceModalCard.module.scss";

export default function InvoiceModalCard({
  className,
  ...props
}: PropsOf<typeof Card>) {
  const classes = classNames([className, styles.card]);

  return <Card className={classes} {...props} />;
}
