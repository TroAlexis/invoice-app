import InvoiceAddress from "components/pages/invoices/InvoiceAddress/InvoiceAddress";
import Text from "components/ui/Text/Text";
import { ComponentPropsWithoutRef } from "react";
import { Invoice } from "types/invoices";
import { classNames } from "utils/classnames";
import { prettifyDate } from "utils/date";
import { TEXT_PLACEHOLDER } from "utils/string";
import styles from "./InvoiceIdDetailBody.module.scss";

type Props = Pick<
  Invoice,
  "createdAt" | "paymentDue" | "clientAddress" | "client"
> &
  ComponentPropsWithoutRef<"section">;

export default function InvoiceIdDetailBody(props: Props) {
  const {
    client: { email, name },
    clientAddress,
    createdAt,
    paymentDue,
    className,
  } = props;

  const classes = classNames([styles.wrapper, className]);

  return (
    <section className={classes}>
      <div className={styles.dates}>
        <InfoItem label={"Invoice Date"}>{prettifyDate(createdAt)}</InfoItem>{" "}
        <InfoItem label={"Payment Due"}>{prettifyDate(paymentDue)}</InfoItem>
      </div>

      <div className={styles.to}>
        <InfoItem label={"Bill To"}>{name}</InfoItem>{" "}
        <InvoiceAddress className={styles.address} {...clientAddress} />
      </div>

      <InfoItem label={"Sent to"} className={styles.email}>
        {email || TEXT_PLACEHOLDER}
      </InfoItem>
    </section>
  );
}

interface InfoItemProps extends ComponentPropsWithoutRef<"p"> {
  label: string;
}

function InfoItem({ label, children, className, ...props }: InfoItemProps) {
  const classes = classNames([styles.info, className]);
  return (
    <p className={classes}>
      <Text tag="span" className={styles.label}>
        {label}
      </Text>

      <span>{children}</span>
    </p>
  );
}
