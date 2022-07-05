import invoicesApi from "@/api/modules/invoices/invoices";
import useLoading from "@/hooks/useLoading";
import useModalNavigation from "@/hooks/useModalNavigation";
import Button from "components/ui/Button/Button";
import Card from "components/ui/Card/Card";
import Label from "components/ui/Label/Label";
import Text from "components/ui/Text/Text";
import { Color } from "constants/color";
import { Status } from "constants/invoices";
import { NavLink } from "react-router-dom";
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
}: Props & Omit<PropsOf<typeof Card>, keyof Props>) {
  const classes = classNames([styles.header, className]);
  const formattedStatus = capitalize(status.toLowerCase());
  const { state } = useModalNavigation();
  const { loading, withLoading } = useLoading();
  const handleDelete = withLoading(() => {
    return invoicesApi.delete(id);
  });

  const handleMarkAsPaid = withLoading(() => {
    return invoicesApi.patch(id, {
      status: Status.PAID,
    });
  });

  return (
    <Card className={classes} {...props}>
      <Text className={styles.text}>Status</Text>
      <Label status={status} tag={Text} className={styles.label}>
        {formattedStatus}
      </Label>

      <NavLink
        to={`/invoices/edit/${id}`}
        className={styles.control}
        state={state}
      >
        <Button color={Color.SECONDARY}>Edit</Button>
      </NavLink>
      <Button
        color={Color.RED}
        className={styles.control}
        loading={loading}
        onClick={handleDelete}
      >
        Delete
      </Button>
      <Button
        color={Color.VIOLET}
        className={styles.control}
        loading={loading}
        onClick={handleMarkAsPaid}
      >
        Mark as Paid
      </Button>
    </Card>
  );
}
