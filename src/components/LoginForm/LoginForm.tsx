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
      const errorInfo = getInfo(State.ERROR, response);
      setInfo({
        ...errorInfo,
        action: {
          text: errorInfo.action?.text,
          handler: () => setInfo(undefined),
        },
      });
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
