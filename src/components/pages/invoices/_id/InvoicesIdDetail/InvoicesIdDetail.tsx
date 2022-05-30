import InvoiceIdDetailBody from "components/pages/invoices/_id/InvoiceIdDetailBody/InvoiceIdDetailBody";
import InvoicesIdDetailHeader from "components/pages/invoices/_id/InvoicesIdDetailHeader/InvoicesIdDetailHeader";
import Card from "components/ui/Card/Card";
import { Invoice } from "types/invoices";
import { PropsOf } from "types/shared";
import styles from "./InvoicesIdDetail.module.scss";

type Props = {
  invoice: Invoice;
} & PropsOf<typeof Card>;

export default function InvoicesIdDetail({ invoice }: Props) {
  return (
    <Card className={styles.wrapper}>
      <InvoicesIdDetailHeader invoice={invoice} className={styles.header} />

      <InvoiceIdDetailBody {...invoice} />
    </Card>
  );
}
