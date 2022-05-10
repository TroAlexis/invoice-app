import { User } from "@supabase/supabase-js";
import { Action } from "redux";

export interface AuthState {
  authenticated: boolean;
  loading: boolean;
  error: Error | null;
  user: User | null;
}

export enum AuthActionType {
  LOGIN = "LOGIN",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_ERROR = "LOGIN_ERROR",

  LOGOUT = "LOGOUT",
  LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
  LOGOUT_ERROR = "LOGOUT_ERROR",
}

export interface LoginAction extends Action {
  type: AuthActionType.LOGIN;
}

export interface LoginSuccessAction extends Action {
  type: AuthActionType.LOGIN_SUCCESS;
  user: User;
}

export interface LoginErrorAction extends Action {
  type: AuthActionType.LOGIN_ERROR;
  error: Error;
}

export type AuthAction = LoginAction | LoginSuccessAction | LoginErrorAction;
