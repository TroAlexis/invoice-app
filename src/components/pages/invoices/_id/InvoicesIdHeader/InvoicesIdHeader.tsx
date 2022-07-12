import invoicesApi from "@/api/modules/invoices/invoices";
import useLoading from "@/hooks/useLoading";
import useModal from "@/hooks/useModal";
import useModalNavigation from "@/hooks/useModalNavigation";
import InvoiceDeleteModal from "components/pages/invoices/InvoiceDeleteModal/InvoiceDeleteModal";
import Button from "components/ui/Button/Button";
import Card from "components/ui/Card/Card";
import Label from "components/ui/Label/Label";
import Text from "components/ui/Text/Text";
import { Color } from "constants/color";
import { Status } from "constants/invoices";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Invoice } from "types/invoices";
import { AwaitedReturnType, Callback, PropsOf } from "types/shared";
import { classNames } from "utils/classnames";
import { capitalize } from "utils/string";
import styles from "./InvoicesIdHeader.module.scss";

type Props = Pick<Invoice, "status" | "id">;

const onDelete = (
  { error }: AwaitedReturnType<typeof invoicesApi.delete>,
  onSuccess?: Callback
) => {
  if (error) {
    toast.error("Error happened, try again");
  } else {
    toast.success("Item deleted", { delay: 100 });
    onSuccess?.();
  }
};

const onMarkAsPaid = ({
  error,
}: AwaitedReturnType<typeof invoicesApi.patch>) => {
  if (error) {
    toast.error("Couldn't mark as 'paid', try again");
  } else {
    toast.success("Marked as 'paid'!", { delay: 100 });
  }
};

export default function InvoicesIdHeader({
  className,
  status,
  id,
  ...props
}: Props & Omit<PropsOf<typeof Card>, keyof Props>) {
  const classes = classNames([styles.header, className]);
  const formattedStatus = capitalize(status.toLowerCase());
  const navigate = useNavigate();
  const { state } = useModalNavigation();
  const { loading, withLoading } = useLoading();
  const { getModalInput, handleSubmit, isOpen } = useModal<boolean>({
    isOpen: false,
  });

  const handleDelete = withLoading(async () => {
    const input = await getModalInput();

    if (input) {
      const response = await invoicesApi.delete(id);

      onDelete(response, () => navigate(-1));
    }
  });

  const handleMarkAsPaid = withLoading(async () => {
    const response = await invoicesApi.patch(id, {
      status: Status.PAID,
    });

    onMarkAsPaid(response);
  });

  return (
    <>
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

      <InvoiceDeleteModal
        isOpen={isOpen}
        onSubmit={handleSubmit}
        invoiceId={id}
      />
    </>
  );
}
