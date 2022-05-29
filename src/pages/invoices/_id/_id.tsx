import { useTypedSelector } from "@/hooks/useTypedStore";
import { invoicesSelector } from "@/store/selectors/invoices";
import InvoicesIdBackButton from "components/pages/invoices/_id/InvoicesIdBackButton/InvoicesIdBackButton";
import InvoicesIdHeader from "components/pages/invoices/_id/InvoicesIdHeader/InvoicesIdHeader";
import InvoicesPageSection from "components/pages/invoices/InvoicesPageSection/InvoicesPageSection";
import Container from "components/ui/Container/Container";
import { useParams } from "react-router-dom";
import styles from "./_id.module.scss";

interface Props {}

export default function InvoicePage() {
  const { invoice } = useInvoice();
  return (
    <InvoicesPageSection>
      {invoice && (
        <Container>
          <InvoicesIdBackButton className={styles.back} />

          <InvoicesIdHeader status={invoice.status} />
        </Container>
      )}
    </InvoicesPageSection>
  );
}

type InvoiceParams = {
  id?: string;
};

function useInvoice() {
  const { items } = useTypedSelector(invoicesSelector);

  const { id: invoiceId } = useParams<InvoiceParams>();

  const invoice = items.find(({ id }) => {
    return invoiceId === id;
  });

  return { invoice };
}
