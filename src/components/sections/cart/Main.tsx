import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emptyCart } from "../../../redux/actions/actions";
import { RootState } from "../../../typescript/redux/store";
import { evtClickType } from "../../../typescript/types";

export const Main = () => {
  const { cart } = useSelector((state: RootState) => state.productState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDeleteClick = (e: evtClickType) => {
    console.log(e.target);
  };
  const handleQuantityChange = () => {};
  const handleDeleteAllClick = () => {
    dispatch(emptyCart());
  };
  return (
    <main>
      <div className='cart__wrapper'>
        <ul className='cart__wrapper--grid'>
          {cart.map((shopItem) => (
            <li className='grid__item' key={shopItem._id}>
              <img
                className='grid__item__details--img'
                src={shopItem.image}
                alt='Shop item from cart'
              />
              <div className='grid__item__details'>
                <p className='grid__item__details--name'>{shopItem.name}</p>

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
                  defaultValue={1}
                  onChange={(e) => handleQuantityChange}
                />
                <img
                  onClick={(e) => {
                    handleDeleteClick(e);
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
            <button className='btn orderBtn'>Order</button>
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
