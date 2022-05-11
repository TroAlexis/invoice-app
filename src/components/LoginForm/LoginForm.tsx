import styles from "./LoginForm.module.scss";
import { ComponentPropsWithoutRef } from "react";
import Heading from "components/ui/Heading/Heading";
import Input from "components/ui/Input/Input";
import Button from "components/ui/Button/Button";
import { Size } from "constants/size";
import { classNames } from "utils/classnames";

interface Props extends ComponentPropsWithoutRef<"form"> {}

export default function LoginForm(props: Props) {
  const className = classNames([props.className, styles.form]);

  return (
    <form className={className}>
      <Heading level="h1" className={styles.heading}>
        Login to your account
      </Heading>

      <Input label="Email" name="email" wrapperClassName={styles.input} />

      <Input label="Password" name="password" wrapperClassName={styles.input} />

      <Button type="submit" size={Size.MEDIUM} className={styles.submit}>
        Login
      </Button>
    </form>
  );
}
