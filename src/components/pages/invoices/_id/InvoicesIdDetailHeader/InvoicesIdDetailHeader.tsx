import InvoiceAddress from "components/pages/invoices/InvoiceAddress/InvoiceAddress";
import InvoiceId from "components/pages/invoices/InvoiceId/InvoiceId";
import Text from "components/ui/Text/Text";
import { ComponentPropsWithoutRef } from "react";
import { Invoice } from "types/invoices";
import { classNames } from "utils/classnames";
import styles from "./InvoicesIdDetailHeader.module.scss";

interface Props extends ComponentPropsWithoutRef<"header"> {
  invoice: Invoice;
}

export default function InvoicesIdDetailHeader({ invoice, className }: Props) {
  const { id, senderAddress } = invoice;
  const classes = classNames([styles.header, className]);

  return (
    <header className={classes}>
      <div>
        <InvoiceId className={styles.id}>{id}</InvoiceId>
        <Text>{invoice.description}</Text>
      </div>

      <InvoiceAddress className={styles.address} {...senderAddress} />
    </header>
  );
}
