import InvoiceFormSection, {
  Props as SectionProps,
} from "components/pages/invoices/InvoiceFormSection/InvoiceFormSection";
import Input from "components/ui/Input/Input";
import Text from "components/ui/Text/Text";
import { ReactNode } from "react";
import { Address } from "types/invoices";
import { classNames } from "utils/classnames";
import styles from "./InvoiceFormAddressSection.module.scss";

type Props<V, N> = {
  heading?: string;
  className: string;
  children?: ReactNode;
} & Omit<SectionProps<V, N>, "children">;

export default function InvoiceFormAddressSection<
  V extends Address,
  N extends string
>({ className, heading, children, ...sectionProps }: Props<V, N>) {
  const classes = classNames([styles.section, className]);

  return (
    <section className={classes}>
      {heading && <Text className={styles.heading}>{heading}</Text>}

      {children}

      <InvoiceFormSection {...sectionProps}>
        {({ handleInput, values }) => (
          <>
            <Input
              label="Street Address"
              name="street"
              value={values.street}
              onInput={handleInput}
            />

            <div className={styles.row}>
              <Input
                label="City"
                value={values.city}
                onInput={handleInput}
                name="city"
              />{" "}
              <Input
                label="Post Code"
                value={values.postCode}
                name="postCode"
                onInput={handleInput}
              />{" "}
              <Input
                label="Country"
                value={values.country}
                name="country"
                onInput={handleInput}
              />
            </div>
          </>
        )}
      </InvoiceFormSection>
    </section>
  );
}
