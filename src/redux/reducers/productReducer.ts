import { InitialProductState } from "../../typescript/redux/reducers/reducer_types";
import { actionType } from "../../typescript/redux/actions/action_types";
import {
  ADD_TO_CART,
  EDIT_ORDER_LINE,
  EMPTY_CART,
  FETCH_ORDER_LINES,
  FETCH_PRODUCTS,
  REMOVE_FROM_CART,
} from "../../typescript/redux/actions/action_const";

const initialState: InitialProductState = {
  products: [],
  cart: [],
  totalPrice: 0.0,
};

const productReducer = (state = initialState, action: actionType) => {
  let sum = 0;
  state.cart.forEach((orderLine) => {
    sum += orderLine.price;
  });
  const totalAmount = sum;
  console.log(totalAmount)
  switch (action.type) {
    case FETCH_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
      };
    }
    case FETCH_ORDER_LINES: {
      return {
        ...state,
        cart: action.payload,
        totalPrice: totalAmount,
      };
    }
    case ADD_TO_CART: {
      return {
        ...state,
        cart: [...state.cart, action.payload],
        totalPrice: totalAmount,
      };
    }
    case REMOVE_FROM_CART: {
      return {
        ...state,
        cart: [
          ...state.cart
            .filter((orderLine) => orderLine._id !== action.payload)
            .filter((orderLine) => orderLine.productId?._id !== action.payload),
        ],
        totalPrice: totalAmount,
      };
    }
    case EDIT_ORDER_LINE: {
      const index = state.cart.findIndex(
        (orderLine) => orderLine._id === action.payload._id
      );
      const newArray = [...state.cart];
      newArray[index] = Object.assign(newArray[index], action.payload);
      console.log(newArray[index]);
      return {
        ...state,
        cart: newArray,
        totalPrice: totalAmount,
      };
    }
    case EMPTY_CART: {
      return {
        ...state,
        cart: [],
        totalPrice: totalAmount,
      };
    }
    default:
      return state;
  }
};

export default productReducer;
