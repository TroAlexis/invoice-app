import AuthForm, { Props } from "components/AuthForm/AuthForm";

export default function LoginForm(props: Partial<Props>) {
  const handleSubmit = () => {};

  return (
    <AuthForm
      onSubmit={handleSubmit}
      headingSlot="Login to your account"
      submitSlot="Login"
      {...props}
    />
  );
}
