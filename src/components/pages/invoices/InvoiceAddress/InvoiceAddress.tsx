import Text from "components/ui/Text/Text";
import { Constraints } from "constants/size";
import { ComponentPropsWithoutRef } from "react";
import { Address } from "types/invoices";
import { classNames } from "utils/classnames";
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

  return (
    <address className={classes}>
      {[street, city, postCode, country].map((text) => {
        return (
          <Text key={text} type={Constraints.LOOSE}>
            {text}
          </Text>
        );
      })}
    </address>
  );
}
