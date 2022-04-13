import { Order, OrderLine, Product, Sort, User } from "../../types";
import {
  ADD_ORDER,
  ADD_TO_CART,
  ADD_TO_FAVS,
  AUTH_ERROR,
  EDIT_FROM_CART,
  EDIT_USER,
  EMPTY_CART,
  FETCH_ORDERS,
  FETCH_ORDER_LINES,
  FETCH_PRODUCTS,
  GET_TOKEN,
  REMOVE_FROM_CART,
  SIGN_IN_USER,
  SIGN_OUT_USER,
  SORT_PRODUCTS,
  TOGGLE_LOGGED_IN,
  TOGGLE_NAV,
  TOGGLE_SIGN_IN,
  TOGGLE_THEME,
} from "./action_const";

export type ToggleThemeAction = {
  type: typeof TOGGLE_THEME;
};
export type AuthErrorAction = {
  type: typeof AUTH_ERROR;
  payload: string;
};

export type ToggleNavAction = {
  type: typeof TOGGLE_NAV;
};

export type ToggleIsLoggedInAction = {
  type: typeof TOGGLE_LOGGED_IN;
};
export type ToggleSignInAction = {
  type: typeof TOGGLE_SIGN_IN;
};
export type GetTokenAction = {
  type: typeof GET_TOKEN;
  payload: string;
};
export type SignInAction = {
  type: typeof SIGN_IN_USER;
  payload: User;
};
export type SignOutAction = {
  type: typeof SIGN_OUT_USER;
};
export type EditUserAction = {
  type: typeof EDIT_USER;
  payload: User;
};
export type FetchProductsAction = {
  type: typeof FETCH_PRODUCTS;
  payload: Product[];
};
export type FetchOrderLinesAction = {
  type: typeof FETCH_ORDER_LINES;
  payload: OrderLine[];
};

export type AddToFavsAction = {
  type: typeof ADD_TO_FAVS;
  payload: string;
};
export type AddToCartAction = {
  type: typeof ADD_TO_CART;
  payload: OrderLine;
};
export type RemoveFromCartAction = {
  type: typeof REMOVE_FROM_CART;
  payload: string;
};
export type EmptyCartAction = {
  type: typeof EMPTY_CART;
};
export type EditFromCartAction = {
  type: typeof EDIT_FROM_CART;
  payload: {
    prodId: string;
    propsToUpdate: Partial<OrderLine>;
  };
};

export type FetchOrdersAction = {
  type: typeof FETCH_ORDERS;
  payload: Order[];
};

export type AddOrderAction = {
  type: typeof ADD_ORDER;
  payload: Order;
};

export type SortProductsAction = {
  type: typeof SORT_PRODUCTS;
  payload: Sort;
}

export type ActionType =
  | ToggleNavAction
  | ToggleThemeAction
  | ToggleIsLoggedInAction
  | ToggleSignInAction
  | GetTokenAction
  | SignInAction
  | SignOutAction
  | AuthErrorAction
  | EditUserAction
  | FetchProductsAction
  | FetchOrderLinesAction
  | AddToFavsAction
  | AddToCartAction
  | RemoveFromCartAction
  | EmptyCartAction
  | EditFromCartAction
  | FetchOrdersAction
  | AddOrderAction
  | SortProductsAction;
