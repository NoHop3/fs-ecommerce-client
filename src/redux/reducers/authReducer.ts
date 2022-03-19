import { InitialAuthState } from "../../typescript/redux/reducers/reducer_types";
import { actionType } from "../../typescript/redux/actions/action_types";
import {
  AUTH_ERROR,
  EDIT_USER,
  GET_TOKEN,
  SIGN_IN_USER,
  TOGGLE_LOGGED_IN,
  TOGGLE_SIGN_IN,
} from "../../typescript/redux/actions/action_const";

const initialState: InitialAuthState = {
  loggedUser: {
    _id: "",
    email: "example",
    username: "example",
    password: "",
    firstName: "example",
    lastName: "example",
    image: "",
    __v: 0,
    orders: [],
    favourites: [],
    isAdmin: false,
    hasWriteAccess: false,
  },
  authToken: "",
  isLoggedIn: true,
  isInSignIn: false,
  authError: "",
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
        isInSignIn: !state.isInSignIn,
      };
    case TOGGLE_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: !state.isLoggedIn,
      };
    case SIGN_IN_USER:
      return {
        ...state,
        loggedUser: action.payload,
      };
    case AUTH_ERROR:
      return {
        ...state,
        authError: action.payload,
      };
    case EDIT_USER:
      return {
        ...state,
        loggedUser: action.payload,
      };
    default:
      return state;
  }
};

export default navReducer;
