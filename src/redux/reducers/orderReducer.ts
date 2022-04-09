import {
  FETCH_ORDERS,
} from "../../typescript/redux/actions/action_const";
import { actionType } from "../../typescript/redux/actions/action_types";
import { InitialOrderState } from "../../typescript/redux/reducers/reducer_types";

const InitialState: InitialOrderState = {
  orders: [],
};

const orderReducer = (state = InitialState, action: actionType) => {
  switch (action.type) {
    case FETCH_ORDERS: {
      return {
        ...state,
        orders: [...action.payload],
      };
    }
    default:
      return state;
  }
};

export default orderReducer;
