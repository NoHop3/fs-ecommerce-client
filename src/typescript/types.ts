import React from "react";

export type valuesSignUp = {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  image: string;
};

export type user = {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
    image: string;
    // orders, favourites
};

export type evtKeyboardType = React.KeyboardEvent;
export type evtChangeType = React.ChangeEvent<HTMLInputElement>;
export type evtClickType = React.MouseEvent<Element, MouseEvent>;
export type evtButtonType = React.MouseEventHandler<HTMLButtonElement>;
