import { user } from "../../types";
import {
  AUTH_ERROR,
  CHANGE_AVATAR,
  EDIT_USER,
  GET_TOKEN,
  SIGN_IN_USER,
  SIGN_OUT_USER,
  TOGGLE_LOGGED_IN,
  TOGGLE_NAV,
  TOGGLE_SIGN_IN,
  TOGGLE_THEME,
} from "./action_const";

export type toggleThemeAction = {
  type: typeof TOGGLE_THEME;
};
export type authErrorAction = {
  type: typeof AUTH_ERROR;
  payload: string;
};

export type toggleNavAction = {
  type: typeof TOGGLE_NAV;
};

export type toggleIsLoggedInAction = {
  type: typeof TOGGLE_LOGGED_IN;
};
export type toggleSignInAction = {
  type: typeof TOGGLE_SIGN_IN;
};
export type getTokenAction = {
  type: typeof GET_TOKEN;
  payload: string;
};
export type signInAction = {
  type: typeof SIGN_IN_USER;
  payload: user;
};
export type signOutAction = {
  type: typeof SIGN_OUT_USER;
};
export type editUserAction = {
  type: typeof EDIT_USER;
  payload: user;
};
export type changeAvatarAction = {
  type: typeof CHANGE_AVATAR;
  payload: string;
};

export type actionType =
  | toggleNavAction
  | toggleThemeAction
  | toggleIsLoggedInAction
  | toggleSignInAction
  | getTokenAction
  | signInAction
  | signOutAction
  | authErrorAction
  | editUserAction
  | changeAvatarAction;
