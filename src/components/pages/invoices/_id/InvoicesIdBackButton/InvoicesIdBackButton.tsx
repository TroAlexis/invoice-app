import Button from "components/ui/Button/Button";
import Icon from "components/ui/Icon/Icon";
import { Color } from "constants/color";
import { ComponentPropsWithoutRef } from "react";
import { classNames } from "utils/classnames";
import styles from "./InvoicesIdBackButton.module.scss";

type ButtonElement = ReturnType<typeof Button>;
type Props = ComponentPropsWithoutRef<ButtonElement["type"]>;

export default function InvoicesIdBackButton({ className, ...props }: Props) {
  const classes = classNames([className, styles.button]);
  return (
    <Button
      outline
      color={Color.BLACK}
      className={classes}
      icon={() => <Icon name="chevron" className={styles.icon} />}
      {...props}
    >
      Go back
    </Button>
  );
}
