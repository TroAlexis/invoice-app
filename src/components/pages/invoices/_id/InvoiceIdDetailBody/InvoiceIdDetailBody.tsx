import InvoiceAddress from "components/pages/invoices/InvoiceAddress/InvoiceAddress";
import Text from "components/ui/Text/Text";
import { ComponentPropsWithoutRef } from "react";
import { Invoice } from "types/invoices";
import { classNames } from "utils/classnames";
import { prettifyDate } from "utils/date";
import styles from "./InvoiceIdDetailBody.module.scss";

type Props = Pick<
  Invoice,
  "createdAt" | "paymentDue" | "clientAddress" | "client"
>;

export default function InvoiceIdDetailBody(props: Props) {
  const {
    client: { email, name },
    clientAddress,
    createdAt,
    paymentDue,
  } = props;

  return (
    <section className={styles.wrapper}>
      <div className={styles.dates}>
        <InfoItem label={"Invoice Date"}>{prettifyDate(createdAt)}</InfoItem>{" "}
        <InfoItem label={"Payment Due"}>{prettifyDate(paymentDue)}</InfoItem>
      </div>

      <div className={styles.to}>
        <InfoItem label={"Bill To"}>{name}</InfoItem>{" "}
        <InvoiceAddress className={styles.address} {...clientAddress} />
      </div>

      <InfoItem label={"Sent to"} className={styles.email}>
        {email}
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
