import {
  TOGGLE_AUTH,
  TOGGLE_NAV,
  TOGGLE_THEME,
} from "./action_const";

export type toggleThemeAction = {
  type: typeof TOGGLE_THEME;
};

export type toggleNavAction = {
  type: typeof TOGGLE_NAV;
};

export type toggleAuthAction = {
  type: typeof TOGGLE_AUTH
}

export type actionType = toggleNavAction | toggleThemeAction | toggleAuthAction;
