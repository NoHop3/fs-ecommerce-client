import { InitialProductState } from "../../typescript/redux/reducers/reducer_types";
import { ActionType } from "../../typescript/redux/actions/action_types";
import {
  ADD_TO_CART,
  EDIT_FROM_CART,
  EMPTY_CART,
  FETCH_PRODUCTS,
  REMOVE_FROM_CART,
  SORT_PRODUCTS,
} from "../../typescript/redux/actions/action_const";
import { Product } from "../../typescript/types";

const initialState: InitialProductState = {
  products: [],
  filteredProducts: [],
  cart:
    JSON.parse(localStorage.getItem("cart") as string) === null
      ? []
      : JSON.parse(localStorage.getItem("cart") as string),
  totalPrice: JSON.parse(localStorage.getItem("totalPrice") as string),
};

const productReducer = (state = initialState, action: ActionType) => {
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
      newArray.forEach((orderLine) => {
        sum += orderLine.price;
      });
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
    case SORT_PRODUCTS: {
      let productsToSort: Product[] = [];
      if (action.payload.favouritesDisplay) {
        state.products.forEach((product) => {
          const existingProduct = action.payload.favourites.find(
            (favourite) => favourite === product._id
          );
          if (existingProduct !== undefined) {
            productsToSort.push(product);
          }
        });
      }
      else if(productsToSort.length===0){productsToSort=[...state.products]}
      return {
        ...state,
        filteredProducts: [
          ...productsToSort
            .filter(
              (product) =>
                product.name
                  .toLocaleLowerCase()
                  .search(action.payload.keyword.toLocaleLowerCase()) !== -1
            )
            .sort(function (a, b) {
              // Sorting alphabetically
              const productA = a.name.toLocaleLowerCase();
              const productB = b.name.toLocaleLowerCase();
              if (action.payload.alphabeticalA__Z) {
                if (productA > productB) return 1;
                if (productB > productA) return -1;
                // if products are identical no change happens
                return 0;
              }
              if (productA > productB) return -1;
              if (productB > productA) return 1;
              // if products are identical no change happens
              return 0;
            })
            .sort(function (a, b) {
              // Sorting numerically
              const productA = a.price;
              const productB = b.price;
              if (action.payload.numerical1__9) {
                if (productA > productB) return 1;
                if (productB > productA) return -1;
                // if products are identical no change happens
                return 0;
              }
              if (productA > productB) return -1;
              if (productB > productA) return 1;
              // if products are identical no change happens
              return 0;
            }),
        ],
      };
    }
    default:
      return state;
  }
};

export default productReducer;
