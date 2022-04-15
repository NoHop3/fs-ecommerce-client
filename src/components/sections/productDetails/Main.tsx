import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import useHelper from "../../../hooks/useHelper";
import { RootState } from "../../../typescript/redux/store";
import { Product } from "../../../typescript/types";
import AliceCarousel, { EventObject } from "react-alice-carousel";
import "react-alice-carousel/lib/scss/alice-carousel.scss";

export const Main = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { products, cart } = useSelector(
    (state: RootState) => state.productState
  );
  const { loggedUser } = useSelector((state: RootState) => state.authState);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  const [selectedIndex, setSelectedIndex] = useState(-1);
  // Get some helper functions to dynamically change buttons
  const {
    handleCartClick,
    handleFavClick,
    handleCartRemoveClick,
    handleDeleteClick,
  } = useHelper();

  useEffect(() => {
    const result = products.find((product) => product._id === productId);
    if (result !== undefined) {
      setSelectedProduct(result);
      setSelectedIndex(products.findIndex((product) => product === result));
    } else setError("No such product found!");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  // Carousel helper properties / functions
  const responsive = {
    2000: {
      items: 10,
    },
    1200: {
      items: 5,
    },
    800: {
      items: 3,
    },
    0: {
      items: 1,
    },
  };
  const handleDragStart = (e: any) => e.preventDefault();
  const items = products.map((product, index) => (
    <img
      key={product._id}
      className={selectedIndex === index ? "centerImage" : "activeImage"}
      onDragStart={handleDragStart}
      style={{ height: "150px", width: "150px" }}
      src={product.image}
      alt='Product that is being sold on this page'
    />
  ));
  return (
    <main>
      <div className='details__wrapper'>
        <AliceCarousel
          activeIndex={selectedIndex}
          mouseTracking
          responsive={responsive}
          items={items}
          infinite
          controlsStrategy={"default"}
          autoPlayStrategy='all'
          autoPlayInterval={1000}
          disableDotsControls
          disableButtonsControls
          keyboardNavigation
          onSlideChanged={(e: EventObject) => {
            setSelectedIndex(e.item);
            setSelectedProduct(products[e.item]);
          }}
        />
        <div className='details__wrapper__information'>
          {selectedProduct && selectedProduct ? (
            <>
              {/* <img
                className='details__wrapper__information--img'
                src={selectedProduct.image}
                alt='Overview of the selected product'
              /> */}
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
