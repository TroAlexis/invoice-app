import authApi from "@/api/auth";
import useAuthFormInfo from "@/hooks/useAuthFormInfo";
import { UserCredentials } from "@supabase/supabase-js";
import { State } from "constants/state";
import { useState } from "react";
import { AuthProvider } from "types/auth";
import { AwaitedReturnType, ValueOf } from "types/shared";

type Response = AwaitedReturnType<AuthProvider["signIn"]>;

export const loginTypes = {
  PASSWORD: "password",
  MAGIC_LINK: "magic link",
} as const;
export const getNextLoginType = (type: ValueOf<typeof loginTypes>) => {
  return type === loginTypes.PASSWORD
    ? loginTypes.MAGIC_LINK
    : loginTypes.PASSWORD;
};

export default function useLogin() {
  const { getInfo, info, setInfo } = useAuthFormInfo();
  const [loginType, setLoginType] = useState<ValueOf<typeof loginTypes>>(
    loginTypes.MAGIC_LINK
  );

  const isPasswordLoginType = loginType === loginTypes.PASSWORD;
  const nextLoginType = getNextLoginType(loginType);

  const handleLogin = async ({ email, password }: UserCredentials) => {
    const credentials = isPasswordLoginType ? { email, password } : { email };

    const response = await authApi.logIn(credentials);

    if (!response.error && !isPasswordLoginType) {
      const successInfo = getInfo(State.SUCCESS, response);
      setInfo({
        ...successInfo,
        description: "Follow the link we e-mailed and you will be logged in.",
      });
    }

    return response;
  };

  const handleSubmitError = (response: Response) => {
    const errorInfo = getInfo(State.ERROR, response);
    setInfo({
      ...errorInfo,
      action: {
        text: errorInfo.action?.text,
        handler: () => setInfo(undefined),
      },
    });
  };

  const handleSubmit = async (credentials: UserCredentials) => {
    const response = await handleLogin(credentials);

    if (response.error) {
      handleSubmitError(response);
    }
  };

  return {
    info,
    loginType,
    isPasswordLoginType,
    nextLoginType,
    setLoginType,
    handleSubmit,
  };
}
