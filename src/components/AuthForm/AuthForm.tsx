import AuthFormInfo, {
  Props as AuthInfoProps,
} from "components/AuthFormInfo/AuthFormInfo";
import Button from "components/ui/Button/Button";
import Heading from "components/ui/Heading/Heading";
import Input from "components/ui/Input/Input";
import { Size } from "constants/size";
import { State } from "constants/state";
import {
  ComponentPropsWithoutRef,
  FormEvent,
  SyntheticEvent,
  useState,
} from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";
import stateStyles from "styles/utils/states.module.scss";
import { BasicSlot, UseStateSetter } from "types/shared";
import { classNames } from "utils/classnames";
import { mergeCssModules } from "utils/css-modules";
import { renderSlot } from "utils/dom";
import { withEventPrevent } from "utils/events";
import baseClasses from "./AuthForm.module.scss";

interface FormData {
  email: string;
  password: string;
}

type InfoState = State.SUCCESS | State.ERROR;
type InfoProps = AuthInfoProps & { type: InfoState };

export interface Props
  extends Omit<ComponentPropsWithoutRef<"form">, "onSubmit"> {
  headingSlot?: BasicSlot;
  submitSlot?: BasicSlot;
  classes?: typeof baseClasses;
  loading?: boolean;
  info?: InfoProps;
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
  info,
  ...props
}: Props) {
  const styles = mergeCssModules(baseClasses, classes);

  const hasInfo = !!info;

  const formClasses = classNames([
    className,
    styles.form,
    hasInfo && styles.opaque,
  ]);

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

      {hasInfo && <Info {...info} />}
    </form>
  );
}

function Info({ type, ...props }: InfoProps) {
  const { heading, icon, description, ...rest } = props;

  const typeClassName = stateStyles[type];

  return (
    <InfoTransition>
      <AuthFormInfo
        className={baseClasses.info}
        heading={{ ...heading, className: typeClassName }}
        icon={{ ...icon, className: typeClassName }}
        description={description}
        {...rest}
      />
    </InfoTransition>
  );
}

function InfoTransition({
  children,
}: Pick<CSSTransitionProps, "in" | "children">) {
  return (
    <CSSTransition
      in
      appear
      timeout={600}
      classNames="fade-in-left"
      unmountOnExit
    >
      {children}
    </CSSTransition>
  );
}
