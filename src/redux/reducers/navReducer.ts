import { InitialNavState } from "../../typescript/redux/reducers/reducer_types";
import { actionType } from "../../typescript/redux/actions/action_types";
import {
  TOGGLE_AUTH,
  TOGGLE_NAV,
} from "../../typescript/redux/actions/action_const";

const initialState: InitialNavState = {
  navClass: "wapper",
  auth: "Sign in"
};

const navReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case TOGGLE_NAV:
      return {
        ...state,
        navClass: state.navClass === "wapper" ? "nav-open" : "wapper",
      };
      case TOGGLE_AUTH:
      return {
        ...state,
        auth: state.auth === "Sign in" ? "Sign out" : "Sign in",
      };
    default:
      return state;
  }
};

export default navReducer;
