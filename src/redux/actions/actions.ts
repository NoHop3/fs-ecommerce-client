import axios from "axios";
import { Dispatch } from "redux";

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
} from "../../typescript/redux/actions/action_const";
import {
  AddProductAction,
  AddToCartAction,
  AddToFavsAction,
  AuthErrorAction,
  EditFromCartAction,
  EditProductAction,
  EditUserAction,
  EmptyCartAction,
  FetchOrdersAction,
  FetchProductsAction,
  GetTokenAction,
  RemoveFromCartAction,
  SetServerResMessageAction,
  SetServerResStatusAction,
  SignInAction,
  SignOutAction,
  SortProductsAction,
  ToggleIsLoggedInAction,
  ToggleNavAction,
  ToggleSignInAction,
  ToggleThemeAction,
} from "../../typescript/redux/actions/action_types";
import {
  OrderLine,
  Product,
  User,
  ValuesSignUp,
  Order,
  Sort,
} from "../../typescript/types";

/* themeReducer */
export function toggleTheme(): ToggleThemeAction {
  return {
    type: TOGGLE_THEME,
  };
}

/* navReducer */
export function toggleNav(): ToggleNavAction {
  return {
    type: TOGGLE_NAV,
  };
}

/* authReducer */
export function getToken(token: string): GetTokenAction {
  return {
    type: GET_TOKEN,
    payload: token,
  };
}
export function toggleSignIn(): ToggleSignInAction {
  return {
    type: TOGGLE_SIGN_IN,
  };
}
export function toggleIsLoggedIn(): ToggleIsLoggedInAction {
  return {
    type: TOGGLE_LOGGED_IN,
  };
}
export function signInUser(user: User): SignInAction {
  return {
    type: SIGN_IN_USER,
    payload: user,
  };
}
export function signOutUser(): SignOutAction {
  return {
    type: SIGN_OUT_USER,
  };
}
export function authError(error: string): AuthErrorAction {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}
export function addToFavs(favId: string): AddToFavsAction {
  return {
    type: ADD_TO_FAVS,
    payload: favId,
  };
}
export function editUser(editedUser: User): EditUserAction {
  return {
    type: EDIT_USER,
    payload: editedUser,
  };
}

/* productReducer */
export function fetchProducts(products: Product[]): FetchProductsAction {
  return {
    type: FETCH_PRODUCTS,
    payload: products,
  };
}
export function addToCart(orderLine: OrderLine): AddToCartAction {
  return {
    type: ADD_TO_CART,
    payload: orderLine,
  };
}
export function removeFromCart(productId: string): RemoveFromCartAction {
  return {
    type: REMOVE_FROM_CART,
    payload: productId,
  };
}
export function editFromCart(
  prodId: string,
  propsToUpdate: Partial<OrderLine>
): EditFromCartAction {
  return {
    type: EDIT_FROM_CART,
    payload: {
      prodId: prodId,
      propsToUpdate: propsToUpdate,
    },
  };
}
export function emptyCart(): EmptyCartAction {
  return {
    type: EMPTY_CART,
  };
}
export function sortProducts(sortArgs: Sort): SortProductsAction {
  return {
    type: SORT_PRODUCTS,
    payload: sortArgs,
  };
}
export function editProduct(updatedProduct: Product): EditProductAction {
  return {
    type: EDIT_PRODUCT,
    payload: updatedProduct,
  };
}
export function addProduct(productToAdd: Product): AddProductAction {
  return {
    type: ADD_PRODUCT,
    payload: productToAdd,
  };
}

/* orderReducer */
export function fetchOrders(orders: Order[]): FetchOrdersAction {
  return {
    type: FETCH_ORDERS,
    payload: orders,
  };
}

/* serverResReducer */
export function setServerResStatus(
  resStatus: number
): SetServerResStatusAction {
  return {
    type: SET_RESPONSE_STATUS,
    payload: resStatus,
  };
}
export function setServerResMesssage(
  resMessage: string
): SetServerResMessageAction {
  return {
    type: SET_RESPONSE_MESSAGE,
    payload: resMessage,
  };
}

