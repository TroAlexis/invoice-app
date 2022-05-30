import Text from "components/ui/Text/Text";
import { Constraints } from "constants/size";
import { ComponentPropsWithoutRef } from "react";
import { Address } from "types/invoices";
import { classNames } from "utils/classnames";
import { TEXT_PLACEHOLDER } from "utils/string";
import styles from "./InvoiceAddress.module.scss";

type AddressSectionProps = {
  [K in keyof Address]: Address[K];
};
type AddressProps = ComponentPropsWithoutRef<"address"> & AddressSectionProps;

export default function InvoiceAddress({
  street,
  city,
  postCode,
  country,
  className,
}: AddressProps) {
  const classes = classNames([styles.address, className]);
  const fields = [street, city, postCode, country];

  const allFieldsAbsent = fields.every((field) => !field);

  return (
    <address className={classes}>
      {!allFieldsAbsent ? (
        fields.map((text, index) => {
          const key = text + index;
          return (
            <Text key={key} type={Constraints.LOOSE}>
              {text || TEXT_PLACEHOLDER}
            </Text>
          );
        })
      ) : (
        <Text type={Constraints.LOOSE}>{TEXT_PLACEHOLDER}</Text>
      )}
    </address>
  );
}
