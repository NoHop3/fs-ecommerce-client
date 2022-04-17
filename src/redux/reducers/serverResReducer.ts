import {
  SET_RESPONSE_MESSAGE,
  SET_RESPONSE_STATUS,
} from "../../typescript/redux/actions/action_const";
import { ActionType } from "../../typescript/redux/actions/action_types";
import { InitialServerResState } from "../../typescript/redux/reducers/reducer_types";

const initialState: InitialServerResState = {
  response: {
    status: 0,
    message: "",
  },
};

const serverResReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case SET_RESPONSE_STATUS: {
      return {
        ...state,
        response: {
          ...state.response,
          status: action.payload,
        },
      };
    }
    case SET_RESPONSE_MESSAGE: {
      return {
        ...state,
        response: {
          ...state.response,
          message: action.payload,
        },
      };
    }
    default:
      return state;
  }
};

export default serverResReducer;
