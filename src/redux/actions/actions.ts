import axios from "axios";
import { Dispatch } from "redux";
import {
  AUTH_ERROR,
  GET_TOKEN,
  SIGN_IN_USER,
  TOGGLE_LOGGED_IN,
  TOGGLE_NAV,
  TOGGLE_SIGN_IN,
  TOGGLE_THEME,
} from "../../typescript/redux/actions/action_const";
import {
  authErrorAction,
  getTokenAction,
  signInAction,
  toggleIsLoggedInAction,
  toggleNavAction,
  toggleSignInAction,
  toggleThemeAction,
} from "../../typescript/redux/actions/action_types";
import { user, valuesSignUp } from "../../typescript/types";

export function toggleTheme(): toggleThemeAction {
  return {
    type: TOGGLE_THEME,
  };
}

export function toggleNav(): toggleNavAction {
  return {
    type: TOGGLE_NAV,
  };
}

export function toggleIsLoggedIn(): toggleIsLoggedInAction {
  return {
    type: TOGGLE_LOGGED_IN,
  };
}

export function toggleSignIn(): toggleSignInAction {
  return {
    type: TOGGLE_SIGN_IN,
  };
}
export function getToken(token: string): getTokenAction {
  return {
    type: GET_TOKEN,
    payload: token,
  };
}

export function signInUser(user: user): signInAction {
  return {
    type: SIGN_IN_USER,
    payload: user,
  };
}

export function authError(error: string): authErrorAction {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export const signUpAction = async (values: valuesSignUp) => {
  await axios
    .post("http://localhost:5000/api/v1/users", {
      email: values.email,
      username: values.username,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      image: values.image,
    })
    .then((res: any) => {
      console.log(res.data);
    })
    .catch((err: any) => {
      console.log("Error -> " + err.response.data.message);
    });
};

export function signIn(values: Partial<valuesSignUp>) {
  return (dispatch: Dispatch) => {
    axios
      .post("http://localhost:5000/api/v1/users/login", {
        email: values.email,
        username: values.username,
        password: values.password,
      })
      .then((res: any) => {
        dispatch(signInUser(res.data.loginUser));
      })
      .catch((err: any) => {
        dispatch(authError(err.response.data.message));
      });
  };
}
