/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styles from "./MyTickets.module.css";

const MyTickets = ({ code, total, data }) => {
    const [view, setView] = useState(false);
    const handleView = () => {
        setView(true);
  };
  const handleViewOff = () => {
    setView(false)
  }
    return (
        <div className={styles.page} onMouseOver={handleView} onMouseLeave={handleViewOff}>
            <div className={styles.ticket}>
                <span>{`Ticket: ${code}`}</span>
                <span>{`Total: $${total}`}</span>
            </div>
            {view && (
                <div className={styles.detail}>
                    {data.map((ele) => (
                        <div className={styles.info} key={ele.name}>
                            <img src={ele.url_image} alt="" />
                            <span>{ele.name}</span>
                            <span>{`$${ele.productPrice}`}</span>
                            <span>{ele.quantityPerOrder}</span>
                            <span>{`$${ele.totalAmountOfProductPerOrder}`}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyTickets;
