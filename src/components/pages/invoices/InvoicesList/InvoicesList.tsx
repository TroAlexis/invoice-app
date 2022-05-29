import InvoicesCard from "components/pages/invoices/InvoicesCard/InvoicesCard";
import { FC } from "react";
import { Flipped, Flipper, spring } from "react-flip-toolkit";
import { NavLink } from "react-router-dom";
import { Invoice } from "types/invoices";
import styles from "./InvoicesList.module.scss";

interface Props {
  invoices: Invoice[];
}

interface Animation {
  onComplete?: () => void;
  reverse?: boolean;
}

type AnimationValues = [number, number];

const animationValues: Record<string, AnimationValues> = {
  opacity: [0, 1],
  translate: [100, 0],
};

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

function animateFadeInUp(
  element: HTMLElement,
  { reverse, onComplete }: Animation = {}
) {
  const { opacity, translate } = animationValues;

  return spring({
    values: {
      opacity: getValues(opacity, reverse),
      translate: getValues(translate, reverse),
    },
    onUpdate: (snapshot) => {
      if (typeof snapshot === "object") {
        element.style.opacity = `${snapshot.opacity}`;
        element.style.transform = `translate3d(0, ${snapshot.translate}%, 0)`;
      }
    },
    onComplete,
  });
}

function getValues(
  values: AnimationValues,
  reverse?: boolean
): AnimationValues {
  return reverse ? ([...values].reverse() as AnimationValues) : values;
}

function onAppear(element: HTMLElement) {
  return animateFadeInUp(element);
}

function onExit(element: HTMLElement, i: unknown, removeElement: () => void) {
  return animateFadeInUp(element, {
    reverse: true,
    onComplete: removeElement,
  });
}
