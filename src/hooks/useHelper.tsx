import { useDispatch, useSelector } from "react-redux";

import {
  addToFavs,
  editUserAxios,
  addToCart,
  removeFromCart,
  deleteProductAxios,
} from "../redux/actions/actions";
import { RootState } from "../typescript/redux/store";
import { Product } from "../typescript/types";

export default function useHelper() {
  const { loggedUser } = useSelector((state: RootState) => state.authState);
  const dispatch = useDispatch();

  // Helper function for user favourite products
  const handleFavClick = (id: string) => {
    dispatch(addToFavs(id));
    const favourites = loggedUser.favourites;
    dispatch(editUserAxios({ favourites }, loggedUser._id));
  };

  // Helper functions for cart adding/removing
  const handleCartClick = (prod: Product) => {
    const orderLine = {
      productId: prod,
      quantity: 1,
      price: prod.price,
    };
    dispatch(addToCart(orderLine));
  };
  const handleCartRemoveClick = (prodId: string) => {
    dispatch(removeFromCart(prodId));
  };

  // Admin helper functions

  //for permamently deleting products
  const handleDeleteClick = (prodId: string) => {
    dispatch(deleteProductAxios(prodId));
  };

  return {
    handleFavClick,
    handleCartClick,
    handleCartRemoveClick,
    handleDeleteClick,
  };
}
