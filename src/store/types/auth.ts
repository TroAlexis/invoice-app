import { ApiError, Session } from "@supabase/supabase-js";
import { Action } from "redux";

export interface AuthState {
  authenticated: boolean;
  loading: boolean;
  error: unknown;
  session: Session | null;
}

export enum AuthActionType {
  LOADING = "LOADING",
  SET_SESSION = "SET_SESSION",
  LOGIN_ERROR = "LOGIN_ERROR",

  LOGOUT = "LOGOUT",
  LOGOUT_ERROR = "LOGOUT_ERROR",
}

export interface LoadingAction extends Action {
  type: AuthActionType.LOADING;
}

export interface SetSessionAction extends Action {
  type: AuthActionType.SET_SESSION;
  session: Session | null;
}

export interface LoginErrorAction extends Action {
  type: AuthActionType.LOGIN_ERROR;
  error: ApiError;
}

export interface LogOutAction extends Action {
  type: AuthActionType.LOGOUT;
}

export interface LogOutErrorAction extends Action {
  type: AuthActionType.LOGOUT_ERROR;
  error: ApiError;
}

export type AuthAction =
  | LoadingAction
  | SetSessionAction
  | LoginErrorAction
  | LogOutAction
  | LogOutErrorAction;
