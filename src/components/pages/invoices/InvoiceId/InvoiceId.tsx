import Text from "components/ui/Text/Text";
import { PropsOf } from "types/shared";
import { classNames } from "utils/classnames";
import styles from "./InvoiceId.module.scss";

type Props = PropsOf<typeof Text>;

export default function InvoiceId({ className, children, ...props }: Props) {
  const classes = classNames([className, styles.id, "fw-700"]);
  return (
    <Text className={classes} {...props}>
      {children}
    </Text>
  );
}
