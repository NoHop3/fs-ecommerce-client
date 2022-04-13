import { InitialNavState } from "../../typescript/redux/reducers/reducer_types";
import { ActionType } from "../../typescript/redux/actions/action_types";
import { TOGGLE_NAV } from "../../typescript/redux/actions/action_const";

const initialState: InitialNavState = {
  navClass: "wapper",
};

const navReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case TOGGLE_NAV:
      return {
        ...state,
        navClass: state.navClass === "wapper" ? "nav-open" : "wapper",
      };
    default:
      return state;
  }
};

export default navReducer;
