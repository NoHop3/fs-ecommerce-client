import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import useHelper from "../../../hooks/useHelper";
import { RootState } from "../../../typescript/redux/store";
import { Product } from "../../../typescript/types";
// import AliceCarousel, { EventObject } from "react-alice-carousel";
// import "react-alice-carousel/lib/scss/alice-carousel.scss";
import { Navigation, Pagination, Scrollbar, A11y, Keyboard } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

export const Main = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { products, cart } = useSelector(
    (state: RootState) => state.productState
  );
  const { loggedUser } = useSelector((state: RootState) => state.authState);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  const [selectedIndex, setSelectedIndex] = useState(
    products.findIndex((product) => product._id === productId)
  );
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
  }, [productId, setSelectedIndex]);

  // Carousel helper properties / functions
  const responsive = {
    0: {
      slidesPerView: 1,
    },
    800: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 5,
    },
    1800: {
      slidesPerView: 7,
    },
    2200: {
      slidesPerView: 11,
    },
  };
  const handleDragStart = (e: any) => e.preventDefault();
  const items = products.map((product, index) => (
    <img
      key={product._id}
      className={selectedIndex === index ? "centerImage" : "activeImage"}
      onDragStart={handleDragStart}
      src={product.image}
      alt='Product that is being sold on this page'
    />
  ));
  return (
    <main>
      <div className='details__wrapper'>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Keyboard]}
          breakpoints={responsive}
          initialSlide={selectedIndex}
          grabCursor
          slidesPerGroup={1}
          navigation={true}
          centeredSlides={true}
          loop={true}
          loopFillGroupWithBlank={true}
          keyboard={true}
          pagination={{ clickable: true }}
          onSlideChange={(swiper) => {
            setSelectedIndex(swiper.realIndex);
            setSelectedProduct(products[swiper.realIndex]);
          }}>
          {items.map((product, i) => (
            <SwiperSlide key={i}>{product}</SwiperSlide>
          ))}
        </Swiper>
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
