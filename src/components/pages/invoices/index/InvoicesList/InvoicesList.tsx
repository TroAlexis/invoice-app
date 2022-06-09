import InvoicesCard from "components/pages/invoices/index/InvoicesCard/InvoicesCard";
import { FC } from "react";
import { Flipped, Flipper } from "react-flip-toolkit";
import { NavLink } from "react-router-dom";
import { Invoice } from "types/invoices";
import { animateFadeInUp } from "utils/animations";
import styles from "./InvoicesList.module.scss";

interface Props {
  invoices: Invoice[];
}

const animations = {
  onAppear,
  onExit,
};

const InvoicesList: FC<Props> = ({ invoices }) => {
  return (
    <Flipper flipKey={invoices.length} element="ul">
      {invoices.map((invoice) => {
        return (
          <Flipped flipId={invoice.id} key={invoice.id} stagger {...animations}>
            <NavLink to={`/invoices/${invoice.id}`} className={styles.card}>
              <InvoicesCard invoice={invoice} />
            </NavLink>
          </Flipped>
        );
      })}
    </Flipper>
  );
};

export default InvoicesList;

function onAppear(element: HTMLElement) {
  return animateFadeInUp(element);
}

function onExit(element: HTMLElement, i: unknown, removeElement: () => void) {
  return animateFadeInUp(element, {
    reverse: true,
    onComplete: removeElement,
  });
}
