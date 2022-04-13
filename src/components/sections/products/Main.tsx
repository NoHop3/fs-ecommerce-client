import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addToFavs,
  deleteProductAxios,
  editUserAxios,
  getProductsAxios,
  removeFromCart,
  sortProducts,
} from "../../../redux/actions/actions";
import { RootState } from "../../../typescript/redux/store";
import { EvtChangeType, Product } from "../../../typescript/types";

export const Main = () => {
  const { loggedUser } = useSelector((state: RootState) => state.authState);
  const { products, cart, filteredProducts } = useSelector(
    (state: RootState) => state.productState
  );
  const dispatch = useDispatch();
  const [sort, setSort] = useState({
    keyword: "",
    alphabeticalA__Z: true,
    numerical1__9: true,
    favouritesDisplay: false,
    favourites: [...loggedUser.favourites]
  });
  const handleFavClick = (id: string) => {
    dispatch(addToFavs(id));
    const favourites = loggedUser.favourites;
    dispatch(editUserAxios({ favourites }, loggedUser._id));
  };
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
  const handleDeleteClick = (prodId: string) => {
    dispatch(deleteProductAxios(prodId));
  };
  const handleSearchChange = (evt: EvtChangeType) => {
    setSort({
      ...sort,
      keyword: evt.target.value,
    });
    dispatch(sortProducts(sort));
  };
  const handleFavSort = () => {
    setSort({
      ...sort,
      favouritesDisplay: !sort.favouritesDisplay,
      favourites: [...loggedUser.favourites]
    })
    dispatch(sortProducts(sort));
  }
  const handleAlphabeticalSort = () => {
    setSort({
      ...sort,
      alphabeticalA__Z: !sort.alphabeticalA__Z,
    });
    dispatch(sortProducts(sort));
  };
  const handleNumericalSort = () => {
    setSort({
      ...sort,
      numerical1__9: !sort.numerical1__9,
    });
    dispatch(sortProducts(sort));
  };
  useEffect(() => {
    dispatch(getProductsAxios());
    dispatch(sortProducts(sort));
    localStorage.removeItem("cart");
    localStorage.setItem("cart", JSON.stringify(cart));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, loggedUser, cart, products]);
  return (
    <main>
      <div className='products__wrapper'>
        <div className='products__wrapper__filter'>
          <input
            onChange={handleSearchChange}
            type='text'
            name='filter'
            className='products__wrapper__filter__input'
            placeholder='Search for a product'
          />
          <div className='products__wrapper__filter__sort'>
            <img
              onClick={handleAlphabeticalSort}
              className='products__wrapper__filter__sort--alphabeticalSortBtn'
              src={
                sort.alphabeticalA__Z
                  ? "/images/alphabetical__a-z.png"
                  : "/images/alphabetical__z-a.png"
              }
              alt='Alphabetical sort'
            />
            <img
              onClick={handleNumericalSort}
              className='products__wrapper__filter__sort--numericalSortBtn'
              src={
                sort.numerical1__9
                  ? "/images/numerical__1-9.png"
                  : "/images/numerical__9-1.png"
              }
              alt='Alphabetical sort'
            />
            <img
              onClick={handleFavSort}
              className='products__wrapper__filter__sort--favBtn'
              src={
                sort.favouritesDisplay
                  ? "/images/fav__filled.png"
                  : "/images/fav__empty.png"
              }
              alt='Add to favourites'
            />
          </div>
        </div>
        <ul className='products__wrapper--grid'>
          {filteredProducts &&
            filteredProducts.map((product) => (
              <li className='grid__item' key={product._id} onClick={()=>{}}>
                <img
                  className='grid__item--img'
                  src={product.image}
                  alt='A product that is being sold on this page'
                />

                {cart &&
                cart.find((item) => item.productId?._id === product._id) ===
                  undefined ? (
                  <img
                    onClick={() => handleCartClick(product)}
                    className='cartBtn'
                    src='/images/cart__empty.png'
                    alt='Add to cart'
                  />
                ) : (
                  <img
                    onClick={() => handleCartRemoveClick(product._id)}
                    className='cartBtn'
                    src='/images/cart__filled.png'
                    alt='Remove from cart'
                  />
                )}
                {loggedUser.favourites.find((item) => item === product._id) ===
                undefined ? (
                  <img
                    onClick={() => handleFavClick(product._id)}
                    className='favBtn'
                    src='/images/fav__empty.png'
                    alt='Add to favourites'
                  />
                ) : (
                  <img
                    onClick={() => handleFavClick(product._id)}
                    className='favBtn'
                    src='/images/fav__filled.png'
                    alt='Remove from favourites'
                  />
                )}
                {loggedUser.isAdmin ? (
                  <img
                    onClick={() => {
                      handleDeleteClick(product._id as string);
                    }}
                    className='deleteBtn'
                    src='/images/delete__btn.png'
                    alt=''
                  />
                ) : (
                  <></>
                )}
                <p className='product--name'>{product.name}</p>
                <p className='product--price'>{product.price} dkk</p>
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
};
