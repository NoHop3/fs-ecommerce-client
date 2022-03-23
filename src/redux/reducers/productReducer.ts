import { InitialProductState } from "../../typescript/redux/reducers/reducer_types";
import { actionType } from "../../typescript/redux/actions/action_types";
import {
  ADD_TO_CART,
  EMPTY_CART,
  FETCH_PRODUCTS,
} from "../../typescript/redux/actions/action_const";

const initialState: InitialProductState = {
  products: [],
  cart: [],
  totalPrice: 0.0,
};

const productReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case FETCH_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
      };
    }
    case ADD_TO_CART: {
      return {
        ...state,
        cart: [
          ...(state.cart.find((prod) => prod === action.payload) === undefined
            ? [...state.cart, action.payload]
            : [
                ...state.cart.filter((prod) => prod._id !== action.payload._id),
              ]),
        ],
      };
    }
    case EMPTY_CART: {
      return {
        ...state,
        cart: [],
      };
    }
    default:
      return state;
  }
};

export default productReducer;
