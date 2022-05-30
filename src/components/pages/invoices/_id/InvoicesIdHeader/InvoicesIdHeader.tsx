import Button from "components/ui/Button/Button";
import Card from "components/ui/Card/Card";
import Label from "components/ui/Label/Label";
import Text from "components/ui/Text/Text";
import { Color } from "constants/color";
import { Invoice } from "types/invoices";
import { PropsOf } from "types/shared";
import { classNames } from "utils/classnames";
import { capitalize } from "utils/string";
import styles from "./InvoicesIdHeader.module.scss";

type Props = Pick<Invoice, "status" | "id">;

export default function InvoicesIdHeader({
  className,
  status,
  id,
  ...props
}: Props & PropsOf<typeof Card>) {
  const classes = classNames([styles.header, className]);
  const formattedStatus = capitalize(status.toLowerCase());

  return (
    <Card className={classes} {...props}>
      <Text className={styles.text}>Status</Text>
      <Label status={status} tag={Text} className={styles.label}>
        {formattedStatus}
      </Label>

      <Button color={Color.SECONDARY} className={styles.control}>
        Edit
      </Button>
      <Button color={Color.RED} className={styles.control}>
        Delete
      </Button>
      <Button color={Color.VIOLET} className={styles.control}>
        Mark as Paid
      </Button>
    </Card>
  );
}
