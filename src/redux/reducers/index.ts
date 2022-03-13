import { combineReducers } from "redux";
import navReducer from "./navReducer";
import themeReducer from "./themeReducer";

const rootReducer = combineReducers({
  navState: navReducer,
  themeState: themeReducer,
});

export default rootReducer;
