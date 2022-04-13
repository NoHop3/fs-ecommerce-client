import { Order, OrderLine, Product, User } from "../../types";

export type InitialNavState = {
  navClass: string;
};

export type InitialToggleState = {
  lamp: boolean;
};

export type InitialAuthState = {
  loggedUser: User;
  authToken: string;
  isLoggedIn: boolean;
  isInSignIn: boolean;
  authError: string;
};

export type InitialProductState = {
  products: Product[];
  filteredProducts: Product[];
  cart: OrderLine[];
  totalPrice: number;
};

export type InitialOrderState = {
  orders: Order[];
};
