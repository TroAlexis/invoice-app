import useEffectOnce from "@/hooks/useEffectOnce";
import useLoading from "@/hooks/useLoading";
import { useTypedDispatch, useTypedSelector } from "@/hooks/useTypedStore";
import { fetchInvoices } from "@/store/action-creators/invoices";
import { invoicesSelector } from "@/store/selectors/invoices";
import InvoicesIdBackButton from "components/pages/invoices/_id/InvoicesIdBackButton/InvoicesIdBackButton";
import InvoicesIdDetail from "components/pages/invoices/_id/InvoicesIdDetail/InvoicesIdDetail";
import InvoicesIdHeader from "components/pages/invoices/_id/InvoicesIdHeader/InvoicesIdHeader";
import InvoicesPageSection from "components/pages/invoices/InvoicesPageSection/InvoicesPageSection";
import Container from "components/ui/Container/Container";
import Loader from "components/ui/Loader/Loader";
import { Color } from "constants/color";
import { NavLink, useParams } from "react-router-dom";
import styles from "./_id.module.scss";

export default function InvoicePage() {
  const { invoice, loading } = useInvoice();
  return (
    <InvoicesPageSection>
      {loading && <Loader className={styles.loader} color={Color.VIOLET} />}
      {invoice && (
        <Container>
          <NavLink to="/invoices" className={styles["back-link"]}>
            <InvoicesIdBackButton className={styles.back} />
          </NavLink>

          <InvoicesIdHeader
            status={invoice.status}
            id={invoice.id}
            className={styles.header}
          />

          <InvoicesIdDetail invoice={invoice} />
        </Container>
      )}
    </InvoicesPageSection>
  );
}

type InvoiceParams = {
  id?: string;
};

export function useInvoice() {
  const { items } = useTypedSelector(invoicesSelector);
  const dispatch = useTypedDispatch();
  const { loading, withLoading } = useLoading();
  const fetchWithLoading = withLoading(fetchInvoices);

  useEffectOnce(() => {
    if (!items.length) {
      fetchWithLoading(dispatch);
    }
  });

  const { id: invoiceId } = useParams<InvoiceParams>();

  const invoice = items.find(({ id }) => {
    return Number(invoiceId) === id;
  });

  return { invoice, loading };
}
