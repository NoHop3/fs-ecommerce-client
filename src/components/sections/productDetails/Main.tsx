import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useHelper from "../../../hooks/useHelper";

import { RootState } from "../../../typescript/redux/store";
import { Product } from "../../../typescript/types";

export const Main = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { products, cart } = useSelector(
    (state: RootState) => state.productState
  );
  const { loggedUser } = useSelector((state: RootState) => state.authState);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  // Get some helper functions to dynamically change buttons
  const {
    handleCartClick,
    handleFavClick,
    handleCartRemoveClick,
    handleDeleteClick,
  } = useHelper();

  useEffect(() => {
    const result = products.find((product) => product._id === productId);
    if (result !== undefined) setSelectedProduct(result);
    else setError("No such product found!");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);
  return (
    <main>
      <div className='details__wrapper'>
        <div className='details__wrapper__information'>
          {selectedProduct && selectedProduct ? (
            <>
              <img
                className='details__wrapper__information--img'
                src={selectedProduct.image}
                alt='Overview of the selected product'
              />
              <h3 className='details__wrapper__information--title'>
                {selectedProduct.name}
              </h3>
              <p className='details__wrapper__information--price'>
                {selectedProduct.price} dkk
              </p>
              <p className='details__wrapper__information--category'>
                {selectedProduct.category}
              </p>
              <p className='details__wrapper__information--color'>
                {selectedProduct.color}
              </p>
              <div className='details__wrapper__information--actions'>
                {cart &&
                cart.find(
                  (item) => item.productId?._id === selectedProduct._id
                ) === undefined ? (
                  <button
                    className='btn cartBtn'
                    onClick={() => {
                      handleCartClick(selectedProduct);
                    }}>
                    Add to cart 🛒
                  </button>
                ) : (
                  <button
                    className='btn cartBtn'
                    onClick={() => {
                      handleCartRemoveClick(selectedProduct._id);
                    }}>
                    Remove from cart 🛒
                  </button>
                )}

                <button
                  className='btn favBtn'
                  onClick={() => {
                    handleFavClick(selectedProduct._id);
                  }}>
                  {loggedUser &&
                  loggedUser.favourites.find(
                    (product) => product === selectedProduct._id
                  ) === undefined
                    ? "Add to favs ❤️"
                    : "Remove from favs 🤍"}
                </button>
                {loggedUser.isAdmin ? (
                  <>
                    <button className='btn editBtn'>edit product 💎</button>
                    <button
                      className='btn delBtn'
                      onClick={() => {
                        handleDeleteClick(selectedProduct._id);
                      }}>
                      delete product ✖️
                    </button>
                  </>
                ) : (
                  <></>
                )}
                <button
                  className='btn backBtn'
                  onClick={() => navigate("/products")}>
                  Back ⬅️
                </button>
              </div>
            </>
          ) : (
            <div className='details__wrapper__information--error'>{error}</div>
          )}
        </div>
      </div>
    </main>
  );
};
