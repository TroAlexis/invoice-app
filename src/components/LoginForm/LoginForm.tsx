import AuthForm, { Props } from "components/AuthForm/AuthForm";
import useLoading from "@/hooks/useLoading";
import authApi from "@/api/auth";

export default function LoginForm(props: Partial<Props>) {
  const { loading, withLoading } = useLoading();

  const handleSubmit: Props["onSubmit"] = async (credentials) => {
    await authApi.logIn(credentials);
  };

  const onSubmit = withLoading(handleSubmit);

  return (
    <AuthForm
      loading={loading}
      onSubmit={onSubmit}
      headingSlot="Login to your account"
      submitSlot="Login"
      {...props}
    />
  );
}
