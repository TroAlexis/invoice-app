import InvoicesBody from "components/pages/invoices/InvoicesBody/InvoicesBody";
import InvoicesHeader from "components/pages/invoices/InvoicesHeader/InvoicesHeader";
import styles from "./invoices.module.scss";

export default function Invoices() {
  return (
    <section className={styles.section}>
      <InvoicesHeader />

      <InvoicesBody />
    </section>
  );
}
