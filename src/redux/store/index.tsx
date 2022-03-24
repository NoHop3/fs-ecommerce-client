import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import jwt_decode from "jwt-decode";

import rootReducer from "../reducers";

const tokenAutoRemoval = (store: any) => (next: any) => (action: any) => {
  const token: any = JSON.parse(localStorage.getItem("token") as any);
  const decoded = token && (jwt_decode(token) as any).exp;
  if (token && decoded < Date.now() / 1000) {
    next(action);
    localStorage.clear();
  }
  next(action);
};

const store = () => {
  const middleware = [thunk, tokenAutoRemoval];
  const reduxStore = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  return reduxStore;
};

export const rootStore = store();
