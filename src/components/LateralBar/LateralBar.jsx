import React from "react";
import styles from "./LateralBar.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const LateralBar = () => {
    const [view, setview] = useState({
        menu: false,
        recipe: false,
        ingredient: false,
    });

    const handleMouse = (name) => {
        setview({
            ...view,
            [name]: true,
        });
    };
    const handleMouseOut = () => {
        setview({
            menu: false,
            recipe: false,
            ingredient: false,
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.containerButtons}>
                <div className={styles.principalButton}>
                    <Link to="/sales" className={styles.orders}>
                        <span>Ventas</span>
                    </Link>
                    {/* <img src="https://cdn-icons-png.flaticon.com/512/709/709586.png" alt="" /> */}
                </div>
            </div>
            <div className={styles.containerButtons}>
                <div className={styles.principalButton}>
                    <Link to="/orders" className={styles.orders}>
                        <span name="menu">Pedidos</span>
                    </Link>
                    {/* <img src="https://cdn-icons-png.flaticon.com/512/709/709586.png" alt="" /> */}
                </div>
            </div>
            <div onMouseLeave={handleMouseOut} className={styles.containerButtons}>
                <div
                    onMouseOver={() => handleMouse("menu")}
                    className={styles.principalButton}>
                    <span name="menu">Menús</span>
                    {/* <img src="https://cdn-icons-png.flaticon.com/512/709/709586.png" alt="" /> */}
                </div>
                {view.menu && (
                    <div className={styles.dropDowns}>
                        <Link to="/menu" className={styles.dropDownsButtons}>
                            <span>Ver Menús</span>
                        </Link>
                        <Link to="/menu/create" className={styles.dropDownsButtons}>
                            <span>Crear Menú</span>
                        </Link>
                    </div>
                )}
            </div>
            <div onMouseLeave={handleMouseOut} className={styles.containerButtons}>
                <div
                    onMouseOver={() => handleMouse("recipe")}
                    className={styles.principalButton}>
                    <span>Recetas</span>
                    {/* <img src="https://cdn-icons-png.flaticon.com/512/709/709586.png" alt="" /> */}
                </div>
                {view.recipe && (
                    <div className={styles.dropDowns}>
                        <Link to="/recipe" className={styles.dropDownsButtons}>
                            <span>Ver Recetas</span>
                        </Link>
                        <Link to="/recipe/create" className={styles.dropDownsButtons}>
                            <span>Crear Receta</span>
                        </Link>
                    </div>
                )}
            </div>
            <div onMouseLeave={handleMouseOut} className={styles.containerButtons}>
                <div
                    onMouseOver={() => handleMouse("ingredient")}
                    className={styles.principalButton}>
                    <span>Ingredientes</span>
                    {/* <img src="https://cdn-icons-png.flaticon.com/512/709/709586.png" alt="" /> */}
                </div>
                {view.ingredient && (
                    <div className={styles.dropDowns}>
                        <Link to="/ingredient" className={styles.dropDownsButtons}>
                            <span>Ver Ingredientes</span>
                        </Link>
                        <Link to="/ingredient/create" className={styles.dropDownsButtons}>
                            <span>Crear Ingrediente</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LateralBar;
