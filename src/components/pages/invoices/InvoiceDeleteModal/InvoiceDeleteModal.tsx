import useLoading from "@/hooks/useLoading";
import Button from "components/ui/Button/Button";
import Card from "components/ui/Card/Card";
import Heading from "components/ui/Heading/Heading";
import Text from "components/ui/Text/Text";
import { Color } from "constants/color";
import { Size } from "constants/size";
import { ComponentProps, FormEvent } from "react";
import ReactModal from "react-modal";
import { Invoice } from "types/invoices";
import { withEventPrevent } from "utils/events";
import styles from "./InvoiceDeleteModal.module.scss";

ReactModal.setAppElement("#root");

interface Props extends ComponentProps<typeof ReactModal> {
  onSubmit: (value: boolean) => void;
  invoiceId: Invoice["id"];
}

export default function InvoiceDeleteModal({
  isOpen,
  onSubmit,
  invoiceId,
}: Props) {
  const { loading, withLoading } = useLoading();
  const handleCancel = () => onSubmit(false);
  const withLoadingSubmit = withLoading(() => onSubmit(true));
  const handleSubmit = (e: FormEvent<HTMLFormElement>) =>
    withEventPrevent(e, withLoadingSubmit);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleCancel}
      className={styles.content}
      overlayClassName={styles.modal}
      closeTimeoutMS={200}
    >
      <form onSubmit={handleSubmit}>
        <Card className={styles.card}>
          <Heading level={"h2"} size={Size.MEDIUM} className={styles.heading}>
            Confirm Deletion
          </Heading>
          <Text className={styles.description}>
            Are you sure you want to delete invoice #{invoiceId}? This action
            cannot be undone.
          </Text>
          <div className={styles.footer}>
            <Button
              onClick={handleCancel}
              color={Color.SECONDARY}
              className={styles.button}
            >
              Cancel
            </Button>
            <Button
              loading={loading}
              type="submit"
              color={Color.RED}
              className={styles.button}
            >
              Delete
            </Button>
          </div>
        </Card>
      </form>
    </ReactModal>
  );
}
