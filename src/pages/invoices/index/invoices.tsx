import InvoicesBody from "components/pages/invoices/index/InvoicesBody/InvoicesBody";
import InvoicesHeader from "components/pages/invoices/index/InvoicesHeader/InvoicesHeader";
import styles from "./invoices.module.scss";

export default function Invoices() {
  return (
    <section className={styles.section}>
      <InvoicesHeader className={styles.header} />

      <InvoicesBody />
    </section>
  );
}
