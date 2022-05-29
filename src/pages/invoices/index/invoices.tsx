import InvoicesBody from "components/pages/invoices/index/InvoicesBody/InvoicesBody";
import InvoicesHeader from "components/pages/invoices/index/InvoicesHeader/InvoicesHeader";
import InvoicesPageSection from "components/pages/invoices/InvoicesPageSection/InvoicesPageSection";
import styles from "./invoices.module.scss";

export default function Invoices() {
  return (
    <InvoicesPageSection>
      <InvoicesHeader className={styles.header} />

      <InvoicesBody />
    </InvoicesPageSection>
  );
}
