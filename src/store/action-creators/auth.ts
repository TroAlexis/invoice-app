import authApi from "@/api/modules/auth";
import {
  AuthAction,
  AuthActionType,
  SetSessionAction,
} from "@/store/types/auth";
import { Session } from "@supabase/supabase-js";
import { Dispatch } from "redux";

export const logIn = () => {
  return async (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: AuthActionType.LOADING });

    const { error } = await authApi.logIn();

    if (error) {
      dispatch({
        type: AuthActionType.LOGIN_ERROR,
        error,
      });
    }
  };
};

export const logOut = () => {
  return async (dispatch: Dispatch<AuthAction>) => {
    const { error } = await authApi.logOut();

    if (error) {
      dispatch({ type: AuthActionType.LOGOUT_ERROR, error });
    }
  };
};

export const setSession = (session: Session | null) => {
  return (dispatch: Dispatch<SetSessionAction>) => {
    dispatch({ type: AuthActionType.SET_SESSION, session });
  };
};
