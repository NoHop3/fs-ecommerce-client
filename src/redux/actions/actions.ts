import axios from "axios";
import { Dispatch } from "redux";
import {
  ADD_ORDER,
  ADD_TO_CART,
  ADD_TO_FAVS,
  AUTH_ERROR,
  EDIT_FROM_CART,
  EDIT_USER,
  EMPTY_CART,
  FETCH_ORDERS,
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
  addOrderAction,
  addToCartAction,
  addToFavsAction,
  authErrorAction,
  editFromCartAction,
  editUserAction,
  emptyCartAction,
  fetchOrdersAction,
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
import {
  OrderLine,
  Product,
  User,
  ValuesSignUp,
  Order,
} from "../../typescript/types";

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

export function signInUser(user: User): signInAction {
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

export function editUser(editedUser: User): editUserAction {
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
export function fetchProducts(products: Product[]): fetchProductsAction {
  return {
    type: FETCH_PRODUCTS,
    payload: products,
  };
}

export function fetchOrders(orders: Order[]): fetchOrdersAction {
  return {
    type: FETCH_ORDERS,
    payload: orders,
  };
}

export function addOrder(order: Order): addOrderAction {
  return {
    type: ADD_ORDER,
    payload: order,
  };
}

export function addToFavs(favId: string): addToFavsAction {
  return {
    type: ADD_TO_FAVS,
    payload: favId,
  };
}
export function editFromCart(
  prodId: string,
  propsToUpdate: Partial<OrderLine>
): editFromCartAction {
  return {
    type: EDIT_FROM_CART,
    payload: {
      prodId: prodId,
      propsToUpdate: propsToUpdate,
    },
  };
}

export function addToCart(orderLine: OrderLine): addToCartAction {
  return {
    type: ADD_TO_CART,
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

export function signUp(values: ValuesSignUp) {
  console.log(values);
  axios
    .post("http://localhost:5000/api/v1/users", {
      email: values.email,
      username: values.username,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
    })
    .then((res: any) => {
      console.log(res.data);
    })
    .catch((err: any) => {
      console.log(err.response.data.message);
    });
}

export function signIn(values: Partial<ValuesSignUp>) {
  return (dispatch: Dispatch) => {
    axios
      .post("http://localhost:5000/api/v1/users/login", {
        email: values.email,
        username: values.username,
        password: values.password,
      })
      .then((res: any) => {
        dispatch(signInUser(res.data.loginUser));
        localStorage.setItem("token", JSON.stringify(res.data.token));
      })
      .catch((err: any) => {
        console.log(err.response);
        dispatch(authError(err.response.data.message));
      });
  };
}

export function edit(values: Partial<User>, userId: string) {
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
        console.log(err)
      });
  };
}

export function getOrders(userId: string) {
  return (dispatch: Dispatch) => {
    axios
      .get(`http://localhost:5000/api/v1/orders/${userId}`)
      .then((res) => {
        dispatch(fetchOrders(res.data));
      })
      .catch((err: any) => {
        console.log(err)
      });
  };
}

export function addOrderAxios(
  orderedlines: OrderLine[],
  userId: string,
  totalPrice: number
) {
  return (dispatch: Dispatch) => {
    axios
      .post(`http://localhost:5000/api/v1/orders/${userId}`, {
        orderedlines,
        totalPrice,
      })
      .then((res: any) => {
        console.log(res.data);
      })
      .catch((err: any) => {
        console.log(err)
      });
  };
}

export function addOrderLines(
  orderLines: Partial<OrderLine>[],
  userId: string,
  totalPrice: number
) {
  return (dispatch: Dispatch) => {
    const promises: any = [];
    orderLines.forEach((orderLine) => {
      promises.push(
        axios.post(
          `http://localhost:5000/api/v1/orderLines/${userId}/${orderLine.productId?._id}`,
          {
            price: orderLine.price,
            quantity: orderLine.quantity,
          }
        )
      );
    });
    Promise.all(promises)
      .then((resArray: any) => {
        const orderedlines: Partial<OrderLine>[] = [];
        resArray.forEach((response: any) => {
          orderedlines.push({
            _id:response.data._id
          });
        });
        axios
          .post(`http://localhost:5000/api/v1/orders/${userId}`, {
            orderedlines,
            totalPrice,
          })
          .then((res: any) => {
            console.log(res.data);
          })
          .catch((err: any) => {
            dispatch(authError(err));
          });
      })
      .catch((err: any) => {
        dispatch(authError(err));
      });
  };
}