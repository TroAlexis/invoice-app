import InvoiceModalCard from "components/pages/invoices/_id/InvoiceModalCard/InvoiceModalCard";
import InvoiceForm from "components/pages/invoices/InvoiceForm/InvoiceForm";

interface Props {}

export default function InvoicesNew() {
  return (
    <InvoiceModalCard>
      <InvoiceForm heading="New Invoice" />
    </InvoiceModalCard>
  );
}
