import { combineReducers } from "redux";
import navReducer from "./navReducer";
import themeReducer from "./themeReducer";
import authReducer from "./authReducer";
import productReducer from "./productReducer";
import orderReducer from "./orderReducer";
import serverResReducer from "./serverResReducer";

const rootReducer = combineReducers({
  navState: navReducer,
  themeState: themeReducer,
  authState: authReducer,
  productState: productReducer,
  orderState: orderReducer,
  serverResponseState: serverResReducer,
});

export default rootReducer;
