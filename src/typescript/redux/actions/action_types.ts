import { Order, OrderLine, Product, Sort, User } from "../../types";
import {
  ADD_PRODUCT,
  ADD_TO_CART,
  ADD_TO_FAVS,
  AUTH_ERROR,
  EDIT_FROM_CART,
  EDIT_PRODUCT,
  EDIT_USER,
  EMPTY_CART,
  FETCH_ORDERS,
  FETCH_PRODUCTS,
  GET_TOKEN,
  REMOVE_FROM_CART,
  SET_RESPONSE_MESSAGE,
  SET_RESPONSE_STATUS,
  SIGN_IN_USER,
  SIGN_OUT_USER,
  SORT_PRODUCTS,
  TOGGLE_LOGGED_IN,
  TOGGLE_NAV,
  TOGGLE_SIGN_IN,
  TOGGLE_THEME,
} from "./action_const";

/* themeReducer */
export type ToggleThemeAction = {
  type: typeof TOGGLE_THEME;
};

/* navReducer */
export type ToggleNavAction = {
  type: typeof TOGGLE_NAV;
};

/* authReducer */
export type GetTokenAction = {
  type: typeof GET_TOKEN;
  payload: string;
};
export type ToggleSignInAction = {
  type: typeof TOGGLE_SIGN_IN;
};
export type ToggleIsLoggedInAction = {
  type: typeof TOGGLE_LOGGED_IN;
};
export type SignInAction = {
  type: typeof SIGN_IN_USER;
  payload: User;
};
export type SignOutAction = {
  type: typeof SIGN_OUT_USER;
};
export type AuthErrorAction = {
  type: typeof AUTH_ERROR;
  payload: string;
};
export type AddToFavsAction = {
  type: typeof ADD_TO_FAVS;
  payload: string;
};
export type EditUserAction = {
  type: typeof EDIT_USER;
  payload: User;
};

/* productReducer */
export type FetchProductsAction = {
  type: typeof FETCH_PRODUCTS;
  payload: Product[];
};
export type AddToCartAction = {
  type: typeof ADD_TO_CART;
  payload: OrderLine;
};
export type RemoveFromCartAction = {
  type: typeof REMOVE_FROM_CART;
  payload: string;
};
export type EditFromCartAction = {
  type: typeof EDIT_FROM_CART;
  payload: {
    prodId: string;
    propsToUpdate: Partial<OrderLine>;
  };
};
export type EmptyCartAction = {
  type: typeof EMPTY_CART;
};
export type SortProductsAction = {
  type: typeof SORT_PRODUCTS;
  payload: Sort;
};
export type EditProductAction = {
  type: typeof EDIT_PRODUCT;
  payload: Product;
};
export type AddProductAction = {
  type: typeof ADD_PRODUCT;
  payload: Product;
};

/* orderReducer */
export type FetchOrdersAction = {
  type: typeof FETCH_ORDERS;
  payload: Order[];
};

/** serverResReducer */
export type SetServerResStatusAction = {
  type: typeof SET_RESPONSE_STATUS;
  payload: number;
};

export type SetServerResMessageAction = {
  type: typeof SET_RESPONSE_MESSAGE;
  payload: string;
};

export type ActionType =
  | ToggleNavAction
  | ToggleThemeAction
  | ToggleIsLoggedInAction
  | ToggleSignInAction
  | GetTokenAction
  | SignInAction
  | SignOutAction
  | EditUserAction
  | FetchProductsAction
  | AddToFavsAction
  | AddToCartAction
  | RemoveFromCartAction
  | EmptyCartAction
  | EditFromCartAction
  | FetchOrdersAction
  | SortProductsAction
  | EditProductAction
  | AddProductAction
  | AuthErrorAction
  | SetServerResStatusAction
  | SetServerResMessageAction;
