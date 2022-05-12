import { AuthAction, AuthActionType, AuthState } from "@/store/types/auth";
import { Reducer } from "redux";

export const defaultState: AuthState = {
  session: null,
  loading: false,
  error: null,
};

const authReducer: Reducer<AuthState, AuthAction> = (
  state = defaultState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AuthActionType.LOADING:
      return { ...state, loading: true };
    case AuthActionType.SET_SESSION:
      return {
        session: action.session,
        loading: false,
        error: null,
      };
    case AuthActionType.LOGIN_ERROR:
      return {
        session: null,
        loading: false,
        error: action.error,
      };
    case AuthActionType.LOGOUT:
      return {
        ...defaultState,
      };
    case AuthActionType.LOGOUT_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default authReducer;
