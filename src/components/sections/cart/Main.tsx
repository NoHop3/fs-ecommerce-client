import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getOrderLines,
  removeAllFromCart,
  removeOrderLineWithId,
  updateOrderLineWithId,
} from "../../../redux/actions/actions";
import { RootState } from "../../../typescript/redux/store";
import { evtChangeType } from "../../../typescript/types";

export const Main = () => {
  const { cart, totalPrice } = useSelector(
    (state: RootState) => state.productState
  );
  const { loggedUser } = useSelector((state: RootState) => state.authState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDeleteClick = (id: string) => {
    dispatch(removeOrderLineWithId(id));
  };
  const handleChange = (
    evt: evtChangeType,
    orderLineId: string,
    productPrice: number
  ) => {
    const propsToUpdate = {
      quantity:
        parseInt(evt.target.value) < 1 || parseInt(evt.target.value) > 20
          ? 1
          : parseInt(evt.target.value),
      price:
        parseInt(evt.target.value) < 1 || parseInt(evt.target.value) > 20
          ? 1
          : parseInt(evt.target.value) * productPrice,
    };
    console.log(propsToUpdate);
    dispatch(updateOrderLineWithId(orderLineId, propsToUpdate));
  };
  const handleDeleteAllClick = () => {
    dispatch(removeAllFromCart(loggedUser._id));
  };
  useEffect(() => {
    dispatch(getOrderLines(loggedUser._id));
  }, [dispatch, loggedUser, totalPrice]);
  return (
    <main>
      <div className='cart__wrapper'>
        <ul className='cart__wrapper--grid'>
          {cart.map((shopItem) => (
            <li className='grid__item' key={shopItem._id}>
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
                    handleChange(e, shopItem._id!, shopItem.productId?.price!)
                  }
                />
                <img
                  onClick={() => {
                    handleDeleteClick(shopItem._id!);
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
            <button className='btn orderBtn'>
              All <br />
              {totalPrice}
            </button>
            <button className='btn orderBtn' onClick={handleDeleteAllClick}>
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
