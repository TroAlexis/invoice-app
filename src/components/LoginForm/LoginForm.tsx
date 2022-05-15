import authApi from "@/api/auth";
import useAuthFormInfo from "@/hooks/useAuthFormInfo";
import useLoading from "@/hooks/useLoading";
import AuthForm, { Props } from "components/AuthForm/AuthForm";
import { State } from "constants/state";

export default function LoginForm(props: Partial<Props>) {
  const { loading, withLoading } = useLoading();
  const { getInfo, info, setInfo } = useAuthFormInfo();

  const handleSubmit: Props["onSubmit"] = async (credentials) => {
    const response = await authApi.logIn(credentials);

    if (response.error) {
      setInfo(getInfo(State.ERROR, response));
    }
  };

  const onSubmit = withLoading(handleSubmit);

  return (
    <AuthForm
      loading={loading}
      onSubmit={onSubmit}
      headingSlot="Login to your account"
      submitSlot="Login"
      info={info}
      {...props}
    />
  );
}
