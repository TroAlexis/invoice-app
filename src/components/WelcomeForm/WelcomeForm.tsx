import { Props } from "components/AuthForm/AuthForm";
import LoginForm from "components/LoginForm/LoginForm";
import SignUpForm from "components/SignUpForm/SignUpForm";
import { Path } from "constants/route";
import { ComponentPropsWithoutRef } from "react";
import { Link } from "react-router-dom";
import { BasicSlot } from "types/shared";
import { renderSlot } from "utils/dom";
import styles from "./WelcomeForm.module.scss";

const formComponents = {
  [Path.LOGIN]: LoginForm,
  [Path.SIGNUP]: SignUpForm,
};

const formConfigs: Record<Path, FormSwitchBaseProps> = {
  [Path.LOGIN]: {
    actionSlot: "Sign up",
    form: Path.SIGNUP,
  },
  [Path.SIGNUP]: {
    children: "Already have an account?",
    actionSlot: "Log in here.",
    form: Path.LOGIN,
  },
};

interface WelcomeFormProps extends Partial<Props> {
  form: Path;
}

export default function WelcomeForm({ form, ...props }: WelcomeFormProps) {
  const FormComponent = formComponents[form];

  return (
    <FormComponent {...props}>
      <FormSwitch form={form} />
    </FormComponent>
  );
}

function FormSwitch({ form: currentForm }: Pick<WelcomeFormProps, "form">) {
  const { form, actionSlot, children } = formConfigs[currentForm];

  return (
    <FormSwitchBase actionSlot={actionSlot} form={form}>
      {children}
    </FormSwitchBase>
  );
}

interface FormSwitchBaseProps extends ComponentPropsWithoutRef<"span"> {
  actionSlot: BasicSlot;
  form: WelcomeFormProps["form"];
}

function FormSwitchBase({
  children,
  actionSlot,
  form,
  ...props
}: FormSwitchBaseProps) {
  return (
    <span className={styles.switch} {...props}>
      {children}{" "}
      <Link className={styles.action} to={`/${form}`}>
        {renderSlot(actionSlot)}
      </Link>
    </span>
  );
}
