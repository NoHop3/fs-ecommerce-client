import { combineReducers } from "redux";
import navReducer from "./navReducer";
import themeReducer from "./themeReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  navState: navReducer,
  themeState: themeReducer,
  authState: authReducer
});

export default rootReducer;
