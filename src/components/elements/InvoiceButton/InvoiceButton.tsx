import Button from "components/ui/Button/Button";
import Heading from "components/ui/Heading/Heading";
import { Size } from "@/constants/size";
import React from "react";
import { SlotProps } from "@/types/shared";
import { classNames } from "assets/utils/dom";
import styles from "components/elements/InvoiceButton/InvoiceButton.module.scss";
import Icon from "components/ui/Icon/Icon";

export default function InvoiceButton() {
  const renderButtonIcon = ({ classes }: SlotProps) => {
    const className = classNames([classes, styles.icon]);

    return <Icon name="plus" size={Size.REGULAR} className={className} />;
  };

  return (
    <Button icon={renderButtonIcon} fluid>
      <Heading level="h3" element="p" size={Size.SMALL}>
        New Invoice
      </Heading>
    </Button>
  );
}
