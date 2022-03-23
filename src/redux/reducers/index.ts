import { combineReducers } from "redux";
import navReducer from "./navReducer";
import themeReducer from "./themeReducer";
import authReducer from "./authReducer";
import productReducer from "./productReducer";

const rootReducer = combineReducers({
  navState: navReducer,
  themeState: themeReducer,
  authState: authReducer,
  productState: productReducer,
});

export default rootReducer;
