import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../redux/actions/actions";
import { RootState } from "../../../typescript/redux/store";

export const Main = () => {
  const { orders } = useSelector((state: RootState) => state.orderState);
  const { loggedUser } = useSelector((state: RootState) => state.authState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders(loggedUser._id));
  }, [dispatch, loggedUser]);
  console.log(orders);
  return (
    <main>
      <div className='orders__wrapper'>
        {orders.map((order) => (
          <div className='orderContainer' key={order._id}>
            <div className='orderInformation'>
              <p>{order._id}</p>
              {order.orderLines.map((orderLine) => (
                <>
                  <p>{orderLine.productId}</p>
                  <p>{orderLine.quantity}</p>
                </>
              ))}
              <p>{order.totalPrice}</p>
            </div>
            <div className='orderOrigin'>
              <p>{order.userId.firstName}</p>
              <p>{order.userId.lastName}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
