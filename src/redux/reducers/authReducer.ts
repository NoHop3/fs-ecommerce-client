import { InitialAuthState } from "../../typescript/redux/reducers/reducer_types";
import { actionType } from "../../typescript/redux/actions/action_types";
import {
  GET_TOKEN,
  TOGGLE_LOGGED_IN,
  TOGGLE_SIGN_IN,
} from "../../typescript/redux/actions/action_const";

const initialState: InitialAuthState = {
  authToken: "",
  isLoggedIn: false,
  isInSignIn: false,
};

const navReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case GET_TOKEN:
      return {
        ...state,
        authToken: action.payload,
      };
    case TOGGLE_SIGN_IN:
      return {
        ...state,
        isLoggedIn: !state.isLoggedIn,
      };
    case TOGGLE_LOGGED_IN:
      return {
        ...state,
        isInSignIn: !state.isInSignIn,
      };
    default:
      return state;
  }
};

export default navReducer;
