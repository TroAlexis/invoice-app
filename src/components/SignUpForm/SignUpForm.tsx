import authApi from "@/api/modules/auth/auth";
import useAuthFormInfo from "@/hooks/useAuthFormInfo";
import useLoading from "@/hooks/useLoading";
import { ApiError, Session, User } from "@supabase/supabase-js";
import AuthForm, { Props } from "components/AuthForm/AuthForm";
import { State } from "constants/state";
import { classNames } from "utils/classnames";

type OnSubmit = Props["onSubmit"];
type SignUpResponse = {
  user: User | null;
  session: Session | null;
  error: ApiError | null;
};
type SignUpResponseHandler = (response: SignUpResponse) => void;

const handleSignUp = async (
  { email, password }: Record<"email" | "password", string>,
  onSuccess: SignUpResponseHandler,
  onError: SignUpResponseHandler
) => {
  try {
    const response = await authApi.signUp({
      email,
      password,
    });

    onSuccess(response);
    onError(response);
  } catch (e) {
    onError({
      user: null,
      session: null,
      error: {
        message: "Something went wrong...",
        status: 404,
      },
    });
    console.error(e);
  }
};

export default function SignUpForm({
  children,
  className,
  ...props
}: Partial<Props>) {
  const { loading, withLoading } = useLoading();

  const { getInfo, info, setInfo } = useAuthFormInfo();

  const handleSuccess: SignUpResponseHandler = (response) =>
    setInfo(getInfo(State.SUCCESS, response));

  const handleError: SignUpResponseHandler = (response) => {
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

  const onSubmit = withLoading<OnSubmit>((data) =>
    handleSignUp(data, handleSuccess, handleError)
  );

  const formClassName = classNames([className]);

  return (
    <AuthForm
      loading={loading}
      onSubmit={onSubmit}
      headingSlot="Sign up"
      submitSlot="Submit"
      className={formClassName}
      info={info}
      {...props}
    >
      {children}
    </AuthForm>
  );
}
