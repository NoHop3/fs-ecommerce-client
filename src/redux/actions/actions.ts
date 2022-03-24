import axios from "axios";
import { Dispatch } from "redux";
import {
  ADD_TO_CART,
  ADD_TO_FAVS,
  AUTH_ERROR,
  EDIT_ORDER_LINE,
  EDIT_USER,
  EMPTY_CART,
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
} from "../../typescript/redux/actions/action_const";
import {
  addToCartAction,
  addToFavsAction,
  authErrorAction,
  editOrderLineAction,
  editUserAction,
  emptyCartAction,
  fetchOrderLinesAction,
  fetchProductsAction,
  getTokenAction,
  removeFromCartAction,
  signInAction,
  signOutAction,
  toggleIsLoggedInAction,
  toggleNavAction,
  toggleSignInAction,
  toggleThemeAction,
} from "../../typescript/redux/actions/action_types";
import { orderLine, product, user, valuesSignUp } from "../../typescript/types";

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
export function signOutUser(): signOutAction {
  return {
    type: SIGN_OUT_USER,
  };
}

export function editUser(editedUser: user): editUserAction {
  return {
    type: EDIT_USER,
    payload: editedUser,
  };
}

export function authError(error: string): authErrorAction {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}
export function fetchProducts(products: product[]): fetchProductsAction {
  return {
    type: FETCH_PRODUCTS,
    payload: products,
  };
}
export function fetchOrderLines(orderLines: orderLine[]): fetchOrderLinesAction {
  return {
    type: FETCH_ORDER_LINES,
    payload: orderLines,
  };
}

export function addToFavs(favId: string): addToFavsAction {
  return {
    type: ADD_TO_FAVS,
    payload: favId,
  };
}
export function addToCart(orderLine: orderLine): addToCartAction {
  return {
    type: ADD_TO_CART,
    payload: orderLine,
  };
}
export function editOrderLine(orderLine: orderLine): editOrderLineAction {
  return {
    type: EDIT_ORDER_LINE,
    payload: orderLine,
  };
}
export function removeFromCart(productId: string): removeFromCartAction {
  return {
    type: REMOVE_FROM_CART,
    payload: productId,
  };
}
export function emptyCart(): emptyCartAction {
  return {
    type: EMPTY_CART,
  };
}

export function signUp(values: valuesSignUp) {
  console.log(values);
  axios
    .post("http://localhost:5000/api/v1/users", {
      email: values.email,
      username: values.username,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
    })
    .then((res: any) => {})
    .catch((err: any) => {
      console.log("Error -> " + err.response.data.message);
    });
}

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
        console.log(err.response);
        dispatch(authError(err.response.data.message));
      });
  };
}

export function edit(values: Partial<user>, userId: string) {
  console.log(values);
  return (dispatch: Dispatch) => {
    axios
      .put(`http://localhost:5000/api/v1/users/${userId}`, values)
      .then((res) => {
        dispatch(editUser(res.data));
      })
      .catch((err: any) => {
        dispatch(authError(err.response.data.message));
      });
  };
}

export function getProducts() {
  return (dispatch: Dispatch) => {
    axios
      .get("http://localhost:5000/api/v1/products")
      .then((res) => {
        dispatch(fetchProducts(res.data));
      })
      .catch((err: any) => {
        console.log(err.response.data.message);
      });
  };
}

export function getOrderLines(userId: string) {
  return (dispatch: Dispatch) => {
    axios
      .get(`http://localhost:5000/api/v1/orderLines/${userId}`)
      .then((res) => {
        dispatch(fetchOrderLines(res.data));
      })
      .catch((err: any) => {
        console.log(err.response.data.message);
      });
  };
}

export function addOrderLine(
  orderLine: Partial<orderLine>,
  userId: string,
  productId: string
) {
  return (dispatch: Dispatch) => {
    axios
      .post(
        `http://localhost:5000/api/v1/orderLines/${userId}/${productId}`,
        orderLine
      )
      .then((res: any) => {
        dispatch(addToCart(res.data));
      })
      .catch((err: any) => {
        dispatch(authError(err));
      });
  };
}
export function removeOrderLine(userId: string, productId: string) {
  return (dispatch: Dispatch) => {
    axios
      .delete(`http://localhost:5000/api/v1/orderLines/${userId}/${productId}`)
      .then((res: any) => {
        dispatch(removeFromCart(productId));
      })
      .catch((err: any) => {
        console.log(err.response.data);
        dispatch(authError(err.response.data));
      });
  };
}
export function removeOrderLineWithId(Id: string) {
  return (dispatch: Dispatch) => {
    axios
      .delete(`http://localhost:5000/api/v1/orderLines/${Id}`)
      .then((res: any) => {
        dispatch(removeFromCart(Id));
      })
      .catch((err: any) => {
        console.log(err.response.data);
        dispatch(authError(err.response.data));
      });
  };
}

export function updateOrderLineWithId(
  Id: string,
  propsToUpdate: Partial<orderLine>
) {
  return (dispatch: Dispatch) => {
    axios
      .put(`http://localhost:5000/api/v1/orderLines/${Id}`, propsToUpdate)
      .then((res: any) => {
        console.log(res.data)
        dispatch(editOrderLine(res.data));
      })
      .catch((err: any) => {
        console.log(err.response.data);
        dispatch(authError(err.response.data));
      });
  };
}
export function removeAllFromCart(userId: string) {
  return (dispatch: Dispatch) => {
    axios
      .delete(`http://localhost:5000/api/v1/orderLines/all/${userId}`)
      .then((res: any) => {
        dispatch(emptyCart());
      })
      .catch((err: any) => {
        console.log(err.response.data);
        dispatch(authError(err.response.data));
      });
  };
}
