import Datepicker from "components/ui/Datepicker/Datepicker";
import Select from "components/ui/Select/Select";
import { ComponentPropsWithoutRef } from "react";
import { ReactDatePickerProps } from "react-datepicker";
import { Props as SelectProps, SingleValue } from "react-select";
import { classNames } from "utils/classnames";
import { prettifyDate } from "utils/date";
import styles from "./InvoiceFormDates.module.scss";

type PaymentTermOption = {
  value: number;
};

interface Props extends ComponentPropsWithoutRef<"section"> {
  createdAt: Date;
  paymentTerms: number;
  paymentTermsOptions: PaymentTermOption[];
  handleChange: (
    name: "createdAt" | "paymentTerms",
    value: Props[typeof name]
  ) => void;
}

export default function InvoiceFormDates({
  className,
  createdAt,
  paymentTerms,
  paymentTermsOptions,
  handleChange,
  ...props
}: Props) {
  const classes = classNames([styles.dates, className]);

  const handleDateChange: ReactDatePickerProps["onChange"] = (date: Date) =>
    handleChange("createdAt", date);
  const handlePaymentTermsChange: SelectProps<
    PaymentTermOption,
    false
  >["onChange"] = (value: SingleValue<PaymentTermOption>) =>
    handleChange("paymentTerms", value?.value ?? 1);

  return (
    <section className={classes} {...props}>
      <Datepicker
        value={prettifyDate(createdAt)}
        label="Invoice Date"
        onChange={handleDateChange}
      />

      <Select
        options={paymentTermsOptions}
        isMulti={false}
        value={{ value: paymentTerms }}
        onChange={handlePaymentTermsChange}
        menuPlacement="top"
        label="Payment terms"
        isSearchable={false}
        getOptionLabel={({ value }) => `Net ${value} Days`}
      />
    </section>
  );
}
