import baseClasses from "./AuthForm.module.scss";
import {
  ComponentPropsWithoutRef,
  FormEvent,
  SyntheticEvent,
  useState,
} from "react";
import Heading from "components/ui/Heading/Heading";
import Input from "components/ui/Input/Input";
import Button from "components/ui/Button/Button";
import { Size } from "constants/size";
import { BasicSlot, UseStateSetter } from "types/shared";
import { classNames } from "utils/classnames";
import { renderSlot } from "utils/dom";
import { withEventPrevent } from "utils/events";
import { mergeCssModules } from "utils/css-modules";

interface FormData {
  email: string;
  password: string;
}

export interface Props
  extends Omit<ComponentPropsWithoutRef<"form">, "onSubmit"> {
  headingSlot?: BasicSlot;
  submitSlot?: BasicSlot;
  classes?: typeof baseClasses;
  loading?: boolean;
  onSubmit: (data: FormData) => void;
}

const handleInput = (
  name: keyof FormData,
  setter: UseStateSetter<FormData>
) => {
  return (e: SyntheticEvent<HTMLInputElement>) =>
    setter((prevData) => {
      const target = e.target as HTMLInputElement;
      return { ...prevData, [name]: target.value };
    });
};

export default function AuthForm({
  headingSlot,
  submitSlot,
  className,
  onSubmit,
  classes,
  loading,
  children,
  ...props
}: Props) {
  const styles = mergeCssModules(baseClasses, classes);
  const formClasses = classNames([className, styles.form]);

  const [data, setData] = useState<FormData>({
    email: "",
    password: "",
  });

  const inputHandlers = {
    email: handleInput("email", setData),
    password: handleInput("password", setData),
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    return withEventPrevent(e, () => {
      onSubmit(data);
    });
  };

  return (
    <form className={formClasses} onSubmit={submitHandler} {...props}>
      <Heading level="h1" className={styles.heading}>
        {renderSlot(headingSlot)}
      </Heading>

      <Input
        label="Email"
        name="email"
        value={data.email}
        onInput={inputHandlers.email}
        wrapperClassName={styles.input}
      />

      <Input
        label="Password"
        name="password"
        value={data.password}
        onInput={inputHandlers.password}
        wrapperClassName={styles.input}
      />

      <Button
        type="submit"
        size={Size.MEDIUM}
        className={styles.submit}
        loading={loading}
      >
        {renderSlot(submitSlot)}
      </Button>

      {children}
    </form>
  );
}
