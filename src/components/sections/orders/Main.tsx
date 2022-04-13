import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition} from "react-transition-group";

import { getOrdersAxios } from "../../../redux/actions/actions";
import { RootState } from "../../../typescript/redux/store";

export const Main = () => {
  const { orders } = useSelector((state: RootState) => state.orderState);
  const { loggedUser } = useSelector((state: RootState) => state.authState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrdersAxios(loggedUser._id));
  }, [dispatch, loggedUser]);
  const [clicked, setClicked] = useState({
    isClicked: false,
    i: "",
  });
  return (
    <main>
      <div className='orders__wrapper'>
          {orders.map((order) => (
            <div
              className='orderContainer'
              key={order._id}
              onClick={() => {
                setClicked({
                  isClicked: !clicked.isClicked,
                  i: order._id as string,
                });
              }}>
              <div className='orderContainer__information'>
                <p className='orderContainer__information__id'>
                  Order: {order._id}
                </p>
                <p className='orderContainer__information__orderedlines'>
                  Ordered items: {order.orderedlines.length}
                </p>
                <CSSTransition
                  in={clicked.isClicked && clicked.i === order._id}
                  timeout={500}
                  classNames={"orderedline__transition"}
                  unmountOnExit>
                  <div className='orderedline__wrapper'>
                    <div className='orderedline__wrapper__information'>
                      {order.orderedlines.map((orderline) => (
                        <div key={orderline._id}>
                          <img
                            className='orderedline__wrapper__information__image'
                            src={orderline.productId?.image}
                            alt='Orderline product'
                          />
                          <p className='orderedline__wrapper__information__price'>
                            Amount:{orderline.quantity}, Price:{orderline.price}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className='orderContainer__information__total'>
                      Total Price of Order: {order.totalPrice} dkk
                    </p>
                  </div>
                </CSSTransition>

                <div className='orderContainer__information__orderOrigin'>
                  <p>
                    {order.userId.firstName} {order.userId.lastName}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
};
