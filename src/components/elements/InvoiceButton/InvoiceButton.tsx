import styles from "components/elements/InvoiceButton/InvoiceButton.module.scss";
import Button from "components/ui/Button/Button";
import Heading from "components/ui/Heading/Heading";
import Icon from "components/ui/Icon/Icon";
import { Size } from "constants/size";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { SlotProps } from "types/shared";
import { classNames } from "utils/classnames";

interface Props extends Omit<React.ComponentPropsWithoutRef<"a">, "color"> {}

export default function InvoiceButton({ className, ...props }: Props) {
  const location = useLocation();
  const classes = classNames([styles.link, className]);

  return (
    <NavLink
      to="/invoices/new"
      state={{ backgroundLocation: location }}
      className={classes}
      {...props}
    >
      <Button icon={renderButtonIcon}>
        <Heading level="h3" element="p" size={Size.SMALL}>
          New Invoice
        </Heading>
      </Button>
    </NavLink>
  );
}

function renderButtonIcon({ classes }: SlotProps) {
  const className = classNames([classes, styles.icon]);

  return <Icon name="plus" size={Size.REGULAR} className={className} />;
}
