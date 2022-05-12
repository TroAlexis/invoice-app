import AuthForm, { Props } from "components/AuthForm/AuthForm";
import authApi from "@/api/auth";
import useLoading from "@/hooks/useLoading";

export default function SignUpForm(props: Partial<Props>) {
  const { loading, withLoading } = useLoading();

  const handleSubmit: Props["onSubmit"] = async ({ email, password }) => {
    await authApi.signUp({
      email,
      password,
    });
  };

  const onSubmit = withLoading(handleSubmit);

  return (
    <AuthForm
      loading={loading}
      onSubmit={onSubmit}
      headingSlot="Signup"
      submitSlot="Submit"
      {...props}
    />
  );
}
