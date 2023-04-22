/* eslint-disable react/jsx-key */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
import  { useEffect, useState } from "react";
import styles from "./Orders.module.css";
import Order from "../../components/Card_Orders/Order/Order";

import { useDispatch, useSelector } from "react-redux";
import { delivery, getOrders } from "../../redux/Actions/actions";

const OrderPage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders())
  },[ dispatch ])

  const ordersState = useSelector((state) => state.orders);
  const [orders, setOrders] = useState(ordersState);

  useEffect(() => {
    setOrders(ordersState)
  }, [ordersState, setOrders ])

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <p>Pedidos</p>
        {orders.length ? (
          orders.map((item) => <Order key={item.id} item={item} />)
        ) : (
          <div className={styles.message}>
            <h2>Sin pedidos</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
