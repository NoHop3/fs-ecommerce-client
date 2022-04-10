import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  addOrderLines,
  editFromCart,
  emptyCart,
  removeFromCart,
} from "../../../redux/actions/actions";
import { RootState } from "../../../typescript/redux/store";
import { EvtChangeType, Product } from "../../../typescript/types";

export const Main = () => {
  const { cart, totalPrice } = useSelector(
    (state: RootState) => state.productState
  );
  const { loggedUser } = useSelector((state: RootState) => state.authState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDeleteClick = (prodId: string) => {
    dispatch(removeFromCart(prodId));
  };
  const handleOrderClick = () => {
    dispatch(addOrderLines(cart, loggedUser._id, totalPrice));
    handleDeleteAllClick();
    navigate("/orders");
  };
  const handleChange = (
    evt: EvtChangeType,
    prodId: string,
    productPrice: number
  ) => {
    console.log(evt.target.value);
    const propsToUpdate = {
      quantity:
        parseInt(evt.target.value) < 1 || parseInt(evt.target.value) > 20
          ? 1
          : parseInt(evt.target.value),
      price:
        parseInt(evt.target.value) < 1 || parseInt(evt.target.value) > 20
          ? productPrice
          : parseInt(evt.target.value) * productPrice,
    };
    dispatch(editFromCart(prodId, propsToUpdate));
  };
  const handleDeleteAllClick = () => {
    dispatch(emptyCart());
  };
  useEffect(() => {
    localStorage.removeItem("cart");
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.removeItem("totalPrice");
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
  }, [cart, totalPrice]);
  return (
    <main>
      <div className='cart__wrapper'>
        <ul className='cart__wrapper--grid'>
          {cart.map((shopItem, index) => (
            <li className='grid__item' key={index}>
              <img
                className='grid__item__details--img'
                src={shopItem.productId?.image}
                alt='Shop item from cart'
              />
              <div className='grid__item__details'>
                <p className='grid__item__details--name'>
                  {shopItem.productId?.name}
                </p>

                <p className='grid__item__details--price'>
                  {shopItem.price} dkk
                </p>
              </div>
              <div className='grid__item__actions'>
                <input
                  className='quantityInput'
                  type='number'
                  name=''
                  id=''
                  value={shopItem.quantity}
                  min={1}
                  max={20}
                  onChange={(e) =>
                    handleChange(
                      e,
                      (shopItem.productId as Product)._id as string,
                      (shopItem.productId as Product).price as number
                    )
                  }
                />
                <img
                  onClick={() => {
                    handleDeleteClick(shopItem.productId?._id as string);
                  }}
                  className='delBtn'
                  src='https://previews.123rf.com/images/igoun/igoun1805/igoun180500088/101280971-cross-icon-in-circle-can-be-used-as-delete-block-close-button-etc-delete-x-cross-rounded-icon-is-fla.jpg'
                  alt=''
                />
              </div>
            </li>
          ))}
        </ul>
        <div className='totalOrder'>
          <div className='actions'>
            <button
              disabled={cart.length > 0 ? false : true}
              className='btn orderBtn'
              onClick={handleOrderClick}>
              All <br />
              {totalPrice}
            </button>
            <button
              className='btn orderBtn'
              onClick={handleDeleteAllClick}
              disabled={cart.length > 0 ? false : true}>
              Delete all
            </button>
            <button
              className='btn orderBtn'
              onClick={() => {
                navigate("/products");
              }}>
              Back
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
