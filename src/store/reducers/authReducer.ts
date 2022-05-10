import { AuthAction, AuthActionType, AuthState } from "@/store/types/auth";
import { Reducer } from "redux";

export const defaultState: AuthState = {
  user: null,
  authenticated: false,
  loading: false,
  error: null,
};

const authReducer: Reducer<AuthState, AuthAction> = (
  state = defaultState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AuthActionType.LOGIN:
      return { user: null, loading: true, authenticated: false, error: null };
    case AuthActionType.LOGIN_SUCCESS:
      return {
        user: action.user,
        loading: false,
        authenticated: true,
        error: null,
      };
    case AuthActionType.LOGIN_ERROR:
      return {
        user: null,
        loading: false,
        authenticated: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default authReducer;
