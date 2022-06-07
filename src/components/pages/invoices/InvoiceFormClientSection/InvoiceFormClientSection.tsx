import InvoiceFormSection, {
  Props as SectionProps,
} from "components/pages/invoices/InvoiceFormSection/InvoiceFormSection";
import Input from "components/ui/Input/Input";
import { Invoice } from "types/invoices";

type FormSectionProps = SectionProps<Invoice["client"], "client">;
type OmitKeys = "name" | "children";

type Props = {
  inputClassName: string;
} & Omit<FormSectionProps, OmitKeys>;

export default function InvoiceFormClientSection({
  inputClassName,
  ...props
}: Props) {
  return (
    <InvoiceFormSection {...props} name="client">
      {({ handleInput, values }) => (
        <>
          <Input
            label="Client's Name"
            name="name"
            value={values.name}
            className={inputClassName}
            onInput={handleInput}
          />
          <Input
            label="Client's Email"
            name="email"
            value={values.email}
            className={inputClassName}
            onInput={handleInput}
          />
        </>
      )}
    </InvoiceFormSection>
  );
}
