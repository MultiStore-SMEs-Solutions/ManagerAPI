import React, { useEffect, useState } from "react";
import { isFinished, delivery } from "../../../redux/Actions/actions";
import styles from "./Order.module.css";
import OrdersComponent from "../Card_Order";
import { useDispatch } from "react-redux";

const Order = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(item.status);
  const dispatch = useDispatch();

  const finished = (e) => {
    if (status === "Lista") return alert("Pedido ya se encuentra listo!");
    const value = e.target.value;
    setStatus("Lista");
    dispatch(isFinished({ id: value, status: "Lista" }));
  };

  const handleOrder = () => {
    setIsOpen(isOpen ? false : true);
  };
  const delivered = (e) => {
    setStatus("Entregada")
    const value = e.target.value;
    delivery({ id: value, status: "Entregada" });

  };
  // style={{ display: status === 'Entregada' ? 'none' : 'flex' }}
  return (
      <div
          style={{ display: status === "Entregada" ? "none" : "flex" }}
          key={item.id}
          className={styles.subContainer}>
          <div className={styles.data}>
              <span>{`Pedido: ${item.code}`}</span>
              <span>{`Estado: ${status}`}</span>
              {/* <span>{`: ${item.MenuItems[0].OrdersMenu.quantity}`}</span> */}
              <div className={styles.colIcon}>
                  <button onClick={(e) => finished(e)} value={item.id}>
                      {" "}
                      Lista
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          style={{ fill: "white" }}
                          className={styles.ok}>
                          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                          <path d="M9.999 13.587 7.7 11.292l-1.412 1.416 3.713 3.705 6.706-6.706-1.414-1.414z"></path>
                      </svg>
                  </button>

                  <button
                      className={styles.finish}
                      onClick={(e) => delivered(e)}
                      value={item.id}>
                      {" "}
                      Entregar
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          className={styles.ok}
                          style={{ fill: "white" }}>
                          <path d="M5 22h14c1.103 0 2-.897 2-2V9a1 1 0 0 0-1-1h-3V7c0-2.757-2.243-5-5-5S7 4.243 7 7v1H4a1 1 0 0 0-1 1v11c0 1.103.897 2 2 2zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v1H9V7zm-4 3h2v2h2v-2h6v2h2v-2h2l.002 10H5V10z"></path>
                      </svg>
                  </button>
              </div>
              <img
                  className={isOpen ? styles.icoOpen : styles.icoClose}
                  onClick={handleOrder}
                  src="https://cdn-icons-png.flaticon.com/512/9861/9861174.png"
                  alt=""
              />
          </div>
          {isOpen && (
              <div className={styles.items}>
                  {item.MenuItems?.map((menu, i) => (
                      <OrdersComponent
                          key={i}
                          image={menu.url_image}
                          name={menu.name}
                          quantity={menu.OrdersMenu.quantity}
                      />
                  ))}
              </div>
          )}
      </div>
  );
};
export default Order;
