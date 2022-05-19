import { AuthProvider } from "@/api/auth";
import { Props as AuthFormProps } from "components/AuthForm/AuthForm";
import { State } from "constants/state";
import { useState } from "react";

type Response = Awaited<ReturnType<AuthProvider["signUp"]>>;
type Info = NonNullable<AuthFormProps["info"]>;

const infos: Record<State, Info | ((response?: Response) => Info)> = {
  [State.SUCCESS]: {
    description: "Please verify your email and you will be logged in.",
    type: State.SUCCESS,
    heading: { children: "Success!" },
    icon: { name: "check" },
  },
  [State.ERROR]: (response?: Response) => ({
    description: response?.error?.message || "Something went wrong...",
    type: State.ERROR,
    heading: { children: "Oops! An error occurred" },
    icon: { name: "close" },
  }),
};

const getInfo = (type: State, response?: Response): Info => {
  const info = infos[type];

  return typeof info === "function" ? info(response) : info;
};

export default function useAuthFormInfo(initialState?: Info) {
  const [info, setInfo] = useState(initialState);

  return { info, setInfo, getInfo };
}
