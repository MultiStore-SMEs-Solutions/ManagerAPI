/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styles from "./ClosingSales.module.css";
import MyTickets from "../MyTickets/MyTickets"

const ClosingSales = ({ date, amount, data }) => {
  const [view, setView] = useState(false)
  const handleView = () => {
    setView(view?false:true)
  }
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <span>{date}</span>
                <span>{`$${amount}`}</span>
                <div onClick={handleView}>
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/1666/1666578.png"
                        alt="Detail"
                    />
                </div>
            </div>
            {view && (
                <div className={styles.tickets}>
                    {data.map((ele) => (
                        <MyTickets
                            total={ele.totalAmountPerorder}
                            code={ele.code}
                            data={ele.productsOfOrder}
                            key={ele.code}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ClosingSales;
