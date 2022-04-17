import React from "react";

export type ValuesSignUp = {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  image?: string;
};

export type User = {
  _id: string;
  __v: number;
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

export type Product = {
  _id: string;
  __v: number;
  name: string;
  image: string;
  price: number;
  category?: string;
  color?: string;
};

export type OrderLine = {
  _id?: string;
  __v?: number;
  productId?: Product;
  quantity: number;
  price: number;
};

export type Order = {
  _id?: string;
  __v?: number;
  userId: User;
  orderedlines: OrderLine[];
  totalPrice: number;
};

export type Sort = {
  keyword: string;
  alphabeticalA__Z: boolean;
  numerical1__9: boolean;
  favouritesDisplay: boolean;
  favourites: string[];
};

export type ServerResponse = {
  status: number;
  message: string;
};

export type EvtKeyboardType = React.KeyboardEvent;
export type EvtChangeType = React.ChangeEvent<HTMLInputElement>;
export type EvtClickType = React.MouseEvent<Element, MouseEvent>;
export type EvtButtonType = React.MouseEventHandler<HTMLButtonElement>;