/* Helper/Axios actions */
export function signUpAxios(values: ValuesSignUp) {
  console.log(values);
  return (dispatch: Dispatch) => {
    axios
      .post("http://localhost:5000/api/v1/users", {
        email: values.email,
        username: values.username,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
      })
      .then((res: any) => {
        console.log(res);
        if (res.status === 200) {
          dispatch(setServerResMesssage("Success! You can now login!"));
        }
        console.log(res.data);
      })
      .catch((err: any) => {
        dispatch(setServerResMesssage("Error! Existing credentials!"));
      });
  };
}

export function signInAxios(values: Partial<ValuesSignUp>) {
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
      });
  };
}
export function signInUserWithIdAxios(userId: string) {
  return (dispatch: Dispatch) => {
    axios
      .get(`http://localhost:5000/api/v1/users/${userId}`)
      .then((res: any) => {
        dispatch(signInUser(res.data));
      })
      .catch((err: any) => {
        console.log(err.response);
      });
  };
}

export function editUserAxios(values: Partial<User>, userId: string) {
  return (dispatch: Dispatch) => {
    axios
      .put(`http://localhost:5000/api/v1/users/${userId}`, values)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          dispatch(setServerResMesssage("Success! User edited!"));
          dispatch(editUser(res.data));
        }
      })
      .catch((err: any) => {
        dispatch(setServerResMesssage("Error! Could not edit user!"));
      });
  };
}

export function getProductsAxios() {
  return (dispatch: Dispatch) => {
    axios
      .get("http://localhost:5000/api/v1/products")
      .then((res) => {
        dispatch(fetchProducts(res.data));
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
}

export function getOrdersAxios(userId: string) {
  return (dispatch: Dispatch) => {
    axios
      .get(`http://localhost:5000/api/v1/orders/${userId}`)
      .then((res) => {
        dispatch(fetchOrders(res.data));
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
}

export function addOrderAxios(
  orderLines: Partial<OrderLine>[],
  userId: string,
  totalPrice: number
) {
  return (dispatch: Dispatch) => {
    const promises: any = [];
    orderLines.forEach((orderLine) => {
      promises.push(
        axios.post(
          `http://localhost:5000/api/v1/orderLines/${orderLine.productId?._id}`,
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
            _id: response.data._id,
          });
        });
        axios
          .post(`http://localhost:5000/api/v1/orders/${userId}`, {
            orderedlines,
            totalPrice,
          })
          .then((res: any) => {
            console.log(res.status);
            if (res.status === 201) {
              console.log("Success! Order created");
            }
          })
          .catch((err: any) => {
            console.log(err);
          });
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
}

export function deleteProductAxios(productId: string) {
  const token = JSON.parse(localStorage.getItem("token") as string);
  return (dispatch: Dispatch) => {
    axios
      .delete(`http://localhost:5000/api/v1/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res: any) => {
        if (res.status === 204) {
          console.log(`SUCCESS! Deleted product with id ${productId}`);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
}

export function editProductAxios(values: Partial<Product>, prodId: string) {
  const token = JSON.parse(localStorage.getItem("token") as string);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (dispatch: Dispatch) => {
    axios
      .put(`http://localhost:5000/api/v1/products/${prodId}`, values, config)
      .then((res: any) => {
        if (res.status === 200) {
          dispatch(setServerResMesssage("Success! Product edited!"));
          dispatch(editProduct(res.data));
        }
      })
      .catch((err: any) => {
        console.log(err);
        dispatch(setServerResMesssage("Error! Could not edit product"));
      });
  };
}

export function addProductAxios(values: Partial<Product>) {
  const token = JSON.parse(localStorage.getItem("token") as string);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (dispatch: Dispatch) => {
    axios
      .post("http://localhost:5000/api/v1/products", values, config)
      .then((res: any) => {
        if (res.status === 200) {
          dispatch(addProduct(res.data));
          dispatch(
            setServerResMesssage("Success! Product added successfully!")
          );
        }
      })
      .catch((err: any) => {
        console.log(err);
        dispatch(setServerResMesssage("Error! Could not add product!"));
      });
  };
}
