import InvoiceId from "components/pages/invoices/InvoiceId/InvoiceId";
import Card from "components/ui/Card/Card";
import Icon from "components/ui/Icon/Icon";
import Label from "components/ui/Label/Label";
import Text from "components/ui/Text/Text";
import { Size } from "constants/size";
import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { Invoice } from "types/invoices";
import { classNames } from "utils/classnames";
import { prettifyDate } from "utils/date";
import { getPaymentDue } from "utils/invoices";
import { capitalize, prettifyPrice } from "utils/string";
import styles from "./InvoicesCard.module.scss";

interface Props extends ComponentPropsWithoutRef<"article"> {
  invoice: Invoice;
}

export default function InvoicesCard({
  className,
  invoice,
  ...props
}: PropsWithChildren<Props>) {
  const { id, paymentTerms, client, items = [], status, createdAt } = invoice;
  const classes = getClasses(className);
  const dueDate = getPaymentDue({ paymentTerms, createdAt });
  const dueDateText = prettifyDate(dueDate);
  const totalPrice = items.reduce((total, { price }) => total + price, 0);
  const formattedPrice = prettifyPrice(totalPrice);
  const formattedStatus = capitalize(status.toLowerCase());

  return (
    <Card className={classes.root} {...props}>
      <InvoiceId className={classes.id}>{id}</InvoiceId>

      <Text className={classes.due}>{`Due ${dueDateText}`}</Text>

      <Text className={classes.name}>{client.name}</Text>

      <Text className={classes.price} size={Size.REGULAR}>
        £ {formattedPrice}
      </Text>

      <Label className={classes.label} tag={Text} status={status}>
        {formattedStatus}
      </Label>

      <Icon name="chevron" className={classes.chevron} />
    </Card>
  );
}

const getClasses = (className: Props["className"]) => {
  return {
    root: classNames([className, styles.wrapper]),
    id: classNames([styles.id]),
    due: classNames([styles.due, styles.secondary]),
    name: classNames([styles.name, styles.secondary]),
    price: classNames([styles.price]),
    label: classNames([styles.label]),
    chevron: classNames([styles.chevron]),
  };
};
