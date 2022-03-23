import { orderLine, product, user } from "../../types";

export type InitialNavState = {
  navClass: string;
};

export type InitialToggleState = {
  lamp: boolean;
};

export type InitialAuthState = {
  loggedUser: user;
  authToken: string;
  isLoggedIn: boolean;
  isInSignIn: boolean;
  authError: string;
};

export type InitialProductState = {
  products: product[];
  cart: orderLine[];
  totalPrice: number;
};
