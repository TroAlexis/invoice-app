import InvoiceAddress from "components/pages/invoices/InvoiceAddress/InvoiceAddress";
import Text from "components/ui/Text/Text";
import { ComponentPropsWithoutRef } from "react";
import { Invoice } from "types/invoices";
import { classNames } from "utils/classnames";
import { prettifyDate } from "utils/date";
import { getPaymentDue } from "utils/invoices";
import { TEXT_PLACEHOLDER } from "utils/string";
import styles from "./InvoiceIdDetailBody.module.scss";

type Props = Pick<
  Invoice,
  "createdAt" | "paymentTerms" | "clientAddress" | "client"
> &
  Omit<ComponentPropsWithoutRef<"section">, "id">;

export default function InvoiceIdDetailBody(props: Props) {
  const {
    client: { email, name },
    clientAddress,
    createdAt,
    paymentTerms,
    className,
  } = props;

  const paymentDue = getPaymentDue({ paymentTerms, createdAt });
  const classes = classNames([styles.wrapper, className]);

  return (
    <section className={classes}>
      <div className={styles.dates}>
        <InfoItem label={"Invoice Date"}>{prettifyDate(createdAt)}</InfoItem>{" "}
        <InfoItem label={"Payment Due"}>{prettifyDate(paymentDue)}</InfoItem>
      </div>

      <div className={styles.to}>
        <InfoItem label={"Bill To"}>{name || TEXT_PLACEHOLDER}</InfoItem>{" "}
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
    <p className={classes} {...props}>
      <Text tag="span" className={styles.label}>
        {label}
      </Text>

      <span>{children}</span>
    </p>
  );
}
