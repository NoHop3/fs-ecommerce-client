import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrderLine,
  addToFavs,
  edit,
  getProducts,
  removeOrderLine,
} from "../../../redux/actions/actions";
import { RootState } from "../../../typescript/redux/store";
import { product } from "../../../typescript/types";

export const Main = () => {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state: RootState) => state.authState);
  const { products, cart } = useSelector(
    (state: RootState) => state.productState
  );
  useEffect(() => {
    dispatch(getProducts());
    console.log(cart);
  }, [dispatch, cart]);
  const handleDeleteClick = () => {
    // dispatch(deleteProduct(productId))
  };
  const handleFavClick = (id: string) => {
    dispatch(addToFavs(id));
    const favourites = loggedUser.favourites;
    dispatch(edit({ favourites }, loggedUser._id));
  };
  const handleAddProduct = () => {};
  const handleCartClick = (prod: product) => {
    const orderLine = {
      quantity: 1,
      price: prod.price,
    };
    dispatch(addOrderLine(orderLine, loggedUser._id, prod._id));
  };
  const handleCartRemoveClick = (prodId: string) => {
    dispatch(removeOrderLine(loggedUser._id, prodId));
  };
  return (
    <main>
      <div className='products__wrapper'></div>
      <ul className='products__wrapper--grid'>
        {/* <div>
        <p className="sortBy">Sort by: </p>
        </div> */}
        {products.map((product) => (
          <li className='grid__item' key={product._id}>
            <img
              className='grid__item--img'
              src={product.image}
              alt='A product that is being sold on this page'
            />
            {loggedUser.isAdmin ? (
              <img
                onClick={handleDeleteClick}
                className='deleteBtn'
                src='https://previews.123rf.com/images/igoun/igoun1805/igoun180500088/101280971-cross-icon-in-circle-can-be-used-as-delete-block-close-button-etc-delete-x-cross-rounded-icon-is-fla.jpg'
                alt=''
              />
            ) : null}
            {cart.find((item) => item.productId === product._id) === undefined ? (
              <img
                onClick={() => handleCartClick(product)}
                className='cartBtn'
                src='https://media.istockphoto.com/vectors/shopping-cart-icon-isolated-on-white-background-vector-id1206806317?k=20&m=1206806317&s=612x612&w=0&h=waK8qOHV2Fgz2ntEWHWBQtXpNDAQ_wdhd4tkTUz6tfE='
                alt=''
              />
            ) : (
              <img
                onClick={() => handleCartRemoveClick(product._id)}
                className='cartBtn'
                src='https://media.istockphoto.com/vectors/shopping-cart-line-icon-black-editable-stroke-trolley-basket-business-vector-id1201806395?k=20&m=1201806395&s=612x612&w=0&h=vEFOKMvftWLO7KD6CkGq5UNOmuGw-9DYZZF1jwiVHPI='
                alt=''
              />
            )}
            {loggedUser.favourites.find((item) => item === product._id) ===
            undefined ? (
              <img
                onClick={() => handleFavClick(product._id)}
                className='favBtn'
                src='https://t.pimg.jp/037/932/012/1/37932012.jpg'
                alt=''
              />
            ) : (
              <img
                onClick={() => handleFavClick(product._id)}
                className='favBtn'
                src='data:image/png;base64,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'
                alt=''
              />
            )}
            <p className='product--name'>{product.name}</p>
            <p className='product--price'>{product.price} dkk</p>
          </li>
        ))}
        {loggedUser.hasWriteAccess ? (
          <button className='btn addBtn' onClick={handleAddProduct}>
            Add a product
          </button>
        ) : null}
      </ul>
    </main>
  );
};
