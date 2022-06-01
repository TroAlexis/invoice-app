import { useInvoice } from "@/pages/invoices/_id/_id";
import InvoiceModalCard from "components/pages/invoices/_id/InvoiceModalCard/InvoiceModalCard";
import InvoiceForm from "components/pages/invoices/InvoiceForm/InvoiceForm";
import InvoiceId from "components/pages/invoices/InvoiceId/InvoiceId";
import styles from "./edit.module.scss";

export default function InvoiceEdit() {
  const { invoice } = useInvoice();

  return (
    <InvoiceModalCard>
      <InvoiceForm
        heading={() => (
          <>
            Edit{" "}
            <InvoiceId tag="span" className={styles.id}>
              {invoice?.id}
            </InvoiceId>
          </>
        )}
        invoice={invoice}
      />
    </InvoiceModalCard>
  );
}
