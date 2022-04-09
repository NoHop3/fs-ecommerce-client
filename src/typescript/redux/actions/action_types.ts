import { Order, OrderLine, Product, User } from "../../types";
import {
  ADD_ORDER,
  ADD_TO_CART,
  ADD_TO_FAVS,
  AUTH_ERROR,
  EDIT_ORDER_LINE,
  EDIT_USER,
  EMPTY_CART,
  FETCH_ORDERS,
  FETCH_ORDER_LINES,
  FETCH_PRODUCTS,
  GET_TOKEN,
  REMOVE_FROM_CART,
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
  payload: User;
};
export type signOutAction = {
  type: typeof SIGN_OUT_USER;
};
export type editUserAction = {
  type: typeof EDIT_USER;
  payload: User;
};
export type fetchProductsAction = {
  type: typeof FETCH_PRODUCTS;
  payload: Product[];
};
export type fetchOrderLinesAction = {
  type: typeof FETCH_ORDER_LINES;
  payload: OrderLine[];
};

export type addToFavsAction = {
  type: typeof ADD_TO_FAVS;
  payload: string;
};
export type addToCartAction = {
  type: typeof ADD_TO_CART;
  payload: OrderLine;
};
export type removeFromCartAction = {
  type: typeof REMOVE_FROM_CART;
  payload: string;
};
export type emptyCartAction = {
  type: typeof EMPTY_CART;
};
export type editOrderLineAction = {
  type: typeof EDIT_ORDER_LINE;
  payload: OrderLine;
};

export type fetchOrdersAction = {
  type: typeof FETCH_ORDERS;
  payload: Order[];
}

export type addOrderAction = {
  type: typeof ADD_ORDER;
  payload: Order;
}

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
  | fetchProductsAction
  | fetchOrderLinesAction
  | addToFavsAction
  | addToCartAction
  | removeFromCartAction
  | emptyCartAction
  | editOrderLineAction
  | fetchOrdersAction
  | addOrderAction;
