import { InitialProductState } from "../../typescript/redux/reducers/reducer_types";
import { actionType } from "../../typescript/redux/actions/action_types";
import {
  ADD_TO_CART,
  EDIT_FROM_CART,
  EMPTY_CART,
  FETCH_PRODUCTS,
  REMOVE_FROM_CART,
} from "../../typescript/redux/actions/action_const";

const initialState: InitialProductState = {
  products: [],
  cart:
    JSON.parse(localStorage.getItem("cart") as string) === null
      ? []
      : JSON.parse(localStorage.getItem("cart") as string),
  totalPrice: JSON.parse(localStorage.getItem("totalPrice") as string),
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
        cart: [...state.cart, action.payload],
        totalPrice: state.totalPrice + action.payload.price,
      };
    }
    case REMOVE_FROM_CART: {
      return {
        ...state,
        totalPrice:
          state.totalPrice -
          (state.cart.find(
            (product) => product.productId?._id === action.payload
          )?.price as number),
        cart: [
          ...state.cart.filter(
            (orderLine) => orderLine.productId?._id !== action.payload
          ),
        ],
      };
    }
    case EDIT_FROM_CART: {
      const index = state.cart.findIndex(
        (orderLine) => orderLine.productId?._id === action.payload.prodId
      );
      const newArray = [...state.cart];
      newArray[index] = Object.assign(
        newArray[index],
        action.payload.propsToUpdate
      );
      let sum: number = 0;
      newArray.forEach((orderLine)=>{
        sum+=orderLine.price
      })
      return {
        ...state,
        cart: newArray,
        totalPrice: sum,
      };
    }
    case EMPTY_CART: {
      return {
        ...state,
        cart: [],
        totalPrice: 0,
      };
    }
    default:
      return state;
  }
};

export default productReducer;
