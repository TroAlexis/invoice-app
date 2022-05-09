import Button from "components/ui/Button/Button";
import Heading from "components/ui/Heading/Heading";
import { Size } from "assets/js/constants/size";
import React from "react";
import { SlotProps } from "@/types/shared";
import { classNames } from "assets/js/utils/dom";
import styles from "components/elements/InvoiceButton/InvoiceButton.module.scss";
import Icon from "components/ui/Icon/Icon";

interface Props
  extends Omit<React.ComponentPropsWithoutRef<"button">, "color"> {}

export default function InvoiceButton(attrs: Props) {
  return (
    <Button icon={renderButtonIcon} {...attrs}>
      <Heading level="h3" element="p" size={Size.SMALL}>
        New Invoice
      </Heading>
    </Button>
  );
}

function renderButtonIcon({ classes }: SlotProps) {
  const className = classNames([classes, styles.icon]);

  return <Icon name="plus" size={Size.REGULAR} className={className} />;
}
