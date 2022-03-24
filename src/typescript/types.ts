import React from "react";

export type valuesSignUp = {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  image?: string;
};

export type user = {
  _id: string;
  __v: number;
  orders: [];
  favourites: string[];
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  image?: any;
  isAdmin: boolean;
  hasWriteAccess: boolean;
};

export type product = {
  _id: string;
  __v: number;
  name: string;
  image: string;
  price: number;
  category?: string;
  color?: string;
};

export type orderLine = {
  _id?: string;
  __v?: number;
  productId?: product;
  quantity: number;
  price: number;
};

export type evtKeyboardType = React.KeyboardEvent;
export type evtChangeType = React.ChangeEvent<HTMLInputElement>;
export type evtClickType = React.MouseEvent<Element, MouseEvent>;
export type evtButtonType = React.MouseEventHandler<HTMLButtonElement>;
