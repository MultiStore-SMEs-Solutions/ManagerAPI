/* eslint-disable react/prop-types */
import React from 'react'
import styles from './Card_Order.module.css';

const OrdersComponent = (props) => {

  return (
      <div className={styles.card}>
        <div className={styles.left}>
          <img src={props.image} alt="" />
          <span>{props.name}</span>
        </div>
          <span className={styles.quantity}>cantidad <br /> {props.quantity}</span>
      </div>
  );
}

export default OrdersComponent