import { InitialAuthState } from "../../typescript/redux/reducers/reducer_types";
import { actionType } from "../../typescript/redux/actions/action_types";
import {
  ADD_TO_FAVS,
  AUTH_ERROR,
  EDIT_USER,
  GET_TOKEN,
  SIGN_IN_USER,
  SIGN_OUT_USER,
  TOGGLE_LOGGED_IN,
  TOGGLE_SIGN_IN,
} from "../../typescript/redux/actions/action_const";

const initialState: InitialAuthState = {
  loggedUser: {
    _id: "",
    favourites: [],
    __v: 0,
    image: "",
    email: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    isAdmin: false,
    hasWriteAccess: false,
  },
  authToken: "",
  isLoggedIn: false,
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
        authError: "",
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
        isLoggedIn: true,
      };
    case SIGN_OUT_USER:
      return {
        ...state,
        loggedUser: Object.assign(state.loggedUser, {
          _id: "",
          email: "",
          username: "",
          password: "",
          firstName: "",
          lastName: "",
          image: "",
          __v: 0,
          favourites: [],
          isAdmin: false,
          hasWriteAccess: false,
        }),
        isLoggedIn: false,
      };

    case AUTH_ERROR:
      return {
        ...state,
        authError: action.payload,
      };
    case ADD_TO_FAVS:
      return {
        ...state,
        loggedUser: Object.assign(state.loggedUser, {
          ...state.loggedUser,
          favourites: [
            ...(state.loggedUser.favourites.find(
              (product) => product === action.payload
            ) === undefined
              ? [...state.loggedUser.favourites, action.payload]
              : [
                  ...state.loggedUser.favourites.filter(
                    (product) => product !== action.payload
                  ),
                ]),
          ],
        }),
      };
    case EDIT_USER:
      console.log("Edit user reducer")
      console.log(action.payload)
      return {
        ...state,
        loggedUser: Object.assign(state.loggedUser, action.payload),
      };
    default:
      return state;
  }
};

export default navReducer;
