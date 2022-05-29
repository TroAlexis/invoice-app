import styles from "components/pages/invoices/index/InvoicesBodyEmpty/InvoicesBodyEmpty.module.scss";
import Heading from "components/ui/Heading/Heading";
import Text from "components/ui/Text/Text";
import { ReactComponent as Placeholder } from "images/common/no-mail.svg";
import { ComponentPropsWithoutRef } from "react";
import { classNames } from "utils/classnames";

interface Props extends ComponentPropsWithoutRef<"div"> {}

export default function InvoicesBodyEmpty({ className, ...props }: Props) {
  const classes = classNames([styles.wrapper, className]);

  return (
    <div {...props} className={classes}>
      <Placeholder />

      <Heading level="h2" className={styles.heading}>
        There is nothing here
      </Heading>

      <Text className={styles.body}>
        Create an invoice by clicking the{" "}
        <span className="fw-700">New&nbsp;Invoice</span>&nbsp;button and get
        started
      </Text>
    </div>
  );
}
