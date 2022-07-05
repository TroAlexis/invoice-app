import Text from "components/ui/Text/Text";
import { Constraints } from "constants/size";
import { ComponentPropsWithoutRef } from "react";
import { Address } from "types/invoices";
import { classNames } from "utils/classnames";
import { TEXT_PLACEHOLDER } from "utils/string";
import styles from "./InvoiceAddress.module.scss";

type AddressProps = ComponentPropsWithoutRef<"address"> & Partial<Address>;

export default function InvoiceAddress({
  street,
  city,
  postCode,
  country,
  className,
}: AddressProps) {
  const classes = classNames([styles.address, className]);
  const fields = [street, city, postCode, country];

  return (
    <address className={classes}>
      {fields.map((text, index) => {
        const content = text ?? TEXT_PLACEHOLDER;
        const key = content + index;
        return (
          <Text key={key} type={Constraints.LOOSE}>
            {content}
          </Text>
        );
      })}
    </address>
  );
}
